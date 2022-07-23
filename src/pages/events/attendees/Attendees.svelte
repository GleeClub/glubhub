<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import AttendeeTable from './AttendeeTable.svelte'

  import { FullEventQuery } from 'src/gql-operations'
  import { NO_SECTION, SECTION_ORDER } from 'src/utils/constants'

  export let attendees: FullEventQuery['event']['allAttendance']

  $: attending = separateByConfirmed(attendees.filter((a) => a.shouldAttend))
  $: notAttending = separateByConfirmed(
    attendees.filter((a) => !a.shouldAttend)
  )

  function separateByConfirmed(
    filteredAttendees: FullEventQuery['event']['allAttendance']
  ) {
    return new Map(
      SECTION_ORDER.map((section) => {
        const inSection = filteredAttendees.filter(
          (a) => a.member.semester?.section === section
        )

        return [
          section,
          inSection.length
            ? {
                confirmed: inSection.filter((a) => a.confirmed),
                notConfirmed: inSection.filter((a) => !a.confirmed),
              }
            : null,
        ]
      })
    )
  }
</script>

<Column>
  <Title centered>Attending</Title>
  {#each SECTION_ORDER as section}
    {#if attending.get(section)}
      <AttendeeTable
        section={section || NO_SECTION}
        confirmed={attending.get(section)?.confirmed || []}
        notConfirmed={attending.get(section)?.notConfirmed || []}
      />
    {/if}
  {/each}

  <Title centered>Not Attending</Title>
  {#each SECTION_ORDER as section}
    {#if notAttending.get(section)}
      <AttendeeTable
        section={section || NO_SECTION}
        confirmed={attending.get(section)?.confirmed || []}
        notConfirmed={attending.get(section)?.notConfirmed || []}
      />
    {/if}
  {/each}
</Column>
