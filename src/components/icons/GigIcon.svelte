<script lang="ts">
  import Tooltip from 'src/components/bulma/Tooltip.svelte'

  import { HasEventTimes } from 'src/state/types'
  import { dateFormatter } from 'src/utils/datetime'

  export let gig: (HasEventTimes & { name: string }) | null
</script>

{#if gig}
  <Tooltip content={`${gig.name} on ${dateFormatter(gig.callTime)}`}>
    <span class="icon is-large has-text-primary">
      <i class="far fa-2x fa-check-circle" />
    </span>
  </Tooltip>
{:else}
  <Tooltip content="Hopefully something soon...">
    <span class="icon is-large" style:color="gray">
      <i class="far fa-2x fa-frown" />
    </span>
  </Tooltip>
{/if}
