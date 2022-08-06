<script lang="ts">
  import Spinner from 'src/components/remote/Spinner.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import { LazyRemoteData } from 'src/state/types'

  type T = $$Generic

  interface $$Props {
    data: LazyRemoteData<T>
  }

  interface $$Slots {
    loaded: { data: T }
  }

  export let data: LazyRemoteData<T>
</script>

{#if data.type === 'loading'}
  <slot name="loading">
    <Spinner />
  </slot>
{:else if data.type === 'error'}
  <slot name="error">
    <ErrorBox error={data.error} />
  </slot>
{:else if data.type === 'loaded'}
  <slot name="loaded" data={data.data} />
{:else}
  <slot name="not-loaded" />
{/if}
