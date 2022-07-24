import { getSdk, Sdk } from 'src/gql-operations'
import { GraphQLClient } from 'graphql-request'
import {
  loaded,
  error,
  QueryResult,
  LazyRemoteData,
  notLoaded,
  ApiError,
} from 'src/state/types'
import { Readable, writable } from 'svelte/store'
import { API_URL } from 'src/utils/constants'
import { getToken } from 'src/utils/token'

export const gqlClient = getSdk(
  new GraphQLClient(API_URL, {
    headers: () => {
      const token = getToken()
      return token ? { GREASE_TOKEN: token } : undefined
    },
  })
)

export async function query<K extends keyof Sdk>(
  queryName: K,
  ...args: Parameters<Sdk[K]>
): Promise<QueryResult<Awaited<ReturnType<Sdk[K]>>>> {
  const action = gqlClient[queryName] as (
    ...args: Parameters<Sdk[K]>
  ) => Promise<ReturnType<Sdk[K]>>
  return action(...args)
    .then((result: Awaited<ReturnType<Sdk[K]>>) => loaded(result))
    .catch((err: ApiError) => {
      return error(err)
    })
}

export function lazyQuery<K extends keyof Sdk>(
  queryName: K
): [
  Readable<LazyRemoteData<Awaited<ReturnType<Sdk[K]>>>>,
  (...args: Parameters<Sdk[K]>) => void
] {
  const resultStore =
    writable<LazyRemoteData<Awaited<ReturnType<Sdk[K]>>>>(notLoaded)
  const makeQuery = (...args: Parameters<Sdk[K]>) => {
    query(queryName, ...args).then((result) => resultStore.set(result))
  }

  return [resultStore, makeQuery]
}

export function eagerQuery<K extends keyof Sdk>(
  queryName: K,
  ...args: Parameters<Sdk[K]>
): [
  Readable<LazyRemoteData<Awaited<ReturnType<Sdk[K]>>>>,
  (...args: Parameters<Sdk[K]>) => void
] {
  const [resultStore, makeQuery] = lazyQuery(queryName)
  makeQuery(...args)

  return [resultStore, makeQuery]
}
