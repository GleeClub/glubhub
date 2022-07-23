<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import EmailLink from 'src/components/member/EmailLink.svelte'
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
