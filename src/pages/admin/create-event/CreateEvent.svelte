<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import Box from 'src/components/bulma/Box.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import LeftColumn from './LeftColumn.svelte'
  import MiddleColumn from './MiddleColumn.svelte'
  import RightColumn from './RightColumn.svelte'

  import { NewGig, NewEventFields, NewEventPeriod } from 'src/gql-operations'
  import { query } from 'src/state/query'
  import { goToRoute } from 'src/store/route'
  import { routeEvents } from 'src/route/constructors'
  import { get } from 'svelte/store'
  import { siteContext } from 'src/store/context'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { onDestroy } from 'svelte'

  export let gigRequestId: number | null

  let state: RemoteData = emptyLoaded
  let repeat: NewEventPeriod | null = null

  let event: NewEventFields = {
    name: '',
    semester: get(siteContext).currentSemester.name,
    type: 'Rehearsal',
    callTime: {
      date: '',
      time: '',
    },
    releaseTime: {
      date: '',
      time: '',
    },
    points: 5,
    comments: '',
    location: '',
    gigCount: false,
    defaultAttend: true,
  }

  let gig: NewGig | null = null

  async function createEvent() {
    state = loading
    const result = await query('CreateEvent', {
      newEvent: {
        event,
        gig,
        repeat,
      },
      gigRequestId,
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      goToRoute(routeEvents(result.data.createEvent.id, null))
    }
  }

  if (gigRequestId !== null) {
    query('GigRequestForNewEvent', { id: gigRequestId }).then((result) => {
      if (result.type === 'loaded') {
        const request = result.data.gigRequest

        event.name = `${request.name} for ${request.organization}`
        event.type = 'Volunteer Gig'
        event.callTime = request.startTime
        event.comments = request.comments || ''
        event.location = request.location
        event.gigCount = true
        event.defaultAttend = false

        gig = {
          performanceTime: request.startTime.time,
          contactName: request.contactName,
          contactEmail: request.contactEmail,
          contactPhone: request.contactPhone,
          public: true,
          description: request.comments,
          summary: request.name,
          uniform: 0,
        }
      }
    })
  }

  const unsubscribe = siteContext.subscribe((context) => {
    event.semester = context.currentSemester.name
  })

  onDestroy(unsubscribe)
</script>

<Title>Create Event</Title>
<Box>
  <form on:submit|preventDefault={createEvent}>
    <Columns>
      <LeftColumn
        {event}
        updateEvent={(updatedEvent) => (event = updatedEvent)}
        {gig}
        updateGig={(updatedGig) => (gig = updatedGig)}
      />
      <MiddleColumn
        {event}
        updateEvent={(updatedEvent) => (event = updatedEvent)}
        {gig}
        updateGig={(updatedGig) => (gig = updatedGig)}
      />
      <RightColumn
        {state}
        {event}
        updateEvent={(updatedEvent) => (event = updatedEvent)}
        {gig}
        updateGig={(updatedGig) => (gig = updatedGig)}
        {repeat}
        updateRepeat={(updatedRepeat) => (repeat = updatedRepeat)}
      />
    </Columns>
  </form>
</Box>
