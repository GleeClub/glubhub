<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Column from "components/bulma/Column.svelte";
  import Columns from "components/bulma/Columns.svelte";
  import Container from "components/bulma/Container.svelte";
  import Section from "components/bulma/Section.svelte";
  import Title from "components/bulma/Title.svelte";
  import EventHoverBox from "./EventHoverBox.svelte";
  import GradesBlock from "./GradesBlock.svelte";
  import Volunteerism from "./Volunteerism.svelte";
  import { ThisWeek } from "./ThisWeek";

  import { HoveredEvent } from "state/types";

  let hovered: HoveredEvent | null = null;
</script>

<Container fullheight>
  <GradesBlock on:hover={e => hovered = e} />
  {#if hovered}
    <EventHoverBox {hovered} />
  {/if}
  <Section>
    <Container>
      <Columns>
        <Column>
          <Title>This Week</Title>
          <Box>
            <div class="timeline">
              <ThisWeek />
            </div>
          </Box>
        </Column>
        <Volunteerism />
      </Columns>
    </Container>
  </Section>
</Container>
