<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'

  import { FullEventUserAttendance, RemoteData } from 'src/state/types'

  export let attendance: FullEventUserAttendance
  export let rsvpState: RemoteData
  export let rsvp: (attending: boolean) => void
</script>

{#if attendance.confirmed}
  {#if attendance.shouldAttend}
    <p>You're <b>confirmed</b> to be <b>attending</b></p>
    <Button
      color="is-primary"
      loading={rsvpState.type === 'loading'}
      outlined
      click={() => rsvp(false)}
    >
      oops jk, gotta dip
    </Button>
  {:else}
    <p>The officers know you won't be there</p>
    <Button
      color="is-primary"
      loading={rsvpState.type === 'loading'}
      click={() => rsvp(true)}
    >
      sike I can come. put me in coach!
    </Button>
  {/if}
{:else if attendance.shouldAttend}
  <p>You're coming, right?</p>
  <Button
    color="is-primary"
    loading={rsvpState.type === 'loading'}
    outlined
    click={() => rsvp(false)}
  >
    sorry fam, not this time
  </Button>
  <span />
  <Button
    color="is-primary"
    loading={rsvpState.type === 'loading'}
    click={() => rsvp(true)}
  >
    yep, I'll be there
  </Button>
{:else}
  <p>You're not coming, right?</p>
  <Button
    color="is-primary"
    loading={rsvpState.type === 'loading'}
    click={() => rsvp(true)}
  >
    akshually I can come. you're welcome
  </Button>
{/if}
