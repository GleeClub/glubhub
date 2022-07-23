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
  import { twentyFourHourTimeFormatter } from 'src/utils/datetime'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'

  export let gigRequestId: number | null

  let state: RemoteData = emptyLoaded
  let repeat: NewEventPeriod | null = null

  let event: NewEventFields = {
    name: '',
    semester: get(siteContext).currentSemester.name,
    type: 'Rehearsal',
    callTime: '',
    releaseTime: '',
    points: 5,
    comments: '',
    location: '',
    gigCount: false,
    defaultAttend: true,
  }

  let gig: NewGig = {
    performanceTime: '',
    uniform: 0,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    price: null,
    public: false,
    summary: '',
    description: '',
  }

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
        // TODO: which formatter?
        event.callTime = twentyFourHourTimeFormatter(request.startTime)
        event.comments = request.comments || ''
        event.location = request.location
        event.gigCount = true
        event.defaultAttend = false

        gig.performanceTime = twentyFourHourTimeFormatter(request.startTime)
        gig.contactName = request.contactName
        gig.contactEmail = request.contactEmail
        gig.contactPhone = request.contactPhone
      }
    })
  }
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
