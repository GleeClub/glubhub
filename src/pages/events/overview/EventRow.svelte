<script lang="ts">
  import AttendanceIcon from "components/icons/AttendanceIcon.svelte";

  import { AllEventsQuery } from "gql-operations";
  import { simpleDateFormatter } from "utils/datetime";

  export let event: AllEventsQuery['events'][number]
</script>

<td style="text-align: center;">
  <AttendanceIcon event={event} />
</td>
<td>{simpleDateFormatter(event.callTime)}</td>
<td>{event.name}</td>
