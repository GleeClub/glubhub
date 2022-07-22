<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import SubmitButton from 'components/buttons/SubmitButton.svelte'
  import TextInput from 'components/forms/TextInput.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'

  import { NewSemester } from 'gql-operations'
  import { RemoteData } from 'state/types'
  import { dateType, numberType, stringType } from 'state/input'

  export let semester: NewSemester
  export let update: (semester: NewSemester) => void
  export let state: RemoteData
  export let submitMessage: string
  export let submit: () => void
</script>

<form on:submit|preventDefault={submit}>
  <Column narrow>
    <TextInput
      type={stringType}
      value={semester.name}
      onInput={(name) => update({ ...semester, name })}
      title="Semester Name"
      placeholder="Fall 20XX"
      required
    />
    <TextInput
      type={dateType}
      value={semester.startDate}
      onInput={(startDate) => update({ ...semester, startDate })}
      title="The first day of the rest of your life"
      required
    />
    <TextInput
      type={dateType}
      value={semester.endDate}
      onInput={(endDate) => update({ ...semester, endDate })}
      title="The last day of the rest of your life"
      required
    />
    <TextInput
      type={numberType}
      value={semester.gigRequirement}
      onInput={(gigRequirement) =>
        update({ ...semester, gigRequirement: gigRequirement || 0 })}
      title="Number of required volunteer gigs"
      placeholder="5"
      required
    />

    <br />
    <SubmitButton color="is-primary" loading={state.type === 'loading'}>
      {submitMessage}
    </SubmitButton>

    <br />
    {#if state.type === 'error'}
      <ErrorBox error={state.error} />
    {/if}
  </Column>
</form>
