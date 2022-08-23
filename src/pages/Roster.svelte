<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import EmailLink from 'src/components/member/EmailLink.svelte'
  import PhoneLink from 'src/components/member/PhoneLink.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Remote from 'src/components/remote/Remote.svelte'
  import Table from 'src/components/bulma/Table.svelte'

  import { routeProfile } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { eagerQuery } from 'src/state/query'
  import Button from 'src/components/buttons/Button.svelte'
  import Title from 'src/components/bulma/Title.svelte'

  let showInactive = false
  $: [members, _reloadMembers] = eagerQuery('AllMembers', {
    includeInactive: showInactive,
  })
</script>

<Section>
  <Title centered>Roster</Title>
  <Container>
    <Remote data={$members}>
      <Box slot="loaded" let:data={loadedMembers}>
        <Table fullwidth scrollable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Section</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {#each loadedMembers.members as member}
              <tr>
                <td>
                  <a href={renderRoute(routeProfile(member.email, null))}>
                    {member.fullName}
                  </a>
                </td>
                <td>{member.semester?.section || 'Homeless'}</td>
                <td>
                  <EmailLink email={member.email} />
                </td>
                <td>
                  <PhoneLink phone={member.phoneNumber} />
                </td>
                <td>{member.location}</td>
              </tr>
            {/each}
          </tbody>
        </Table>
        <div class="is-fullwidth" style="align-items: center">
          <Button fullwidth click={() => (showInactive = !showInactive)}>
            {#if showInactive}
              Hide Inactive Members
            {:else}
              Show Inactive Members
            {/if}
          </Button>
        </div>
      </Box>
    </Remote>
  </Container>
</Section>
