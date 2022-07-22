<script lang="ts">
  import CarpoolRow from './CarpoolRow.svelte'
  import NoMembersCarpoolRow from './NoMembersCarpoolRow.svelte'

  import { EditCarpoolContextQuery } from 'gql-operations'
  import { CarpoolMember, HasEventTimes, SimpleAttendance } from 'state/types'
  import { createEventDispatcher } from 'svelte'

  export let carpool: EditCarpoolContextQuery['event']['carpools'][number]
  export let event: HasEventTimes | null | undefined = undefined
  export let attendance: SimpleAttendance | null | undefined = undefined
  export let selected: string[] = []

  const dispatch = createEventDispatcher<{
    selectDriver: CarpoolMember
    selectPassenger: CarpoolMember
    selectEmpty: void
  }>()
</script>

<thead>
  <CarpoolRow
    member={carpool.driver}
    {event}
    {attendance}
    on:select={() => dispatch('selectDriver', carpool.driver)}
    isSelected={selected.includes(carpool.driver.email)}
    includeIcon
    isDriver
  />
</thead>
<tbody>
  {#if carpool.passengers.length}
    {#each carpool.passengers as passenger, passengerIndex}
      <CarpoolRow
        member={passenger}
        {event}
        on:select={() => dispatch('selectPassenger', passenger)}
        includeIcon={passengerIndex === 0}
      />
    {/each}
  {:else}
    <NoMembersCarpoolRow on:select={() => dispatch('selectEmpty')} />
  {/if}
</tbody>
