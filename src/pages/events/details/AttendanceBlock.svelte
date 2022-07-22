<script lang="ts">
  import Button from 'components/buttons/Button.svelte'
  import RsvpActions from './RsvpActions.svelte'
  import AttendanceSummary from './AttendanceSummary.svelte'

  import { FullEventQuery } from 'gql-operations'
  import { RemoteData } from 'state/types'
  import { eventIsOver } from 'utils/helpers'

  export let event: FullEventQuery['event']
  export let rsvpState: RemoteData
  export let confirm: () => void
  export let rsvp: (attendind: boolean) => void
</script>

{#if !event?.userAttendance}
  <!-- No attendance for inactive members -->
{:else if eventIsOver(event)}
  <!-- Show whether the member attended the event -->
  <AttendanceSummary points={event.points} attendance={event.userAttendance} />
{:else if !event.userAttendance.rsvpIssue}
  <!-- If the event isn't over but they can still RSVP -->
  <RsvpActions {rsvp} {rsvpState} attendance={event.userAttendance} />
{:else if event.userAttendance.confirmed}
  <!-- If they can't RSVP but are already confirmed -->
  We know you're coming
{:else if ['Sectional', 'Tutti Gig', 'Rehearsal'].includes(event.type)}
  <!-- If they can't RSVP but are still allowed to confirm -->
  <p>You're coming, right?</p>
  <Button
    color="is-primary"
    loading={rsvpState.type === 'loading'}
    click={confirm}
  >
    yep, I'll be there
  </Button>
{:else}
  <!-- Can't confirm or RSVP, so show the error -->
  <p class="has-text-grey-light is-italic">{event.userAttendance.rsvpIssue}</p>
{/if}
