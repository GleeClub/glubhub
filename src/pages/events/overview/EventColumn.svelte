<script lang="ts">
  import SelectableList from "components/remote/SelectableList.svelte";
  import EventRow from "./EventRow.svelte";

  import { Event } from "gql-operations";
  import { routeEvents } from "route/constructors";
  import { mapLoaded, RemoteData } from "state/types";
  import { replaceRoute } from "store/route";

  export let title: string;
  export let allowedEventTypes: string[];
  export let events: RemoteData<Event[]>;
  export let selectedId: number | null;

  $: eventGroups = mapLoaded(events, all => [all.filter(event => allowedEventTypes.includes(event.type))])
</script>

<div class="column is-one-quarter is-centered">
  <SelectableList
    title={title}
    itemGroups={eventGroups}
    isSelected={event => event.id === selectedId}
    select={event => replaceRoute(routeEvents(event.id, null))}
    messageIfEmpty="No events here, misster."
  >
    <EventRow let:event={rowEvent} event={rowEvent} />
  </SelectableList>
</div>
