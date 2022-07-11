<script lang="ts">
  import Box from "components/basic/Box.svelte";
  import Container from "components/basic/Container.svelte";
  import EmailLink from "components/basic/EmailLink.svelte";
  import PhoneLink from "components/basic/PhoneLink.svelte";
  import Section from "components/basic/Section.svelte";
  import Remote from "components/complex/Remote.svelte";
  import Table from "components/Table.svelte";

  import { AllMembersDocument } from "gql-operations";
  import { routeProfile } from "route/constructors";
  import { renderRoute } from "route/render";
  import { query } from "state/query";

  const members = query(AllMembersDocument, {});
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
                <td>{member.semester?.section || "Homeless"}</td>
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
