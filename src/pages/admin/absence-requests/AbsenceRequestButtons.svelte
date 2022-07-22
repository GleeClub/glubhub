<script lang="ts">
  import Button from "components/buttons/Button.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";

  import { AbsenceRequestStatus, AllAbsenceRequestsQuery } from "gql-operations";

  export let absenceRequest: AllAbsenceRequestsQuery['absenceRequests'][number];
  export let respond: (eventId: number, member: string, approved: boolean) => void;

  $: shortRespond = (approved: boolean) => 
    respond(absenceRequest.event.id, absenceRequest.member.email, approved);
</script>

<style>
.mercy-button {
  white-space: normal;
  max-width: 150px;
  height: initial;
}
</style>

<tr class="no-bottom-border">
  <td col-span=5>
    <ButtonGroup alignment="is-right">
      {#if absenceRequest.state === AbsenceRequestStatus.Pending}
        <Button click={() => shortRespond(false)}>
          Get fukt nerd
        </Button>
        <Button color="is-primary" click={() => shortRespond(true)}>
          Bestow mercy
        </Button>
      {:else if absenceRequest.state === AbsenceRequestStatus.Approved}
        <Button click={() => shortRespond(false)}>
          Jk get fukt nerd
        </Button>
        <Button>Mercy bestowed</Button>
      {:else}
        <Button>Nerd got fukt</Button>
        <button class="button mercy-button" on:click={() => shortRespond(true)}>
          I have heard your pleas and acquiesced to your request
        </button>
      {/if}
    </ButtonGroup>
  </td>
</tr>
