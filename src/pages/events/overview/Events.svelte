<script lang="ts">
  import Sidebar from 'src/components/popup/Sidebar.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Divider from 'src/components/bulma/Divider.svelte'
  import TabContent from './TabContent.svelte'
  import EventColumns from './EventColumns.svelte'

  import { routeEvents } from 'src/route/constructors'
  import { EventTab } from 'src/route/types'
  import { eagerQuery } from 'src/state/query'
  import { goToRoute, replaceRoute } from 'src/store/route'
  import { eventIsOver } from 'src/utils/helpers'
  import { derived, readable } from 'svelte/store'
  import { mapLazyLoaded, notLoaded } from 'src/state/types'

  export let eventId: number | null
  export let tab: EventTab | null

  const [allEvents, reloadAllEvents] = eagerQuery('AllEvents', {})

  $: upcomingEvents = derived(allEvents, ($events) =>
    mapLazyLoaded($events, (es) => es.events.filter((e) => !eventIsOver(e)))
  )
  $: pastEvents = derived(allEvents, ($events) =>
    mapLazyLoaded($events, (es) => es.events.filter((e) => eventIsOver(e)))
  )
  $: [selectedEvent, reloadSelectedEvent] = eventId
    ? eagerQuery('FullEvent', { id: eventId })
    : [readable(notLoaded), (_vars: { id: number }) => {}]
</script>

<Section>
  <EventColumns events={$upcomingEvents} selectedId={eventId} />
  <Divider>Past</Divider>
  <EventColumns events={$pastEvents} selectedId={eventId} />
</Section>
<Sidebar data={$selectedEvent} close={() => goToRoute(routeEvents(null, null))}>
  <TabContent
    slot="loaded"
    let:data={event}
    {tab}
    event={event.event}
    onUpdate={() => {
      reloadAllEvents()
      reloadSelectedEvent({ id: event.event.id })
    }}
    onDelete={() => {
      reloadAllEvents()
      replaceRoute(routeEvents(null, null))
    }}
  />
</Sidebar>
