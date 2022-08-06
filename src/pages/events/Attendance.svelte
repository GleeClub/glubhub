<script lang="ts">
  import StateBox from 'src/components/remote/StateBox.svelte'
  import CheckboxInput from 'src/components/forms/CheckboxInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import Table from 'src/components/bulma/Table.svelte'

  import { AttendanceUpdate, FullEventQuery } from 'src/gql-operations'
  import { numberType } from 'src/state/input'
  import { query } from 'src/state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { SECTION_ORDER, NO_SECTION } from 'src/utils/constants'

  export let eventId: number
  export let attendees: FullEventQuery['event']['allAttendance']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  async function updateAttendee(
    email: string,
    update: Partial<AttendanceUpdate>
  ) {
    state = loading

    const attendee = attendees.find((a) => a.member.email === email)!
    const attendance = {
      didAttend: attendee.didAttend,
      shouldAttend: attendee.shouldAttend,
      confirmed: attendee.confirmed,
      minutesLate: attendee.minutesLate,
      ...update,
    }
    const result = await query('UpdateAttendance', {
      eventId,
      member: email,
      update: attendance,
    })

    state = stateFromResult(result)
    if (result.type === "loaded") {
      onUpdate()
    }
  }

  $: groupedAttendees = SECTION_ORDER.map((section) => ({
    section: section || NO_SECTION,
    attendees: attendees.filter((a) => a.member.semester?.section === section),
  })).filter((group) => group.attendees.length)
</script>

<div>
  <Table fullwidth scrollable>
    {#each groupedAttendees as group}
      <thead>
        <tr>
          <td>{group.section}</td>
          <td>Did Attend</td>
          <td>Should Attend</td>
          <td>Confirmed</td>
          <td>Minutes Late</td>
        </tr>
      </thead>
      <tbody>
        {#each group.attendees as attendee}
          <tr class="no-bottom-border">
            <td>{attendee.member.fullName}</td>
            <td>
              <CheckboxInput
                content=""
                checked={attendee.didAttend}
                onChange={(didAttend) =>
                  updateAttendee(attendee.member.email, { didAttend })}
              />
            </td>
            <td>
              <CheckboxInput
                content=""
                checked={attendee.shouldAttend}
                onChange={(shouldAttend) =>
                  updateAttendee(attendee.member.email, { shouldAttend })}
              />
            </td>
            <td>
              <CheckboxInput
                content=""
                checked={attendee.confirmed}
                onChange={(confirmed) =>
                  updateAttendee(attendee.member.email, { confirmed })}
              />
            </td>
            <td>
              <TextInput
                type={numberType}
                value={attendee.minutesLate}
                onInput={(minutesLate) =>
                  updateAttendee(attendee.member.email, {
                    minutesLate: minutesLate || 0,
                  })}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    {/each}
  </Table>
  <StateBox {state} />
</div>
