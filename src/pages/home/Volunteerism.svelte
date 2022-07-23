<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import GigIcon from 'src/components/icons/GigIcon.svelte'

  import { romanNumeral } from 'src/utils/helpers'
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'

  const range5 = Array.from({ length: 5 }, (_, i) => i)
  const volunteerGigs = derived(
    siteContext,
    (context) => context.user?.grades.volunteerGigsAttended || []
  )
</script>

<Column>
  <Title>Volunteerism</Title>
  <Box>
    {#if $volunteerGigs.length >= $siteContext.currentSemester.gigRequirement}
      <p>
        The dedication! The passion! The attendance! You've been to
        {romanNumeral($volunteerGigs.length)} volunteer gigs this semester. Glub
        salutes you and your volunteerism.
      </p>
    {:else}
      <p>
        OK so you've only been to
        {romanNumeral($volunteerGigs.length)} volunteer gigs this semester and you
        need to go to
        {romanNumeral($siteContext.currentSemester.gigRequirement)}. So. Uh, you
        know, do that.
      </p>
    {/if}
    <p style:text-align="center">
      {#each range5 as gigIndex}
        <GigIcon gig={$volunteerGigs[gigIndex] || null} />
        <span />
      {/each}
    </p>
  </Box>
</Column>
