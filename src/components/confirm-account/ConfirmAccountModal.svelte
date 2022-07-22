<script lang="ts">
  import Title from "components/bulma/Title.svelte";
  import Button from "components/buttons/Button.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import Modal from "components/popup/Modal.svelte";
  import StateBox from "components/remote/StateBox.svelte";
  import Control from "components/forms/Control.svelte";
  import InputWrapper from "components/forms/InputWrapper.svelte";
  import SelectInput from "components/forms/SelectInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";

  import { query } from "state/query";
  import { Enrollment } from "gql-operations";
  import { sectionType, stringType } from "state/input";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { reloadSiteContext, siteContext } from "store/context";

  export let close: () => void

  let state: RemoteData = emptyLoaded

  let location = ""
  let onCampus = true
  let enrollment = Enrollment.Class
  let section: string | null = "Baritone"
  let conflicts = ""
  let dietaryRestrictions = ""

  async function confirmAccount() {
    if (!section) return;

    state = loading;
    const result = await query("RegisterForSemester", {
      newSemester: {
        enrollment,
        location,
        section,
        conflicts,
        onCampus,
        dietaryRestrictions,
      }
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      close();
      reloadSiteContext();
    }
  }

  // Try to load last semester's data for convenience
  query("ConfirmSemesterForm").then(result => {
    if (result.type === "loaded" && result.data.user) {
      const form = result.data.user;

      location = form.location;
      enrollment = form.previousSemester?.enrollment || Enrollment.Class;
      onCampus = form.onCampus || false;
      section = form.previousSemester?.section || "Baritone";
      dietaryRestrictions = form.dietaryRestrictions || "";
      conflicts = form.conflicts || "";
    }
  });
</script>

<Modal close={close}>
  <form on:submit|preventDefault={confirmAccount}>
    <Title is4>Confirm Your Account</Title>
    <InputWrapper horizontal title="Location">
      <TextInput
        type={stringType}
        value={location}
        onInput={newLocation => location = newLocation}
        placeholder="Glenn"
        required
      />
    </InputWrapper>
    <InputWrapper horizontal title=" ">
      <Control>
        <ButtonGroup connected>
          <Button
            element="a"
            color={onCampus ? "is-primary" : undefined}
            click={() => onCampus = true}
          >
            On-campus
            </Button>
          <Button
            element="a"
            color={!onCampus ? "is-primary" : undefined}
            click={() => onCampus = false}
          >
            Off-campus
            </Button>
        </ButtonGroup>
      </Control>
    </InputWrapper>
    <InputWrapper horizontal title="Voice Part">
      <SelectInput
        type={sectionType($siteContext)}
        values={[...$siteContext.static.sections.map(s => s.name), null]}
        selected={section}
        onInput={newSection => section = newSection}
        expanded
        leftAligned
      />
    </InputWrapper >
    <InputWrapper horizontal title="Enrollment">
      <Control>
        <ButtonGroup connected>
          <Button
            element="a"
            color={enrollment === Enrollment.Class ? "is-primary" : undefined}
            click={() => enrollment = Enrollment.Class}
          >
            Class
            </Button>
          <Button
            element="a"
            color={enrollment === Enrollment.Club ? "is-primary" : undefined}
            click={() => enrollment = Enrollment.Club}
          >
            Club
            </Button>
        </ButtonGroup>
      </Control>
    </InputWrapper>
    <ButtonGroup alignment="is-right">
      <SubmitButton color="is-primary">Confirm</SubmitButton>
    </ButtonGroup>
    <StateBox state={state} />
  </form>
</Modal>
