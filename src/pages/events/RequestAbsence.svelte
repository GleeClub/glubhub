<script lang="ts">
  import Subtitle from "components/bulma/Subtitle.svelte";
  import Title from "components/bulma/Title.svelte";
  import BackButton from "components/buttons/BackButton.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import TextareaInput from "components/forms/TextareaInput.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";

  import { query } from "state/query";
  import { replaceRoute } from "store/route";
  import { eventDetails, routeEvents } from "route/constructors";
  import { FullEventQuery } from "gql-operations";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";

  export let event: FullEventQuery['event'];
  export let onUpdate: () => void;
  
  let reason = "";
  let state: RemoteData = emptyLoaded;

  function goBackToDetails() {
    replaceRoute(routeEvents(event.id, eventDetails));
  }

  async function submitAbsence() {
    state = loading;
    const result = await query("RequestAbsence", { eventId: event.id, reason });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      onUpdate();
      goBackToDetails();
    }
  }
</script>

<div>
  <BackButton content="back to event" click={goBackToDetails} />
  <Title centered>Absence Request</Title>
  <Subtitle centered>for {event.name}</Subtitle>
  <br />
  <form on:submit|preventDefault={submitAbsence}>
    <TextareaInput
      value={reason}
      onInput={newReason => reason = newReason}
      title="But y tho"
      placeholder="Excuses, excuses"
      required
    />
    <ButtonGroup alignment="is-right">
      <SubmitButton color="is-primary" loading={state.type === "loading"}>
        Beg for Mercy
      </SubmitButton>
    </ButtonGroup>
  </form>
  {#if state.type === "error"}
    <ErrorBox error={state.error} />
  {/if}
</div>
