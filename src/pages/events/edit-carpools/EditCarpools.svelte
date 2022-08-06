<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Table from 'src/components/bulma/Table.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import Spinner from 'src/components/remote/Spinner.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import RemainingMemberTable from './RemainingMemberTable.svelte'
  import CarpoolPartialTable from 'src/components/carpool/CarpoolPartialTable.svelte'

  import {
    addNewCarpool,
    allSelectedEmails,
    clearCarpoolState,
    clickDriver,
    clickPassenger,
    currentCarpools,
    setCarpoolStateFromApi,
    clickEmptyPassengerList,
  } from './state'
  import { get } from 'svelte/store'
  import { query } from 'src/state/query'
  import { goToRoute } from 'src/store/route'
  import { eventCarpools, routeEvents } from 'src/route/constructors'
  import { loading, RemoteData, stateFromResult } from 'src/state/types'

  export let eventId: number

  let eventName = ''
  let state: RemoteData = loading

  clearCarpoolState()
  query('EditCarpoolContext', { eventId }).then((result) => {
    state = stateFromResult(result)
    if (result.type === 'loaded') {
      eventName = result.data.event.name
      setCarpoolStateFromApi(result.data)
    }
  })

  async function updateCarpools() {
    state = loading
    const carpools = get(currentCarpools)

    const result = await query('UpdateCarpools', {
      eventId,
      carpools: carpools.map((carpool) => ({
        driver: carpool.driver.email,
        passengers: carpool.passengers.map((passenger) => passenger.email),
      })),
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      goToRoute(routeEvents(eventId, eventCarpools))
    }
  }
</script>

<Section>
  <Container>
    <Title>Carpools for {eventName}</Title>
    <Columns>
      <Column>
        <Box>
          <RemainingMemberTable />
        </Box>
      </Column>
      <Column>
        <Box>
          <div style:width="100%" style:padding-bottom="10px">
            {#if state.type === 'loading'}
              <Spinner />
            {:else if state.type === 'error'}
              <ErrorBox error={state.error} />
            {:else}
              <LinkButton
                route={routeEvents(eventId, eventCarpools)}
                className="is-pulled-left"
              >
                Cancel
              </LinkButton>
              <Button
                color="is-primary"
                className="is-pulled-right"
                click={updateCarpools}
              >
                Update Carpools
              </Button>
            {/if}
          </div>
          <Table fullwidth>
            {#each $currentCarpools as carpool}
              <CarpoolPartialTable
                {carpool}
                selected={$allSelectedEmails}
                on:selectDriver={() => clickDriver(carpool)}
                on:selectPassenger={(passenger) =>
                  clickPassenger(carpool, passenger.detail)}
                on:selectEmpty={() => clickEmptyPassengerList(carpool)}
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
