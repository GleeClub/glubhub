<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import ChangeSemesterModal from './ChangeSemesterModal.svelte'
  import CreateSemesterSidebar from './CreateSemesterSidebar.svelte'
  import EditSemesterSidebar from './EditSemesterSidebar.svelte'

  import {
    adminSemesters,
    routeAdmin,
    semesterChange,
    semesterCreate,
    semesterEdit,
  } from 'src/route/constructors'
  import { SemesterTab } from 'src/route/types'

  export let tab: SemesterTab | null
</script>

<Title>Edit the Semester</Title>
<Box>
  <p>
    This is a form that will allow you to add and edit semesters in the
    database. It will also change the current semester.
  </p>
  <br />
  <p>
    Changing the current semester will change the entire face of the website.
    Only stuff from the current semester is shown on the main website. In new
    semesters, every member's status is by default 'inactive' until they log in
    and confirm themself.
  </p>
  <br />
  <p>
    With great power comes great potential to screw everyone over. Use this
    feature wisely.
  </p>
  <br />
  <p>Now, pick your poison:</p>
</Box>

<ButtonGroup alignment="is-centered">
  {#each [semesterChange, semesterEdit, semesterCreate] as option}
    <LinkButton color="is-primary" route={routeAdmin(adminSemesters(option))}>
      {option.name}
    </LinkButton>
  {/each}
</ButtonGroup>
<br />

{#if tab?.route === 'change'}
  <ChangeSemesterModal />
{:else if tab?.route === 'edit'}
  <EditSemesterSidebar />
{:else if tab?.route === 'create'}
  <CreateSemesterSidebar />
{/if}
