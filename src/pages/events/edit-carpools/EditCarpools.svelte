<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Column from "components/bulma/Column.svelte";
  import Columns from "components/bulma/Columns.svelte";
  import Container from "components/bulma/Container.svelte";
  import Section from "components/bulma/Section.svelte";
  import Table from "components/bulma/Table.svelte";
  import Title from "components/bulma/Title.svelte";
  import Button from "components/buttons/Button.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";
  import RemainingMemberTable from "./RemainingMemberTable.svelte";
  import CarpoolPartialTable from "components/carpool/CarpoolPartialTable.svelte";

  import { EditCarpoolContextQuery } from "gql-operations";
  import { CarpoolMember, emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { eventCarpools, routeEvents } from "route/constructors";
  import { query } from "state/query";
  import { goToRoute } from "store/route";

  export let eventId: number;

  let eventName = "";
  let selected: string[] = [];
  let carpools: EditCarpoolContextQuery['event']['carpools'] = [];
  let allMembers: CarpoolMember[] = [];
  let state: RemoteData = emptyLoaded;

  function remainingMembers() {
    return allMembers.filter(
      member => !carpools.some(c => memberInCarpool(member.email, c))
    );
  }

  function memberInCarpool(
    email: string, 
    carpool: EditCarpoolContextQuery['event']['carpools'][number]
  ) {
    return carpool.driver.email === email ||
      carpool.passengers.some(p => p.email === email);
  }

  function getSelectedIfAllUnassigned() {
    if (!selected.length) {
      return null;
    }

    const membersLeft = remainingMembers();
    const selectedMembers = selected.map(email =>
      membersLeft.find(member => member.email === email)!
    );

    if (selectedMembers.every(m => !!m)) {
      return selectedMembers;
    } else {
      return null;
    }
  }

  function selectMember(email: string) {
    if (selected.includes(email)) {
      selected = selected.filter(s => s !== email);
    } else {
      selected.push(email);
    }
  }

  function moveBackToUnassigned() {
    carpools = carpools.map(carpool => ({
      driver: carpool.driver,
      passengers: carpool.passengers.filter(passenger => 
        selected.every(email => email !== passenger.email)),
    }))
      .filter(carpool => selected.every(
        email => email !== carpool.driver.email));
    selected = [];
  }

  function addNewCarpool() {
    const allUnassigned = getSelectedIfAllUnassigned();
    if (!allUnassigned) return;

    selected = [];
    carpools.push({ 
      driver: allUnassigned[0],
      passengers: allUnassigned.slice(1),
    });
  }

  async function updateCarpools() {
    state = loading;
    const result = await query("UpdateCarpools", {
      eventId, carpools: carpools.map(carpool => ({
        driver: carpool.driver.email,
        passengers: carpool.passengers.map(passenger => passenger.email),
      })),
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      goToRoute(routeEvents(eventId, eventCarpools));
    }
  }

  query("EditCarpoolContext", { eventId }).then(result => {
    if (result.type === "loaded") {
      allMembers = result.data.members;
      eventName = result.data.event.name;
      carpools = result.data.event.carpools;
    }
  });
</script>

<Section>
  <Container>
    <Title>Carpools for {eventName}</Title>
    <Columns>
      <Column>
        <Box>
          <RemainingMemberTable
            {allMembers}
            {carpools}
            {selected}
            select={selectMember}
            moveBackToUnassigned={moveBackToUnassigned}
          />
        </Box>
      </Column>
      <Column>
        <Box>
          <div style:width="100%" style:padding-bottom="10px">
            <LinkButton
              route={routeEvents(eventId, eventCarpools)}
              className="is-pulled-left"
            >
              Cancel
            </LinkButton>
            <Button
              color="is-primary"
              className="is-pulled-right"
              loading={state.type === "loading"}
              click={updateCarpools}
            >
              Update Carpools
            </Button>
            {#if state.type === "error"}
              <ErrorBox error={state.error} />
            {/if}
          </div>
          <Table fullwidth>
            {#each carpools as carpool}
              <CarpoolPartialTable 
                {carpool}
                {selected}
              />
            {/each}
          </Table>

          <Button fullwidth click={addNewCarpool}>
            Pick a driver and then click here to add new carpool
          </Button>
        </Box>
      </Column>
    </Columns>
  </Container>
</Section>
