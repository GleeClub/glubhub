<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import EventHoverBox from './EventHoverBox.svelte'
  import GradesBlock from './GradesBlock.svelte'
  import Volunteerism from './Volunteerism.svelte'
  import ThisWeek from './ThisWeek.svelte'

  import { HoveredEvent } from 'src/state/types'
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'

  let hovered: HoveredEvent | null = null

  const events = derived(
    siteContext,
    (context) => context.user?.grades?.eventsWithChanges || []
  )
</script>

<Container fullheight>
  <GradesBlock hoverEvent={(event) => (hovered = event)} />
  {#if hovered}
    <EventHoverBox {...hovered} />
  {/if}
  <Section>
    <Container>
      <Columns>
        <Column>
          <Title>This Week</Title>
          <Box>
            <div class="timeline">
              <ThisWeek
                events={$events}
                on:hover={(e) => (hovered = e.detail)}
              />
            </div>
          </Box>
        </Column>
        <Volunteerism />
      </Columns>
    </Container>
  </Section>
</Container>
