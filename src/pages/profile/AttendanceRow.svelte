<script lang="ts">
  import CheckboxInput from "components/forms/CheckboxInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";

  import { FullMemberQuery } from "gql-operations";
  import { routeEvents } from "route/constructors";
  import { renderRoute } from "route/render";
  import { numberType } from "state/input";
  import { SimpleAttendance } from "state/types";
  import { dateFormatter } from "utils/datetime";

  export let event: FullMemberQuery['member']['grades']['eventsWithChanges'][number];
  export let updateAttendance: (eventId: number, attendance: SimpleAttendance) => void;
</script>


<tr class="no-bottom-border">
  <td>{dateFormatter(event.event.callTime)}</td>
  <td>
    <a href={renderRoute(routeEvents(event.event.id, null))}>{event.event.name}</a>
  </td>
  <td>{event.event.type}</td>
  <td>
    <CheckboxInput
      content=""
      checked={event.event.attendance.shouldAttend}
      onChange={shouldAttend => updateAttendance(
        event.event.id, { ...event.event.attendance, shouldAttend })}
    />
  </td>
  <td>
    <CheckboxInput
      content=""
      checked={event.event.attendance.didAttend}
      onChange={didAttend => updateAttendance(
        event.event.id, { ...event.event.attendance, didAttend })}
    />
  </td>
  <td>
    <TextInput
      type={numberType}
      value={event.event.attendance.minutesLate}
      onInput={minutesLate =>
        updateAttendance(event.event.id, { ...event.event.attendance, minutesLate: minutesLate || 0 })
      }
      placeholder="0"
    />
  </td>
  <td>{event.change?.change}</td>
  <td>{event.change?.partialScore}</td>
  <td>{event.change?.reason}</td>
</tr>
