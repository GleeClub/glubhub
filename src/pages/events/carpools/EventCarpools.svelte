<script lang="ts">
  import Table from "components/bulma/Table.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";
  import RequiresPermission from "components/member/RequiresPermission.svelte";
  import CarpoolPartialTable from "components/carpool/CarpoolPartialTable.svelte";

  import { goToRoute } from "store/route";
  import { editCarpool } from "state/permissions";
  import { FullEventQuery } from "gql-operations";
  import { routeEditCarpools, routeProfile } from "route/constructors";

  export let event: FullEventQuery['event'];
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
          on:selectDriver={member => goToRoute(routeProfile(member.detail.email, null))}
          on:selectMember={member => goToRoute(routeProfile(member.detail.email, null))}
        />
      </Table>
    {/each}
  </Table>
{/if}

<RequiresPermission permission={editCarpool}>
  <div style:padding="10px">
    <LinkButton route={routeEditCarpools(event.id)}>
      Edit Carpools
    </LinkButton>
  </div>
</RequiresPermission>
