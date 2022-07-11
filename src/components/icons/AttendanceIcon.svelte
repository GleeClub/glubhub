<script lang="ts">
  import CheckOrCross from "components/icons/CheckOrCross.svelte";
  import Tooltip from "components/bulma/Tooltip.svelte";

  import type { HasAttendanceIconContext, HasEventTimes } from "state/types";
  import { eventIsOver } from "utils/helpers";

  export let event: HasEventTimes & {
    attendance?: HasAttendanceIconContext | null;
  };

  $: tooltipContent = `${
    event.attendance?.confirmed ? "confirmed" : "unconfirmed"
  }, ${event.attendance?.shouldAttend ? "attending" : "not attending"}`;
</script>

{#if event.attendance && !eventIsOver(event)}
  <div class="has-text-{event.attendance.confirmed ? 'success' : 'grey'}">
    <Tooltip alignment="right" content={tooltipContent}>
      <CheckOrCross checked={event.attendance.shouldAttend} />
    </Tooltip>
  </div>
{/if}
