<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import CarpoolPartialTable from 'src/components/carpool/CarpoolPartialTable.svelte'

  import { goToRoute } from 'src/store/route'
  import { editCarpool } from 'src/state/permissions'
  import { FullEventQuery } from 'src/gql-operations'
  import { routeEditCarpools, routeProfile } from 'src/route/constructors'

  export let event: FullEventQuery['event']
</script>

{#if !event.carpools.length}
  <div>No carpools set for this event.</div>
{:else}
  <Table scrollable>
    {#each event.carpools as carpool}
      <Table>
        <CarpoolPartialTable
          {carpool}
          {event}
          on:selectDriver={(member) =>
            goToRoute(routeProfile(member.detail.email, null))}
          on:selectMember={(member) =>
            goToRoute(routeProfile(member.detail.email, null))}
        />
      </Table>
    {/each}
  </Table>
{/if}

<RequiresPermission permission={editCarpool}>
  <div style:padding="10px">
    <LinkButton route={routeEditCarpools(event.id)}>Edit Carpools</LinkButton>
  </div>
</RequiresPermission>
