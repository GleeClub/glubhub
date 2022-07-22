<script lang="ts">
  import Title from 'components/bulma/Title.svelte'
  import LeftColumn from './LeftColumn.svelte'
  import MiddleColumn from './MiddleColumn.svelte'
  import RightColumn from './RightColumn.svelte'

  import { FullEventQuery } from 'gql-operations'
  import { eventDetails, routeEvents } from 'route/constructors'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { replaceRoute } from 'store/route'
  import {
    buildUpdateBody,
    eventFormFromEvent,
    gigFormFromEvent,
  } from './state'
  import { query } from 'state/query'

  export let event: FullEventQuery['event']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  $: eventForm = eventFormFromEvent(event)
  $: gigForm = gigFormFromEvent(event)

  function goBackToDetails() {
    replaceRoute(routeEvents(event.id, eventDetails))
  }

  async function saveEventChanges() {
    state = loading

    const result = await query('UpdateEvent', {
      id: event.id,
      newEvent: buildUpdateBody(eventForm, gigForm),
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
      goBackToDetails()
    }
  }
</script>

<div>
  <Title centered>Edit Event</Title>
  <form on:submit|preventDefault={saveEventChanges}>
    <LeftColumn
      gig={gigForm}
      updateGig={(gig) => (gigForm = gig)}
      event={eventForm}
      updateEvent={(event) => (eventForm = event)}
    />
    <MiddleColumn
      gig={gigForm}
      updateGig={(gig) => (gigForm = gig)}
      event={eventForm}
      updateEvent={(event) => (eventForm = event)}
    />
    <RightColumn
      gig={gigForm}
      updateGig={(gig) => (gigForm = gig)}
      event={eventForm}
      updateEvent={(event) => (eventForm = event)}
      {state}
    />
  </form>
</div>
