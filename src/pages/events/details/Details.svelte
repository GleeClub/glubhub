<script lang="ts">
  import ErrorBox from "components/remote/ErrorBox.svelte";
  import AbsenceRequestButton from "./AbsenceRequestButton.svelte";
  import OfficerInfoSection from "./OfficerInfoSection.svelte";
  import AttendanceBlock from "./AttendanceBlock.svelte";
  import SubtitleAndLocation from "./SubtitleAndLocation.svelte";
  import UniformSection from "./UniformSection.svelte";

  import { FullEventQuery } from "gql-operations";
  import { timeFormatter } from "utils/datetime";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { query } from "state/query";

  export let event: FullEventQuery['event'];
  export let onUpdate: () => void;
  export let onDelete: () => void;

  let rsvpState: RemoteData = emptyLoaded;

  async function rsvp(attending: boolean) {
    rsvpState = loading;
    const result = await query("RsvpForEvent", { id: event.id, attending });

    rsvpState = stateFromResult(result);
    if (result.type === "loaded") {
      onUpdate();
    }
  }

  async function confirm() {
    rsvpState = loading;
    const result = await query("ConfirmForEvent", { id: event.id });

    rsvpState = stateFromResult(result);
    if (result.type === "loaded") {
      onUpdate();
    }
  }
</script>

<div>
  <SubtitleAndLocation {event} />
  {#if event.comments}
    <p>{event.comments}</p>
    <br />
    <br />
  {/if}
  <span>
    <AttendanceBlock {event} {rsvpState} {rsvp} {confirm} />
  </span>
  {#if event.gig?.performanceTime}
    <p>Perform at: {timeFormatter(event.gig.performanceTime)}</p>
  {/if}
  <p>
    This event is worth <b>{event.points}</b> points
  </p>
  {#if event.gig?.uniform}
    <UniformSection uniform={event.gig.uniform} />
  {/if}
  <AbsenceRequestButton {event} />
  <OfficerInfoSection {event} {onDelete} />
  {#if rsvpState.type === "error"}
    <ErrorBox error={rsvpState.error} />
  {/if}
</div>
