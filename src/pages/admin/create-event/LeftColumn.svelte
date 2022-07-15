<script lang="ts">
  import Column from "components/bulma/Column.svelte";
  import TextInput from "components/forms/TextInput.svelte";

  import { NewEventFields, NewGig } from "gql-operations";
  import { dateType, numberType, stringType, timeType } from "state/input";

  export let event: NewEventFields;
  export let updateEvent: (event: NewEventFields) => void;
  export let gig: NewGig;
  export let updateGig: (gig: NewGig) => void;
</script>

<Column>
  <TextInput
    type={stringType}
    value={event.name}
    onInput={name => updateEvent({ ...event, name })}
    title="Event Name"
    placeholder="Flashmobbing the HOMO SEX IS SIN people"
    helpText="Make it descriptive, make it short."
    required
  />
  <TextInput
    type={stringType}
    value={event.location}
    onInput={location => updateEvent({ ...event, location })}
    title="Event Location"
    placeholder="Your mom's house 😂"
    helpText="ha gottem"
  />
  <TextInput
    type={dateType}
    value={event.callDate}
    onInput={callDate => updateEvent({ ...event, callDate })}
    title="Date of Event"
    required
  />
  <TextInput
    type={timeType}
    value={event.callTime}
    onInput={callTime => updateEvent({ ...event, callTime })}
    title="Call Time"
    helpText="4:20 lamo"
    required
  />
  <TextInput
    type={timeType}
    value={gig.performanceTime}
    onInput={performanceTime => updateGig({ ...gig, performanceTime })}
    title="Event Time"
    helpText="4:21 lamo"
  />
  <TextInput
    type={timeType}
    value={event.releaseTime}
    onInput={releaseTime => updateEvent({ ...event, releaseTime })}
    title="Release Time"
    helpText="4:22 lamo"
  />
  <TextInput
    type={dateType}
    value={event.releaseDate}
    onInput={releaseDate => updateEvent({ ...event, releaseDate })}
    title="Release Date"
  />
  <TextInput
    type={numberType}
    value={event.points}
    onInput={points => updateEvent({ ...event, points: points || 0 })}
    title="How many points is this worth?"
    placeholder="69"
  />
</Column>
