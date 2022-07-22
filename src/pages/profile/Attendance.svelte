<script lang="ts">
  import Table from "components/bulma/Table.svelte";
  import StateBox from "components/remote/StateBox.svelte";
  import AttendanceRow from "./AttendanceRow.svelte";

  import { query } from "state/query";
  import { FullMemberQuery } from "gql-operations";
  import { emptyLoaded, loading, RemoteData, SimpleAttendance, stateFromResult } from "state/types";

  export let member: FullMemberQuery['member'];
  export let onUpdate: () => void;
  
  let state: RemoteData = emptyLoaded;

  async function updateAttendance(eventId: number, attendance: SimpleAttendance) {
    state = loading;
    const result = await query("UpdateAttendance", {
      eventId, member: member.email, update: attendance
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      onUpdate();
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
