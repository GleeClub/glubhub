<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import CheckboxInput from 'src/components/forms/CheckboxInput.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextareaInput from 'src/components/forms/TextareaInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import { RemoteData } from 'src/state/types'
  import { ALL_PERIODS } from 'src/utils/constants'
  import { dateType, periodType, stringType } from 'src/state/input'
  import { NewEventFields, NewEventPeriod, NewGig } from 'src/gql-operations'

  export let event: NewEventFields
  export let gig: NewGig
  export let repeat: NewEventPeriod | null
  export let updateEvent: (event: NewEventFields) => void
  export let updateGig: (event: NewGig) => void
  export let updateRepeat: (repeat: NewEventPeriod | null) => void
  export let state: RemoteData
</script>

<Column>
  <CheckboxInput
    content="This event is public, so I want it to show up on the external site"
    checked={gig.public}
    onChange={(isPublic) => updateGig({ ...gig, public: isPublic })}
  />
  {#if gig.public}
    <TextInput
      type={stringType}
      value={gig.summary}
      onInput={(summary) => updateGig({ ...gig, summary })}
      title="Public Summary"
      helpText="Careful, real people will see this"
      placeholder="Friends? Countrymen? Bueller?"
    />
    <TextareaInput
      value={gig.description || ''}
      onInput={(description) => updateGig({ ...gig, description })}
      title="Public Description"
      helpText="Careful, real people will see this"
      placeholder="We the people, in order to kick a more perfect ass, I don't know where this is going"
    />
  {/if}
  <CheckboxInput
    content="No one has to come to this event (forum, fundatory, etc)"
    checked={!event.defaultAttend}
    onChange={(defaultNotAttend) =>
      updateEvent({ ...event, defaultAttend: !defaultNotAttend })}
  />
  <CheckboxInput
    content="This event counts as a volunteer gig"
    checked={event.gigCount || false}
    onChange={(gigCount) => updateEvent({ ...event, gigCount })}
  />
  <SelectInput
    type={periodType}
    values={[null, ...ALL_PERIODS]}
    selected={repeat?.period}
    onInput={(period) =>
      updateRepeat(period && repeat ? { ...repeat, period } : null)}
    title="Repeat"
  />
  <TextInput
    type={dateType}
    value={repeat?.repeatUntil}
    onInput={(repeatUntil) =>
      updateRepeat(repeatUntil && repeat ? { ...repeat, repeatUntil } : null)}
    title="Repeat Until"
    required={!!repeat?.period}
  />

  <br />
  <SubmitButton color="is-primary" loading={state.type === 'loading'}>
    Yeehaw
  </SubmitButton>
  {#if state.type === 'error'}
    <ErrorBox error={state.error} />
  {/if}
</Column>
