<script lang="ts">
  import EmailLink from 'components/member/EmailLink.svelte'
  import PhoneLink from 'components/member/PhoneLink.svelte'

  import { FullEventGig } from 'state/types'

  export let gig: FullEventGig
</script>

{#if !gig.contactName && !gig.contactEmail && !gig.contactPhone}
  <p>
    <i>No contact info</i>
  </p>
{:else}
  <p>
    <u>Contact</u>
    <br />
    {#if gig.contactName}
      {gig.contactName}
    {:else}
      <i>idk who</i>
    {/if}
    <br />
    {#if gig.contactPhone}
      <PhoneLink phone={gig.contactPhone} />
    {:else}
      <i>no number, bro</i>
    {/if}
    <br />
    {#if gig.contactEmail}
      <EmailLink email={gig.contactEmail} />
    {:else}
      <i>no email, dude</i>
    {/if}
  </p>
{/if}
