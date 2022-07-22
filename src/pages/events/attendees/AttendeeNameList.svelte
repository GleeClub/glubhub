<script lang="ts">
  import { FullEventQuery } from 'gql-operations'

  export let attendees: FullEventQuery['event']['allAttendance']
</script>

<td style:width="40%">
  {#each attendees as attendee, index}
    {attendee.member.fullName}
    {#if index !== attendees.length - 1}
      <br />
    {/if}
  {/each}
</td>
