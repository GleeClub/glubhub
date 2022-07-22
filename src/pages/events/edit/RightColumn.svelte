<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import SubmitButton from 'components/buttons/SubmitButton.svelte'
  import CheckboxInput from 'components/forms/CheckboxInput.svelte'
  import TextareaInput from 'components/forms/TextareaInput.svelte'
  import TextInput from 'components/forms/TextInput.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'

  import { stringType } from 'state/input'
  import { RemoteData } from 'state/types'
  import { EventForm, GigForm } from './state'

  export let event: EventForm
  export let updateEvent: (event: EventForm) => void
  export let gig: GigForm
  export let updateGig: (gig: GigForm) => void
  export let state: RemoteData
</script>

<Column>
  <CheckboxInput
    checked={gig.public}
    content="This event is public, so I want it to show up on the external site"
    onChange={(newPublic) => updateGig({ ...gig, public: newPublic })}
  />
  {#if gig.public}
    <TextInput
      type={stringType}
      value={gig.summary}
      onInput={(summary) => updateGig({ ...gig, summary })}
      title="Public Summary"
      placeholder="Friends? Countrymen? Bueller?"
      helpText="Careful, real people will see this"
    />
    <TextareaInput
      value={gig.description}
      onInput={(description) => updateGig({ ...gig, description })}
      title="Public Description"
      helpText="Careful, real people will see this"
      placeholder="We the people, in order to kick a more perfect ass, I don't know where this is going"
    />
  {/if}
  <CheckboxInput
    checked={!event.defaultAttend}
    content="No one has to come to this event (forum, fundatory, etc)"
    onChange={(defaultNotAttend) =>
      updateEvent({ ...event, defaultAttend: !defaultNotAttend })}
  />
  <CheckboxInput
    checked={event.gigCount}
    content="This event counts as a volunteer gig"
    onChange={(gigCount) => updateEvent({ ...event, gigCount })}
  />

  <br />
  <br />
  <SubmitButton color="is-primary" loading={state.type === 'loading'}>
    Update
  </SubmitButton>
  {#if state.type === 'error'}
    <ErrorBox error={state.error} />
  {/if}
</Column>
