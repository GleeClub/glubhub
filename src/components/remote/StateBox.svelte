<script lang="ts">
  import Spinner from 'components/remote/Spinner.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'

  import type { RemoteData } from 'state/types'

  export let state: RemoteData
</script>

{#if state.type === 'loaded'}
  ""
{:else if state.type === 'loading'}
  <Spinner />
{:else}
  <ErrorBox error={state.error} />
{/if}
