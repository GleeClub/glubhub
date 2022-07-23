<script lang="ts">
  import Spinner from 'src/components/remote/Spinner.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import { LazyRemoteData } from 'src/state/types'

  type T = $$Generic

  interface $$Props {
    data: LazyRemoteData<T>
    close: () => void
  }

  interface $$Slots {
    loaded: { data: T }
  }

  export let data: LazyRemoteData<T>
  export let close: () => void
</script>

{#if data.type === 'not-loaded'}
  <div class="sidenav" hidden />
{:else}
  <div>
    <div class="transparent-overlay" on:click={close} />
    <div class="sidenav" style="padding: 20px; padding-top: 80px;">
      {#if data.type === 'loaded'}
        <slot name="loaded" data={data.data} />
      {:else if data.type === 'error'}
        <ErrorBox error={data.error} />
      {:else}
        <Spinner />
      {/if}
    </div>
  </div>
{/if}
