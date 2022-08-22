<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import Modal from 'src/components/popup/Modal.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'
  import Control from 'src/components/forms/Control.svelte'
  import InputWrapper from 'src/components/forms/InputWrapper.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { query } from 'src/state/query'
  import { Enrollment, RegisterForSemesterForm } from 'src/gql-operations'
  import { sectionType, stringType } from 'src/state/input'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { reloadSiteContext, siteContext } from 'src/store/context'

  export let close: () => void

  let state: RemoteData = emptyLoaded

  let form: RegisterForSemesterForm = {
    location: '',
    onCampus: true,
    enrollment: Enrollment.Class,
    section: 'Baritone',
    conflicts: '',
    dietaryRestrictions: '',
  }

  async function confirmAccount() {
    if (!form.section) return

    state = loading
    const result = await query('RegisterForSemester', {
      newSemester: form,
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      close()
      reloadSiteContext()
    }
  }

  // Try to load last semester's data for convenience
  query('ConfirmSemesterForm').then((result) => {
    if (result.type === 'loaded' && result.data.user) {
      const f = result.data.user

      form = {
        location: f.location,
        enrollment: f.previousSemester?.enrollment || Enrollment.Class,
        onCampus: f.onCampus,
        section: f.previousSemester?.section || 'Baritone',
        dietaryRestrictions: f.dietaryRestrictions,
        conflicts: f.conflicts,
      }
    }
  })
</script>

<Modal {close}>
  <form on:submit|preventDefault={confirmAccount}>
    <Title is4>Confirm Your Account</Title>
    <InputWrapper horizontal title="Location">
      <TextInput
        type={stringType}
        value={form.location}
        onInput={(newLocation) => (form.location = newLocation)}
        placeholder="Glenn"
        required
      />
    </InputWrapper>
    <InputWrapper horizontal title=" ">
      <Control>
        <ButtonGroup connected>
          <Button
            element="a"
            color={form.onCampus ? 'is-primary' : undefined}
            click={() => (form.onCampus = true)}
          >
            On-campus
          </Button>
          <Button
            element="a"
            color={!form.onCampus ? 'is-primary' : undefined}
            click={() => (form.onCampus = false)}
          >
            Off-campus
          </Button>
        </ButtonGroup>
      </Control>
    </InputWrapper>
    <InputWrapper horizontal title="Voice Part">
      <SelectInput
        type={sectionType($siteContext)}
        values={$siteContext.static.sections.map((s) => s.name)}
        selected={form.section}
        onInput={(newSection) => (form.section = newSection || 'Baritone')}
        expanded
        leftAligned
      />
    </InputWrapper>
    <InputWrapper horizontal title="Enrollment">
      <Control>
        <ButtonGroup connected>
          <Button
            element="a"
            color={form.enrollment === Enrollment.Class
              ? 'is-primary'
              : undefined}
            click={() => (form.enrollment = Enrollment.Class)}
          >
            Class
          </Button>
          <Button
            element="a"
            color={form.enrollment === Enrollment.Club
              ? 'is-primary'
              : undefined}
            click={() => (form.enrollment = Enrollment.Club)}
          >
            Club
          </Button>
        </ButtonGroup>
      </Control>
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
    <ButtonGroup alignment="is-right">
      <SubmitButton color="is-primary">Confirm</SubmitButton>
    </ButtonGroup>
    <StateBox {state} />
  </form>
</Modal>
