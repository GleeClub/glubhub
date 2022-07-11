import type { CombinedError } from '@urql/svelte';
import type { Readable } from 'svelte/store';

export interface NotLoaded {
  type: 'not-loaded';
};
export interface Loading {
  type: 'loading';
};
export interface Loaded<Data> {
  type: 'loaded';
  data: Data;
};
export interface RemoteError {
  type: 'error';
  error: CombinedError;
};

export const notLoaded: NotLoaded = { type: 'not-loaded' };
export const loading: Loading = { type: 'loading' };
export function loaded<Data>(data: Data): Loaded<Data> {
  return { type: 'loaded', data };
}
export const emptyLoaded = loaded(null);
export function error(error: CombinedError): RemoteError {
  return { type: 'error', error };
}

export type RemoteData<Data = null> =
  Loading | Loaded<Data> | RemoteError;

export type MutationResult<Data = any> = 
  Loaded<Data> | RemoteError;

export type LazyRemoteData<Data> =
  NotLoaded | Loading | Loaded<Data> | RemoteError;

export type RemoteStore<Data> = Readable<RemoteData<Data>>;
export type LazyRemoteStore<Data> = Readable<LazyRemoteData<Data>>;

export function mapLoaded<Data, Mapped>(data: RemoteData<Data>, mapper: (loaded: Data) => Mapped): RemoteData<Mapped> {
  if (data.type === 'loaded') {
    return loaded(mapper(data.data));
  } else {
    return data;
  }
}

export interface HasPermissions {
  permissions: { name: string, eventType?: string | null }[]
}

export interface HasPositions {
  positions: { name: string }[]
}

export interface HasEmail {
  email: string
}

export interface HasFullName {
  fullName: string
}

export interface HasEventTimes {
  callTime: string
  releaseTime?: string | null
}

export interface HasAttendanceIconContext {
  confirmed: boolean
  shouldAttend: boolean
}