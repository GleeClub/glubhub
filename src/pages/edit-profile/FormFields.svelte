<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import Control from 'src/components/forms/Control.svelte'
  import InputWrapper from 'src/components/forms/InputWrapper.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import {
    emailType,
    numberType,
    passwordType,
    phoneType,
    sectionType,
    stringType,
  } from 'src/state/input'
  import { Enrollment, MemberUpdate } from 'src/gql-operations'
  import { routeProfile } from 'src/route/constructors'
  import { RemoteData } from 'src/state/types'
  import { siteContext } from 'src/store/context'
  import { createEventDispatcher } from 'svelte'
  import CheckboxInput from 'src/components/forms/CheckboxInput.svelte'

  export let form: MemberUpdate
  export let updateForm: (form: MemberUpdate) => void
  export let password: string
  export let updatePassword: (password: string) => void
  export let confirmPassword: string
  export let updateConfirmPassword: (confirmPassword: string) => void
  export let state: RemoteData

  const dispatch = createEventDispatcher<{ submit: void }>()
</script>

<form on:submit|preventDefault={() => dispatch('submit')}>
  <Title is4>Really Important Stuff</Title>
  <InputWrapper horizontal title="Name">
    <TextInput
      type={stringType}
      value={form.firstName}
      onInput={(firstName) => updateForm({ ...form, firstName })}
      required
      placeholder="First"
    />
    <TextInput
      type={stringType}
      value={form.preferredName}
      onInput={(preferredName) => updateForm({ ...form, preferredName })}
      placeholder="Preferred (optional)"
    />
    <TextInput
      type={stringType}
      value={form.lastName}
      onInput={(lastName) => updateForm({ ...form, lastName })}
      required
      placeholder="Last"
    />
  </InputWrapper>
  <TextInput
    type={emailType}
    value={form.email}
    onInput={(email) => updateForm({ ...form, email })}
    horizontal
    required
    title="E-mail"
    placeholder="gburdell3@gatech.edu"
  />
  <TextInput
    type={phoneType}
    value={form.phoneNumber}
    onInput={(phoneNumber) => updateForm({ ...form, phoneNumber })}
    horizontal
    required
    title="Phone Number"
    placeholder="6788675309"
  />
  <InputWrapper horizontal title="Password">
    <TextInput
      type={passwordType}
      value={password}
      onInput={(password) => updatePassword(password)}
      placeholder="Password"
    />
    <TextInput
      type={passwordType}
      value={confirmPassword}
      onInput={(confirmPassword) => updateConfirmPassword(confirmPassword)}
      placeholder="Confirm Password"
    />
  </InputWrapper>
  <InputWrapper horizontal title="Location">
    <TextInput
      type={stringType}
      value={form.location}
      onInput={(location) => updateForm({ ...form, location })}
      required
      placeholder="Glenn"
    />
    <Control>
      <ButtonGroup connected>
        <Button
          color={form.onCampus ? 'is-primary' : undefined}
          click={() => updateForm({ ...form, onCampus: true })}
        >
          On-campus
        </Button>
        <Button
          color={!form.onCampus ? 'is-primary' : undefined}
          click={() => updateForm({ ...form, onCampus: false })}
        >
          Off-campus
        </Button>
      </ButtonGroup>
    </Control>
  </InputWrapper>
  <InputWrapper horizontal title="Car">
    <div class="field is-grouped">
      <CheckboxInput
        content="I have a car"
        checked={form.passengers > 0}
        onChange={(hasCar) =>
          updateForm({ ...form, passengers: hasCar ? 1 : 0 })}
      />
      {#if form.passengers > 0}
        <TextInput
          type={numberType}
          value={form.passengers}
          onInput={(passengers) =>
            updateForm({ ...form, passengers: passengers || 0 })}
          placeholder="How many?"
          suffix="passengers"
        />
      {/if}
    </div>
  </InputWrapper>
  <InputWrapper horizontal title="Conflicts">
    <TextInput
      type={stringType}
      value={form.conflicts}
      onInput={(newConflicts) => (form.conflicts = newConflicts)}
      placeholder="I got lab till 7 on Mondays and it makes me sad"
    />
  </InputWrapper>
  <InputWrapper horizontal title="Dietary Restrictions">
    <TextInput
      type={stringType}
      value={form.dietaryRestrictions}
      onInput={(newRestrictions) =>
        (form.dietaryRestrictions = newRestrictions)}
      placeholder="My tummy huwts"
    />
  </InputWrapper>
  <InputWrapper horizontal title="Enrollment">
    <InputWrapper horizontal>
      <Control>
        <ButtonGroup connected>
          {#if $siteContext.user}
            <Button
              color={!form.enrollment ? 'is-primary' : undefined}
              click={() => updateForm({ ...form, enrollment: null })}
            >
              Inactive
            </Button>
          {/if}
          <Button
            color={form.enrollment === Enrollment.Class
              ? 'is-primary'
              : undefined}
            click={() => updateForm({ ...form, enrollment: Enrollment.Class })}
          >
            Class
          </Button>
          <Button
            color={form.enrollment === Enrollment.Club
              ? 'is-primary'
              : undefined}
            click={() => updateForm({ ...form, enrollment: Enrollment.Club })}
          >
            Club
          </Button>
        </ButtonGroup>
      </Control>
      <span style:width="15px" />
      <SelectInput
        type={sectionType($siteContext)}
        values={$siteContext.static.sections.map((section) => section.name)}
        selected={form.section}
        onInput={(section) => updateForm({ ...form, section })}
      />
    </InputWrapper>
  </InputWrapper>

  <Title is4>Nice to Know</Title>
  <TextInput
    type={stringType}
    value={form.about}
    onInput={(about) => updateForm({ ...form, about })}
    horizontal
    title="About"
    placeholder="I like big butts and I cannot lie"
  />
  <TextInput
    type={stringType}
    value={form.major}
    onInput={(major) => updateForm({ ...form, major })}
    horizontal
    title="Major"
    placeholder="Undecided Engineering"
  />
  <TextInput
    type={stringType}
    value={form.minor}
    onInput={(minor) => updateForm({ ...form, minor })}
    horizontal
    title="Minor"
    placeholder="CS cause I like money"
  />
  <TextInput
    type={stringType}
    value={form.hometown}
    onInput={(hometown) => updateForm({ ...form, hometown })}
    horizontal
    title="Hometown"
    placeholder="Winslow, Arizona"
  />
  <TextInput
    type={numberType}
    value={form.arrivedAtTech}
    onInput={(arrivedAtTech) =>
      updateForm({
        ...form,
        arrivedAtTech: arrivedAtTech || new Date().getFullYear(),
      })}
    horizontal
    title="Arrived at Tech"
    placeholder="2099"
  />
  <TextInput
    type={stringType}
    value={form.picture}
    onInput={(picture) => updateForm({ ...form, picture })}
    horizontal
    title="Picture URL"
    placeholder="https://create.mylittlepony.movie/images/ponyparticon_bodybig.png"
  />
  <ButtonGroup alignment="is-right">
    {#if $siteContext.user}
      <LinkButton route={routeProfile($siteContext.user.email, null)}>
        Back
      </LinkButton>
    {/if}
    <SubmitButton color="is-primary" loading={state.type === 'loading'}>
      Save
    </SubmitButton>
  </ButtonGroup>
</form>
