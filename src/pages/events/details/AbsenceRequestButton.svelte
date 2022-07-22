<script lang="ts">
  import Button from 'components/buttons/Button.svelte'

  import { FullEventQuery } from 'gql-operations'
  import { eventRequestAbsence, routeEvents } from 'route/constructors'
  import { replaceRoute } from 'store/route'
  import { eventIsOver } from 'utils/helpers'

  export let event: FullEventQuery['event']
</script>

{#if eventIsOver(event) && !event.userAttendance?.rsvpIssue}
  <!-- Can't request an absence if the event is over -->
{:else if event.userAttendance?.absenceRequest}
  <Button color="is-primary" outlined>
    {`Request ${event.userAttendance.absenceRequest.state}`}
  </Button>
{:else}
  <Button
    color="is-primary"
    outlined
    click={() => replaceRoute(routeEvents(event.id, eventRequestAbsence))}
  >
    Request Absence
  </Button>
{/if}
