<script lang="ts">
  import Column from "components/bulma/Column.svelte";
  import Columns from "components/bulma/Columns.svelte";
  import Container from "components/bulma/Container.svelte";
  import Title from "components/bulma/Title.svelte";
  import EmailLink from "components/member/EmailLink.svelte";
</script>

<Container fullheight>
  <Columns centered vcentered>
    <Column narrow>
      <Title>(404) not-found</Title>
      <p>
        <EmailLink email="sam.mohr@protonmail.com">
          Personally text Sam Mohr
        </EmailLink>
        if you think there's an error.
      </p>
    </Column>
  </Columns>
</Container>
