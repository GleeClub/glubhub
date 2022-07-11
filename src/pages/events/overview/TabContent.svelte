<script lang="ts">
  import Title from "components/bulma/Title.svelte";
  import BackButton from "components/buttons/BackButton.svelte";
  import EventTabs from "./EventTabs.svelte";

  import { EventTab } from "route/types";
  import { FullEventQuery } from "gql-operations";

  export let event: FullEventQuery['event'];
  export let tab: EventTab | null;
  export let onUpdate: () => void;

  const tabsWithHeader: EventTab["route"][] = 
    ["attendance", "attendees", "setlist", "carpools"];
</script>

{#if !tab.route || tabsWithHeader.includes(tab?.route)}
  <BackButton content="all events" click={unselectEvent} />
  <Title centered>{event.name}</Title>
  <EventTabs {event} currentTab={tab} />
{/if}
{#if tab?.route === "attendance"}
  <Attendance eventId={event.id} />
{:else if tab?.route === "attendees"}
  <Attendees eventId={event.id} />
{:else if tab?.route === "setlist"}
  <Setlist eventId={props.event.id} />
{:else if tab?.route === "carpools"}
  <Carpools event={props.event} />
{:else if tab?.route === "request-absence"}
  <RequestAbsence
    event={props.event}
    cancel={() => props.changeTab(eventDetails)}
    success={absenceRequest =>
      props.updateEvent({ ...props.event, absenceRequest })
    }
  />
{:else if tab?.route === "edit"}
  <BackButton
    content="cancel editing"
    click={() => changeTab(eventDetails)}
  />
  <EditEvent event={props.event} updateEvent={props.updateEvent} />
{:else}
  <Details
    event={props.event}
    updateEvent={props.updateEvent}
    deletedEvent={() => props.deletedEvent(props.event)}
  />
{/if}
