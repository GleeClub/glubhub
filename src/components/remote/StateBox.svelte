<script lang="ts">
  import Spinner from 'src/components/remote/Spinner.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import type { RemoteData } from 'src/state/types'

  export let state: RemoteData
</script>

{#if state.type === 'loaded'}
  <!-- nothing if loaded -->
{:else if state.type === 'loading'}
  <Spinner />
{:else}
  <ErrorBox error={state.error} />
{/if}
