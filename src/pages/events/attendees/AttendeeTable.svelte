<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import AttendeeNameList from './AttendeeNameList.svelte'

  import { FullEventQuery } from 'src/gql-operations'

  export let section: string
  export let confirmed: FullEventQuery['event']['allAttendance']
  export let notConfirmed: FullEventQuery['event']['allAttendance']
</script>

<Table fullwidth scrollable>
  <thead>
    <tr>
      <th>{section}</th>
      <th>Confirmed</th>
      <th>Not Confirmed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style:width="20%" />
      <AttendeeNameList attendees={confirmed} />
      <AttendeeNameList attendees={notConfirmed} />
    </tr>
  </tbody>
</Table>
