<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'
  import AttendanceRow from './AttendanceRow.svelte'

  import { query } from 'src/state/query'
  import { FullMemberQuery } from 'src/gql-operations'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    SimpleAttendance,
    stateFromResult,
  } from 'src/state/types'

  export let member: FullMemberQuery['member']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  async function updateAttendance(
    eventId: number,
    attendance: SimpleAttendance
  ) {
    state = loading
    const result = await query('UpdateAttendance', {
      eventId,
      member: member.email,
      update: attendance,
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
    }
  }
</script>

<Table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Event</th>
      <th>Type</th>
      <th>Should Attend?</th>
      <th>Did Attend?</th>
      <th>Minutes Late</th>
      <th>Point Change</th>
      <th>Partial Score</th>
      <th>Rationale</th>
    </tr>
  </thead>
  <tbody>
    {#each member.grades.eventsWithChanges as event}
      <AttendanceRow {event} {updateAttendance} />
    {/each}
  </tbody>
</Table>
<StateBox {state} />
