<script lang="ts">
  import Columns from 'components/bulma/Columns.svelte'
  import EventColumn from './EventColumn.svelte'

  import { LazyRemoteData } from 'state/types'
  import { AllEventsQuery } from 'gql-operations'

  export let events: LazyRemoteData<AllEventsQuery['events']>
  export let selectedId: number | null
</script>

<Columns>
  <EventColumn
    {events}
    {selectedId}
    title="Volunteer"
    allowedEventTypes={['Volunteer Gig']}
  />
  <EventColumn
    {events}
    {selectedId}
    title="Rehearsal"
    allowedEventTypes={['Rehearsal', 'Sectional']}
  />
  <EventColumn
    {events}
    {selectedId}
    title="Tutti"
    allowedEventTypes={['Tutti Gig']}
  />
  <EventColumn
    {events}
    {selectedId}
    title="Ombuds"
    allowedEventTypes={['Ombuds', 'Other']}
  />
</Columns>
