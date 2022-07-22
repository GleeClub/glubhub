<script lang="ts">
  import Button from "components/buttons/Button.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";

  import { AllGigRequestsQuery, GigRequestStatus } from "gql-operations";
  import { adminCreateEvent, routeAdmin, routeEvents } from "route/constructors";

  export let gigRequest: AllGigRequestsQuery['gigRequests'][number];
  export let reopen: (id: number) => void;
  export let dismiss: (id: number) => void;
</script>

<tr class="no-bottom-border">
  <td colSpan={5}>
    <ButtonGroup alignment="is-right">
      {#if gigRequest.status === GigRequestStatus.Pending}
        <Button click={() => dismiss(gigRequest.id)}>We do not deign</Button>
        <LinkButton
          color="is-primary"
          route={routeAdmin(adminCreateEvent(gigRequest.id))}
        >
          We deign
        </LinkButton>
      {:else if gigRequest.status === GigRequestStatus.Accepted}
        <Button>Too late to go back now</Button>
        <LinkButton route={routeEvents(gigRequest.event?.id || null, null)}>
          We deigned 
        </LinkButton>
      {:else}
        <Button>We did not deign</Button>
        <Button click={() => reopen(gigRequest.id)}>Hol up</Button>
      {/if}
    </ButtonGroup>
  </td>
</tr>
