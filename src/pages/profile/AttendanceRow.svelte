<script lang="ts">
  import CheckboxInput from 'src/components/forms/CheckboxInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { FullMemberQuery } from 'src/gql-operations'
  import { routeEvents } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { numberType } from 'src/state/input'
  import { SimpleAttendance } from 'src/state/types'
import { DEFAULT_ATTENDANCE } from 'src/utils/constants'
  import { dateFormatter } from 'src/utils/datetime'

  export let event: FullMemberQuery['member']['grades']['eventsWithChanges'][number]
  export let updateAttendance: (
    eventId: number,
    attendance: SimpleAttendance
  ) => void
</script>

<tr class="no-bottom-border">
  <td>{dateFormatter(event.event.callTime)}</td>
  <td>
    <a href={renderRoute(routeEvents(event.event.id, null))}
      >{event.event.name}</a
    >
  </td>
  <td>{event.event.type}</td>
  <td>
    <CheckboxInput
      content=""
      checked={event.event.attendance?.shouldAttend || false}
      onChange={(shouldAttend) =>
        updateAttendance(event.event.id, {
          ...(event.event.attendance || DEFAULT_ATTENDANCE),
          shouldAttend,
        })}
    />
  </td>
  <td>
    <CheckboxInput
      content=""
      checked={event.event.attendance?.didAttend || false}
      onChange={(didAttend) =>
        updateAttendance(event.event.id, {
          ...(event.event.attendance || DEFAULT_ATTENDANCE),
          didAttend,
        })}
    />
  </td>
  <td>
    <TextInput
      type={numberType}
      value={event.event.attendance?.minutesLate || 0}
      onInput={(minutesLate) =>
        updateAttendance(event.event.id, {
          ...(event.event.attendance || DEFAULT_ATTENDANCE),
          minutesLate: minutesLate || 0,
        })}
      placeholder="0"
    />
  </td>
  <td>{event.change?.change}</td>
  <td>{event.change?.partialScore}</td>
  <td>{event.change?.reason}</td>
</tr>
