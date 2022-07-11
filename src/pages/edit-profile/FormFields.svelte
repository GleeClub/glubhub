<script lang="ts">
  import { RemoteData } from "state/types";
import { siteContext } from "store/context";
import { createEventDispatcher } from "svelte";

  export let form: ProfileForm;
  export let state: RemoteData;
  
  const dispatch = createEventDispatcher<{
    submit: () => void
  }>()

</script>

interface FormFieldsProps {
  form: ProfileForm;
  user: Member | null;
  state: SubmissionState;
  submit: (event: FormEvent) => void;
  update: (form: ProfileForm) => void;
}

<form on:submit|preventDefault={submit}>
  <Title4>Really Important Stuff</Title4>
  <InputWrapper horizontal title="Name">
    <TextInput
      type={stringType}
      value={form.firstName}
      onInput={firstName => update({ ...form, firstName })}
      required
      placeholder="First"
    />
    <TextInput
      type={stringType}
      value={form.preferredName}
      onInput={preferredName => update({ ...form, preferredName })}
      placeholder="Preferred (optional)"
    />
    <TextInput
      type={stringType}
      value={form.lastName}
      onInput={lastName => update({ ...form, lastName })}
      required
      placeholder="Last"
    />
  </InputWrapper>
  <TextInput
    type={emailType}
    value={form.email}
    onInput={email => update({ ...form, email })}
    horizontal
    required
    title="E-mail"
    placeholder="gburdell3@gatech.edu"
  />
  <TextInput
    type={phoneType}
    value={form.phoneNumber}
    onInput={phoneNumber => update({ ...form, phoneNumber })}
    horizontal
    required
    title="Phone Number"
    placeholder="6788675309"
  />
  <InputWrapper horizontal title="Password">
    <TextInput
      type={passwordType}
      value={form.password}
      onInput={password => update({ ...form, password })}
      required
      placeholder="Password"
    />
    <TextInput
      type={passwordType}
      value={form.confirmPassword}
      onInput={confirmPassword => update({ ...form, confirmPassword })}
      required
      placeholder="Confirm Password"
    />
  </InputWrapper>
  <InputWrapper horizontal title="Location">
    <LocationFieldBlock form={form} update={update} />
  </InputWrapper>
  <TextInput
    type={stringType}
    value={form.major}
    onInput={major => update({ ...form, major })}
    required
    horizontal
    title="Major"
    placeholder="Undecided Engineering"
  />
  <TextInput
    type={stringType}
    value={form.hometown}
    onInput={hometown => update({ ...form, hometown })}
    required
    horizontal
    title="Hometown"
    placeholder="Winslow, Arizona"
  />
  <InputWrapper horizontal title="Car">
    <CarFieldBlock form={form} update={update} />
  </InputWrapper>
  <InputWrapper horizontal title="Enrollment">
    <EnrollmentBlock form={form} update={update} user={user} />
  </InputWrapper>

  <Title4>Nice to Know</Title4>
  <TextInput
    type={stringType}
    value={form.about}
    onInput={about => update({ ...form, about })}
    horizontal
    title="About"
    placeholder="I like big butts and I cannot lie"
  />
  <TextInput
    type={stringType}
    value={form.picture}
    onInput={picture => update({ ...form, picture })}
    horizontal
    title="Picture URL"
    placeholder="https://create.mylittlepony.movie/images/ponyparticon_bodybig.png"
  />
  <TextInput
    type={numberType}
    value={form.arrivedAtTech}
    onInput={arrivedAtTech =>
      update({
        ...form,
        arrivedAtTech: arrivedAtTech || new Date().getFullYear()
      })
    }
    horizontal
    title="Arrived at Tech"
    placeholder="2099"
  />
  <ActionButtons user={user} state={state} />
  </form>
