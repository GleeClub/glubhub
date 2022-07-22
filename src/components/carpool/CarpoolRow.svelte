<script lang="ts">
  import AttendanceIcon from "components/icons/AttendanceIcon.svelte";

  import { CarpoolMember, HasEventTimes, SimpleAttendance } from "state/types";
  import { createEventDispatcher } from "svelte";

  export let member: CarpoolMember;
  export let isSelected = false;
  export let event: HasEventTimes | null | undefined = undefined;
  export let attendance: SimpleAttendance | null | undefined = undefined;
  export let includeIcon = false;
  export let isDriver = false;

  const dispatch = createEventDispatcher<{ select: void }>();

  $: cellElement = isDriver ? "th" : "td";
</script>

<style>
.carpool-row {
  cursor: pointer;
  width: 100%;
  min-width: 100%;
}
</style>

<tr class="carpool-row" class:is-selected={isSelected} on:click={() => dispatch("select")}>
  <svelte:element this={cellElement}>
    {#if includeIcon}
      <span class="icon">
        <i class="fas fa-{isDriver ? 'user' : 'users'}" />
      </span>
    {/if}
  </svelte:element>
  <svelte:element this={cellElement}>{member.fullName}</svelte:element>
  <svelte:element this={cellElement}>{member.location}</svelte:element>
  <svelte:element this={cellElement}>{member.passengers || ""}</svelte:element>
  <svelte:element this={cellElement}>
    {#if event}
      <AttendanceIcon {event} {attendance} />
    {/if}
  </svelte:element>
</tr>
