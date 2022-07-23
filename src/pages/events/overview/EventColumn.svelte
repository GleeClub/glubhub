<script lang="ts">
  import EventRow from './EventRow.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import Box from 'src/components/bulma/Box.svelte'
  import Remote from 'src/components/remote/Remote.svelte'
  import Table from 'src/components/bulma/Table.svelte'

  import { GOLD_COLOR } from 'src/utils/constants'
  import { AllEventsQuery } from 'src/gql-operations'
  import { routeEvents } from 'src/route/constructors'
  import { mapLazyLoaded, LazyRemoteData } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'

  export let title: string
  export let allowedEventTypes: string[]
  export let events: LazyRemoteData<AllEventsQuery['events']>
  export let selectedId: number | null

  $: eventGroups = mapLazyLoaded(events, (all) => [
    all.filter((event) => allowedEventTypes.includes(event.type)),
  ])
</script>

<Column centered oneQuarter>
  <Column narrow>
    <Title>{title}</Title>
    <Box>
      <Remote data={eventGroups}>
        <svelte:fragment slot="loaded" let:data={groups}>
          {#if groups[0].length === 0}
            <p>No events here, misster.</p>
          {:else}
            <Table fullwidth hoverable className="no-bottom-border">
              <thead />
              <tbody>
                {#each groups as group, groupIndex}
                  {#each group as event}
                    <tr
                      style:background-color={event.id === selectedId
                        ? GOLD_COLOR
                        : ''}
                      on:click={() => replaceRoute(routeEvents(event.id, null))}
                    >
                      <EventRow {event} />
                    </tr>
                  {/each}
                  {#if groupIndex < groups.length - 1}
                    <!-- Divider Row -->
                    <tr class="not-hoverable">
                      <div class="is-divider" style="margin: 1rem" />
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </Table>
          {/if}
        </svelte:fragment>
      </Remote>
    </Box>
  </Column>
</Column>
