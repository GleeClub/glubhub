import { TypedDocumentNode, operationStore, query as urqlQuery, mutation as urqlMutation } from '@urql/svelte';
import { loaded, loading, error, MutationResult, RemoteData, LazyRemoteData, notLoaded } from 'state/types';
import { derived, Readable } from 'svelte/store';

export function query<Data = any, Variables = object>(query: TypedDocumentNode<Data, Variables>, variables: Variables): Readable<RemoteData<Data>> {
  return derived(urqlQuery(operationStore(query, variables)), (result) => {
     if (result.error) {
      return error(result.error);
    } else if (result.data) {
      return loaded(result.data);
    } else {
      return loading;
    }
  });
}

export function lazyQuery<Data = any, Variables = object>(query: TypedDocumentNode<Data, Variables>): [Readable<LazyRemoteData<Data>>, (variables: Variables) => void] {
  const operation = operationStore(query);
  const reexecute = (variables: Variables) => {
    operation.variables = variables;
    operation.reexecute();
  };
  const store = derived(urqlQuery(operation), (result) => {
     if (result.error) {
      return error(result.error);
    } else if (result.data) {
      return loaded(result.data);
    } else if (result.fetching) {
      return loading;
    } else {
      return notLoaded;
    }
  });
  
  return [store, reexecute];
}

export async function mutation<Data = any, Variables = object>(mutation: TypedDocumentNode<Data, Variables>, variables: Variables): Promise<MutationResult<Data>> {
  const executor = urqlMutation(operationStore(mutation));
  const result = await executor(variables);

  if (result.error) {
    return error(result.error);
  } else {
    return loaded(result.data!);
  }
}
