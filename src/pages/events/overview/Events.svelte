<script lang="ts">
  import Sidebar from "components/popup/Sidebar.svelte";
  import Section from "components/bulma/Section.svelte";
  import Divider from "components/bulma/Divider.svelte";
  import TabContent from "./TabContent.svelte";
  import EventColumns from "./EventColumns.svelte";

  import { routeEvents } from "route/constructors";
  import { EventTab } from "route/types";
  import { eagerQuery } from "state/query";
  import { goToRoute } from "store/route";
  import { eventIsOver } from "utils/helpers";
  import { derived, readable } from "svelte/store";
  import { mapLazyLoaded, notLoaded } from "state/types";

  export let eventId: number | null;
  export let tab: EventTab | null;

  const [events, _reloadEvents] = eagerQuery("AllEvents", {});

  $: upcomingEvents = derived(events, $events => mapLazyLoaded($events, es => es.events.filter(e => !eventIsOver(e))));
  $: pastEvents = derived(events, $events => mapLazyLoaded($events, es => es.events.filter(e => eventIsOver(e))));
  $: [selectedEvent, reexecute] = eventId
    ? eagerQuery("FullEvent", { id: eventId })
    : [readable(notLoaded), (_vars: { id: number }) => {}];
</script>

<Section>
  <EventColumns events={$upcomingEvents} selectedId={eventId} />
  <Divider content="Past" />
  <EventColumns events={$pastEvents} selectedId={eventId} />
</Section>
<Sidebar
  data={$selectedEvent}
  close={() => goToRoute(routeEvents(null, null))}
>
  <TabContent slot="loaded" let:data={event}
    {tab}
    event={event.event}
    onUpdate={() => reexecute({ id: event.event.id })}
    onDelete={() => reexecute({ id: event.event.id })}
  />
</Sidebar>
