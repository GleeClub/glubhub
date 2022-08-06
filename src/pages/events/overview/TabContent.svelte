<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import BackButton from 'src/components/buttons/BackButton.svelte'
  import EventTabs from './EventTabs.svelte'
  import Attendance from '../Attendance.svelte'
  import Setlist from '../Setlist.svelte'
  import RequestAbsence from '../RequestAbsence.svelte'
  import EditEvent from '../edit/EditEvent.svelte'
  import Details from '../details/Details.svelte'
  import EventCarpools from '../carpools/EventCarpools.svelte'
  import Attendees from '../attendees/Attendees.svelte'

  import { EventTab } from 'src/route/types'
  import { FullEventQuery } from 'src/gql-operations'
  import { replaceRoute } from 'src/store/route'
  import { eventDetails, routeEvents } from 'src/route/constructors'

  export let event: FullEventQuery['event']
  export let tab: EventTab | null
  export let onUpdate: () => void
  export let onDelete: () => void

  const tabsWithHeader: EventTab['route'][] = [
    'attendance',
    'attendees',
    'setlist',
    'carpools',
    'details',
  ]
</script>

{#if !tab?.route || tabsWithHeader.includes(tab.route)}
  <BackButton
    content="all events"
    click={() => replaceRoute(routeEvents(null, null))}
  />
  <Title centered>{event.name}</Title>
  <EventTabs eventId={event.id} currentTab={tab} />
{/if}

{#if tab?.route === 'attendance'}
  <Attendance eventId={event.id} attendees={event.allAttendance} {onUpdate} />
{:else if tab?.route === 'attendees'}
  <Attendees attendees={event.allAttendance} />
{:else if tab?.route === 'setlist'}
  <Setlist songs={event.setlist} />
{:else if tab?.route === 'carpools'}
  <EventCarpools {event} />
{:else if tab?.route === 'request-absence'}
  <RequestAbsence {event} {onUpdate} />
{:else if tab?.route === 'edit'}
  <BackButton
    content="cancel editing"
    click={() => replaceRoute(routeEvents(event.id, eventDetails))}
  />
  <EditEvent {event} {onUpdate} />
{:else}
  <Details {event} {onUpdate} {onDelete} />
{/if}
