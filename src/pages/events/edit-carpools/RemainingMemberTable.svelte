<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import CarpoolRow from 'src/components/carpool/CarpoolRow.svelte'

  import {
    allSelectedEmails,
    clickEmptyUnassignedMemberList,
    clickUnassignedMember,
    unassignedMembers,
  } from './state'
</script>

{#if !$unassignedMembers.length}
  <div onClick={clickEmptyUnassignedMemberList}>
    <i>That's everyone!</i>
  </div>
{:else}
  <Table>
    <tbody>
      {#each $unassignedMembers as member}
        <CarpoolRow
          {member}
          on:select={() => clickUnassignedMember(member)}
          isSelected={$allSelectedEmails.includes(member.email)}
        />
      {/each}
    </tbody>
  </Table>
{/if}
