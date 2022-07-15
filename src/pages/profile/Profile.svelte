<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Column from "components/bulma/Column.svelte";
  import Columns from "components/bulma/Columns.svelte";
  import Container from "components/bulma/Container.svelte";
  import Section from "components/bulma/Section.svelte";
  import Remote from "components/remote/Remote.svelte";
  import Attendance from "pages/events/Attendance.svelte";
  import UserDetailColumn from "./UserDetailColumn.svelte";
  import UserActions from "./UserActions.svelte";

  import {
    profileAttendance,
    profileDetails,
    profileMoney,
    profileSemesters,
  routeProfile
  } from "route/constructors";
  import { FullMemberDocument } from "gql-operations";
  import { ProfileTab } from "route/types";
  import { reexecutableQuery } from "state/query";
  import { siteContext } from "store/context";
  import { renderRoute } from "route/render";

  export let email: string;
  export let tab: ProfileTab | null;

  $: [member, reloadMember] = reexecutableQuery(FullMemberDocument, { email });

  const allProfileTabs = [profileDetails, profileMoney, profileAttendance, profileSemesters];
</script>

<Section>
  <Container>
    <Remote data={$member}>
      <Columns slot="loaded" let:data={member}>
        <Column narrow>
          <!-- Profile Picture -->
          <img
            width={250}
            height={250}
            src={member.member.picture || "https://picsum.photos/250"}
            alt=""
          />
        </Column>
        <Column>
          <UserDetailColumn member={member.member} />
          <br />
          <UserActions member={member.member} />
        </Column>
      </Columns>
    </Remote>
  </Container>
</Section>

{#if $siteContext.user?.positions.length}
  <Section>
    <Container>
      <Box>
        <Remote data={$member}>
          <svelte:fragment slot="loaded" let:data={member}>
            <div class="tabs">
              <ul>
                {#each allProfileTabs as profileTab}
                  <li class:is-active={tab?.route === profileTab.route}>
                    <a href={renderRoute(routeProfile(member.member.email, profileTab))}>
                      {profileTab.name}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>

            {#if tab?.route === "attendance"}
              <Attendance member={member.member} />
            {:else if tab?.route === "semesters"}
              <Semesters member={member.member} />
            {:else if tab?.route === "money"}
              <Money member={member.member} />
            {:else if tab?.route === "details"}
              <Details member={member.member} onUpdate={reloadMember} />
            {/if}
          </svelte:fragment>
        </Remote>
      </Box>
    </Container>
  </Section>
{/if}
