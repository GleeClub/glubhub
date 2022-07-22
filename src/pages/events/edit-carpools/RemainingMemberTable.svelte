<script lang="ts">
  import Table from 'components/bulma/Table.svelte'
  import CarpoolRow from 'components/carpool/CarpoolRow.svelte'

  import { EditCarpoolContextQuery } from 'gql-operations'
  import { CarpoolMember } from 'state/types'

  export let allMembers: CarpoolMember[]
  export let carpools: EditCarpoolContextQuery['event']['carpools']
  export let selected: string[]
  export let select: (email: string) => void
  export let moveBackToUnassigned: () => void

  $: remainingMembers = allMembers.filter(
    (member) =>
      !carpools.some(
        (carpool) =>
          carpool.driver.email === member.email ||
          carpool.passengers.some(
            (passenger) => passenger.email === member.email
          )
      )
  )
</script>

{#if !remainingMembers.length}
  <div onClick={moveBackToUnassigned}>
    <i>That's everyone!</i>
  </div>
{:else}
  <Table>
    <tbody>
      {#each remainingMembers as member}
        <CarpoolRow
          {member}
          on:select={() => select(member.email)}
          isSelected={selected.includes(member.email)}
        />
      {/each}
    </tbody>
  </Table>
{/if}
