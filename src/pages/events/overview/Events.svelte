<script lang="ts">
  import Sidebar from "components/popup/Sidebar.svelte";
  import Section from "components/bulma/Section.svelte";
  import Divider from "components/bulma/Divider.svelte";
  import TabContent from "./TabContent.svelte";
  import EventColumns from "./EventColumns.svelte";

  import { notLoaded } from "state/types";
  import { routeEvents } from "route/constructors";
  import { EventTab } from "route/types";
  import { lazyQuery, query } from "state/query";
  import { mapLoaded } from "state/types";
  import { goToRoute } from "store/route";
  import { eventIsOver } from "utils/helpers";
  import { AllEventsDocument, FullEventDocument } from "gql-operations";
  import { derived, readable } from "svelte/store";

  export let eventId: number | null;
  export let tab: EventTab | null;

  const events = query(AllEventsDocument, {});

  $: upcomingEvents = derived(events, $events => mapLoaded($events, es => es.events.filter(e => !eventIsOver(e))));
  $: pastEvents = derived(events, $events => mapLoaded($events, es => es.events.filter(e => eventIsOver(e))));
  $: [selectedEvent, reexecute] = eventId ? lazyQuery(FullEventDocument) : [readable(notLoaded), (_vars) => {}]
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
    {event}
    onUpdate={() => reexecute({ id: event.id })}
  />
</Sidebar>
