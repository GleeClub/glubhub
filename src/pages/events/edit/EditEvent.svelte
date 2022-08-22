<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import LeftColumn from './LeftColumn.svelte'
  import MiddleColumn from './MiddleColumn.svelte'
  import RightColumn from './RightColumn.svelte'

  import { FullEventQuery, NewEventFields, NewGig } from 'src/gql-operations'
  import { eventDetails, routeEvents } from 'src/route/constructors'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'
  import { query } from 'src/state/query'
  import { EMPTY_GIG } from 'src/utils/constants'

  export let event: FullEventQuery['event']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  let eventForm: NewEventFields = {
    callTime: event.callTime,
    comments: event.comments,
    defaultAttend: event.defaultAttend,
    gigCount: event.gigCount,
    location: event.location,
    name: event.name,
    points: event.points,
    releaseTime: event.releaseTime,
    semester: event.semester,
    type: event.type,
  }
  let gigForm: NewGig = event.gig
    ? {
        contactEmail: event.gig.contactEmail,
        contactName: event.gig.contactName,
        contactPhone: event.gig.contactPhone,
        description: event.gig.description,
        performanceTime: event.gig.performanceTime,
        price: event.gig.price,
        public: event.gig.public,
        summary: event.gig.summary,
        uniform: event.gig.uniform.id,
      }
    : EMPTY_GIG

  function goBackToDetails() {
    replaceRoute(routeEvents(event.id, eventDetails))
  }

  async function saveEventChanges() {
    state = loading

    const result = await query('UpdateEvent', {
      id: event.id,
      newEvent: {
        event: eventForm,
        gig: gigForm,
        repeat: null,
      },
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
