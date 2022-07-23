<script lang="ts">
  import CheckOrCross from 'src/components/icons/CheckOrCross.svelte'
  import Tooltip from 'src/components/bulma/Tooltip.svelte'

  import type { HasEventTimes, SimpleAttendance } from 'src/state/types'
  import { eventIsOver } from 'src/utils/helpers'

  export let event: HasEventTimes
  export let attendance: SimpleAttendance | null | undefined

  $: tooltipContent = `${
    attendance?.confirmed ? 'confirmed' : 'unconfirmed'
  }, ${attendance?.shouldAttend ? 'attending' : 'not attending'}`
</script>

{#if attendance && !eventIsOver(event)}
  <div class="has-text-{attendance?.confirmed ? 'success' : 'grey'}">
    <Tooltip alignment="right" content={tooltipContent}>
      <CheckOrCross checked={attendance.shouldAttend} />
    </Tooltip>
  </div>
{/if}
