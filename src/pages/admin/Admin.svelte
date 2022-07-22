<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Columns from 'components/bulma/Columns.svelte'
  import Container from 'components/bulma/Container.svelte'
  import Section from 'components/bulma/Section.svelte'
  import DocumentLinks from 'components/navbar/DocumentLinks.svelte'
  import SelectableList from 'components/remote/SelectableList.svelte'
  import AbsenceRequests from './absence-requests/AbsenceRequests.svelte'
  import CreateEvent from './create-event/CreateEvent.svelte'
  import GigRequests from './gig-requests/GigRequests.svelte'
  import Money from './money/Money.svelte'
  import OfficerPositions from './OfficerPositions.svelte'
  import Semesters from './semesters/Semesters.svelte'
  import SitePermissions from './SitePermissions.svelte'
  import Uniforms from './uniforms/Uniforms.svelte'
  import WebmasterTools from './WebmasterTools.svelte'

  import { routeAdmin } from 'route/constructors'
  import { AdminRoute } from 'route/types'
  import { loaded } from 'state/types'
  import { goToRoute } from 'store/route'
  import { visibleAdminTabs } from 'utils/admin'

  export let tab: AdminRoute | null
</script>

<Section>
  <Container>
    <Columns>
      <SelectableList
        title="Domains"
        itemGroups={loaded($visibleAdminTabs)}
        isSelected={(t) => t.route === tab?.route}
        messageIfEmpty="You have no officer permissions. Perish."
        on:select={(t) => goToRoute(routeAdmin(t.detail))}
        render={(t) => t.name}
      />
      <div>
        {#if tab?.route === 'absence-requests'}
          <AbsenceRequests />
        {:else if tab?.route === 'create-event'}
          <CreateEvent gigRequestId={tab.gigRequestId} />
        {:else if tab?.route === 'document-links'}
          <DocumentLinks />
        {:else if tab?.route === 'gig-requests'}
          <GigRequests />
        {:else if tab?.route === 'money'}
          <Money tab={tab.tab} />
        {:else if tab?.route === 'officer-positions'}
          <OfficerPositions />
        {:else if tab?.route === 'semesters'}
          <Semesters tab={tab.tab} />
        {:else if tab?.route === 'site-permissions'}
          <SitePermissions />
        {:else if tab?.route === 'uniforms'}
          <Uniforms />
        {:else if tab?.route === 'webmaster-tools'}
          <WebmasterTools />
        {:else}
          <Box>Please select a menu item</Box>
        {/if}
      </div>
    </Columns>
  </Container>
</Section>
