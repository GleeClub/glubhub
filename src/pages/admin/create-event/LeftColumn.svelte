<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { NewEventFields, NewGig } from 'src/gql-operations'
  import { dateType, numberType, stringType, timeType } from 'src/state/input'
  import { combineDateAndTime } from 'src/utils/datetime'

  export let event: NewEventFields
  export let updateEvent: (event: NewEventFields) => void
  export let gig: NewGig
  export let updateGig: (gig: NewGig) => void
</script>

<Column>
  <TextInput
    type={stringType}
    value={event.name}
    onInput={(name) => updateEvent({ ...event, name })}
    title="Event Name"
    placeholder="Flashmobbing the HOMO SEX IS SIN people"
    helpText="Make it descriptive, make it short."
    required
  />
  <TextInput
    type={stringType}
    value={event.location}
    onInput={(location) => updateEvent({ ...event, location })}
    title="Event Location"
    placeholder="Your mom's house 😂"
    helpText="ha gottem"
  />
  <TextInput
    type={dateType}
    value={event.callTime}
    onInput={(callDate) =>
      updateEvent({
        ...event,
        callTime: combineDateAndTime(callDate, event.callTime),
      })}
    title="Date of Event"
    required
  />
  <TextInput
    type={timeType}
    value={event.callTime}
    onInput={(callTime) =>
      updateEvent({
        ...event,
        callTime: combineDateAndTime(event.callTime, callTime),
      })}
    title="Call Time"
    helpText="4:20 lamo"
    required
  />
  <TextInput
    type={timeType}
    value={gig.performanceTime}
    onInput={(performanceTime) =>
      updateGig({
        ...gig,
        performanceTime: combineDateAndTime(gig.performanceTime, performanceTime),
      })}
    title="Event Time"
    helpText="4:21 lamo"
  />
  <TextInput
    type={timeType}
    value={event.releaseTime || 0}
    onInput={(releaseTime) =>
      updateEvent({
        ...event,
        releaseTime: combineDateAndTime(event.releaseTime || 0, releaseTime),
      })}
    title="Release Time"
    helpText="4:22 lamo"
  />
  <TextInput
    type={dateType}
    value={event.releaseTime  || 0}
    onInput={(releaseDate) =>
      updateEvent({
        ...event,
        releaseTime: combineDateAndTime(releaseDate, event.releaseTime || 0),
      })}
    title="Release Date"
  />
  <TextInput
    type={numberType}
    value={event.points}
    onInput={(points) => updateEvent({ ...event, points: points || 0 })}
    title="How many points is this worth?"
    placeholder="69"
  />
</Column>
