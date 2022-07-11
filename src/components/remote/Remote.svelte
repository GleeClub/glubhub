<script lang="ts">
  import Spinner from "components/remote/Spinner.svelte"
  import ErrorBox from "components/remote/ErrorBox.svelte"

  import { LazyRemoteData } from "state/types"

  type T = $$Generic

  interface $$Props {
    data: LazyRemoteData<T>
  }

  interface $$Slots {
    loaded: { data: T }
  }

  export let data: LazyRemoteData<T>

  // TODO: cleaner way to do this?
  $: loadedData = (data.type === "loaded" ? data.data : null!)
</script>

{#if data.type === "loading"}
  <slot name="loading">
    <Spinner />
  </slot>
{:else if data.type === "error"}
  <slot name="error">
    <ErrorBox error={data.error} />
  </slot>
{:else if data.type === "loaded"}
  <slot name="loaded" data={loadedData} />
{:else}
  <slot name="not-loaded" />
{/if}
