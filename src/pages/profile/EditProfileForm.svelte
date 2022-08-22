<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import RadioInput from 'src/components/forms/RadioInput.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import {
    emailType,
    enrollmentType,
    numberType,
    phoneType,
    sectionType,
    stringType,
  } from 'src/state/input'
  import { Enrollment, MemberUpdate } from 'src/gql-operations'
  import { RemoteData } from 'src/state/types'
  import { siteContext } from 'src/store/context'

  export let form: MemberUpdate
  export let updateForm: (form: MemberUpdate) => void
  export let state: RemoteData
  export let cancel: () => void
  export let submit: () => void
</script>

<form on:submit|preventDefault={submit}>
  <TextInput
    horizontal
    type={stringType}
    value={form.firstName}
    onInput={(firstName) => updateForm({ ...form, firstName })}
    title="First Name"
    required
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.preferredName}
    onInput={(preferredName) => updateForm({ ...form, preferredName })}
    title="Preferred Name"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.lastName}
    onInput={(lastName) => updateForm({ ...form, lastName })}
    title="Last Name"
    required
  />
  <TextInput
    horizontal
    type={emailType}
    value={form.email}
    onInput={(email) => updateForm({ ...form, email })}
    title="Email"
    required
  />
  <TextInput
    horizontal
    type={phoneType}
    value={form.phoneNumber}
    onInput={(phoneNumber) => updateForm({ ...form, phoneNumber })}
    title="Phone Number"
    required
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.location}
    onInput={(location) => updateForm({ ...form, location })}
    title="Location"
    required
  />
  <RadioInput
    horizontal
    values={[true, false]}
    selected={form.onCampus}
    render={(onCampus) => (onCampus ? 'Yes' : 'No')}
    onInput={(onCampus) => updateForm({ ...form, onCampus })}
    title="On Campus?"
  />
  <SelectInput
    horizontal
    type={enrollmentType}
    values={[Enrollment.Class, Enrollment.Club, null]}
    selected={form.enrollment}
    onInput={(enrollment) => updateForm({ ...form, enrollment })}
    title="Enrollment"
  />
  <SelectInput
    horizontal
    type={sectionType($siteContext)}
    values={[
      null,
      ...$siteContext.static.sections.map((section) => section.name),
    ]}
    selected={form.section}
    onInput={(section) =>
      updateForm({ ...form, section: section || form.section })}
    title="Section"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.about}
    onInput={(about) => updateForm({ ...form, about })}
    title="About"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.picture}
    onInput={(picture) => updateForm({ ...form, picture })}
    title="Picture"
  />
  <TextInput
    horizontal
    type={numberType}
    value={form.arrivedAtTech}
    onInput={(arrivedAtTech) => updateForm({ ...form, arrivedAtTech })}
    title="Arrived At Tech"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.gatewayDrug}
    onInput={(gatewayDrug) => updateForm({ ...form, gatewayDrug })}
    title="Gateway Drug"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.conflicts}
    onInput={(conflicts) => updateForm({ ...form, conflicts })}
    title="Conflicts"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.dietaryRestrictions}
    onInput={(dietaryRestrictions) =>
      updateForm({ ...form, dietaryRestrictions })}
    title="Dietary Restrictions"
  />
  <ButtonGroup alignment="is-right">
    <Button click={cancel}>Cancel</Button>
    <SubmitButton color="is-primary" loading={state.type === 'loading'}>
      Save
    </SubmitButton>
  </ButtonGroup>
  {#if state.type === 'error'}
    <ErrorBox error={state.error} />
  {/if}
</form>
