<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import AbsenceRequestButtons from './AbsenceRequestButtons.svelte'
  import AbsenceRequestRow from './AbsenceRequestRow.svelte'

  import { AllAbsenceRequestsQuery } from 'src/gql-operations'

  export let absenceRequests: AllAbsenceRequestsQuery['absenceRequests']
  export let respond: (
    eventId: number,
    member: string,
    approved: boolean
  ) => void
</script>

<Table scrollable fullwidth>
  <thead>
    <tr style:width="100%">
      <th>When Submitted</th>
      <th>Event Name</th>
      <th>Event Date</th>
      <th>Loser</th>
      <th>Excuse</th>
    </tr>
  </thead>
  <tbody>
    {#each absenceRequests as absenceRequest}
      <AbsenceRequestRow {absenceRequest} />
      <AbsenceRequestButtons {absenceRequest} {respond} />
    {/each}
  </tbody>
</Table>
