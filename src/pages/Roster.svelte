<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Container from 'components/bulma/Container.svelte'
  import EmailLink from 'components/member/EmailLink.svelte'
  import PhoneLink from 'components/member/PhoneLink.svelte'
  import Section from 'components/bulma/Section.svelte'
  import Remote from 'components/remote/Remote.svelte'
  import Table from 'components/bulma/Table.svelte'

  import { routeProfile } from 'route/constructors'
  import { renderRoute } from 'route/render'
  import { eagerQuery } from 'state/query'

  const [members, _reloadMembers] = eagerQuery('AllMembers')
</script>

<Section>
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
      </Box>
    </Remote>
  </Container>
</Section>
