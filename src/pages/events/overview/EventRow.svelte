<script lang="ts">
  import AttendanceIcon from 'src/components/icons/AttendanceIcon.svelte'

  import { AllEventsQuery } from 'src/gql-operations'
  import { simpleDateFormatter } from 'src/utils/datetime'

  export let event: AllEventsQuery['events'][number]
</script>

<td style="text-align: center;">
  <AttendanceIcon {event} attendance={event.userAttendance} />
</td>
<td>{simpleDateFormatter(event.callTime)}</td>
<td>{event.name}</td>
