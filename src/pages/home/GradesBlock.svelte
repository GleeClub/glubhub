<script lang="ts">
  import Container from 'src/components/bulma/Container.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import AttendanceGraph from './AttendanceGraph.svelte'

  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'
  import { ATTENDANCE_ISSUE_EMAIL } from 'src/utils/constants'
  import { HoveredEvent } from 'src/state/types'

  export let hoverEvent: (event: HoveredEvent | null) => void

  const finalGrade = derived(siteContext, (context) => {
    const grade = context.user?.grades.grade
    return typeof grade === 'number' ? grade : 100
  })

  const attendanceMessage = derived(siteContext, (context) => {
    if (!context.user?.semester?.enrollment) {
      return 'Do you even go here?'
    }

    const finalGrade = context.user?.grades.grade!
    if (finalGrade >= 90.0) {
      return 'Ayy lamo nice.'
    } else if (finalGrade >= 80.0) {
      return 'OK not bad, I guess'
    } else if (finalGrade >= 70.0) {
      return 'Pls'
    } else {
      return 'BRUH get it together.'
    }
  })
</script>

<Section>
  <Container>
    <Title>Score</Title>
    <p>
      Right now you have a <strong>{$finalGrade}</strong>.
      <br />
      <span class="has-text-grey-light is-italic">
        {$attendanceMessage}
      </span>
    </p>
    {#if $siteContext.user?.grades.eventsWithChanges?.length}
      <div class="graph-wrapper">
        <AttendanceGraph {hoverEvent} />
      </div>
      <p>
        <br />
        Do you have an issue? Do you need a daddy tissue?
        <a href="mailto:{ATTENDANCE_ISSUE_EMAIL}">Email the officers</a>
        to cry about it.
      </p>
    {:else}
      <p>New semester, new you! Make it count.</p>
      <br />
      <br />
    {/if}
  </Container>
</Section>

<style>
  .graph-wrapper {
    width: 100%;
    margin: auto;
    overflow-x: scroll;
  }
</style>
