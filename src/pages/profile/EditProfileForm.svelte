<script lang="ts">
  import Button from "components/buttons/Button.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import RadioInput from "components/forms/RadioInput.svelte";
  import SelectInput from "components/forms/SelectInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";

  import { Enrollment, NewMember } from "gql-operations";
  import { emailType, enrollmentType, numberType, phoneType, sectionType, stringType } from "state/input";
  import { RemoteData } from "state/types";
  import { siteContext } from "store/context";

  export let form: NewMember;
  export let updateForm: (form: NewMember) => void;
  export let state: RemoteData;
  export let cancel: () => void;
  export let submit: () => void;
</script>

<form on:submit|preventDefault={submit}>
  <TextInput
    horizontal
    type={stringType}
    value={form.firstName}
    onInput={firstName => updateForm({ ...form, firstName })}
    title="First Name"
    required
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.preferredName}
    onInput={preferredName => updateForm({ ...form, preferredName })}
    title="Preferred Name"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.lastName}
    onInput={lastName => updateForm({ ...form, lastName })}
    title="Last Name"
    required
  />
  <TextInput
    horizontal
    type={emailType}
    value={form.email}
    onInput={email => updateForm({ ...form, email })}
    title="Email"
    required
  />
  <TextInput
    horizontal
    type={phoneType}
    value={form.phoneNumber}
    onInput={phoneNumber => updateForm({ ...form, phoneNumber })}
    title="Phone Number"
    required
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.location}
    onInput={location => updateForm({ ...form, location })}
    title="Location"
  />
  <RadioInput
    horizontal
    values={[true, false]}
    selected={form.onCampus}
    render={onCampus => (onCampus ? "Yes" : "No")}
    onInput={onCampus => updateForm({ ...form, onCampus })}
    title="On Campus?"
  />
  <SelectInput
    horizontal
    type={enrollmentType}
    values={[Enrollment.Class, Enrollment.Club, null]}
    selected={form.enrollment}
    onInput={enrollment => updateForm({ ...form, enrollment: enrollment || Enrollment.Club })}
    title="Enrollment"
  />
  <SelectInput
    horizontal
    type={sectionType($siteContext)}
    values={[null, ...$siteContext.static.sections.map(section => section.name)]}
    selected={form.section}
    onInput={section => updateForm({ ...form, section })}
    title="Section"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.about}
    onInput={about => updateForm({ ...form, about })}
    title="About"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.picture}
    onInput={picture => updateForm({ ...form, picture })}
    title="Picture"
  />
  <TextInput
    horizontal
    type={numberType}
    value={form.arrivedAtTech}
    onInput={arrivedAtTech => updateForm({ ...form, arrivedAtTech })}
    title="Arrived At Tech"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.gatewayDrug}
    onInput={gatewayDrug => updateForm({ ...form, gatewayDrug })}
    title="Gateway Drug"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.conflicts}
    onInput={conflicts => updateForm({ ...form, conflicts })}
    title="Conflicts"
  />
  <TextInput
    horizontal
    type={stringType}
    value={form.dietaryRestrictions}
    onInput={dietaryRestrictions =>
      updateForm({ ...form, dietaryRestrictions })
    }
    title="Dietary Restrictions"
  />
  <ButtonGroup alignment="is-right">
    <Button click={cancel}>Cancel</Button>
    <SubmitButton color="is-primary" loading={state.type === "loading"}>
      Save
    </SubmitButton>
  </ButtonGroup>
  {#if state.type === "error"}
    <ErrorBox error={state.error} />
  {/if}
</form>
