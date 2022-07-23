<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import SelectableList from 'src/components/remote/SelectableList.svelte'

  import { AllMinutesQuery } from 'src/gql-operations'
  import { routeMinutes } from 'src/route/constructors'
  import { editMinutes } from 'src/state/permissions'
  import { LazyRemoteData, mapLazyLoaded, RemoteData } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'

  export let allMinutes: LazyRemoteData<AllMinutesQuery>
  export let selectedId: number | null
  export let createNewMinutes: () => void
  export let createState: RemoteData

  let showAllMinutes = false

  $: shownMinutes = mapLazyLoaded(allMinutes, (minutes) =>
    showAllMinutes
      ? [minutes.allMeetingMinutes]
      : [minutes.allMeetingMinutes.slice(0, 10)]
  )
</script>

<SelectableList
  title="Meeting Minutes"
  itemGroups={shownMinutes}
  isSelected={(m) => m.id === selectedId}
  on:select={(m) => replaceRoute(routeMinutes(m.detail.id, null))}
  render={(m) => m.name}
  messageIfEmpty="No minutes"
>
  <RequiresPermission slot="top-content" permission={editMinutes}>
    <div style:padding-bottom="5px">
      <ButtonGroup alignment="is-centered">
        <Button
          color="is-primary"
          click={createNewMinutes}
          loading={createState.type === 'loading'}
        >
          + Add New Minutes
        </Button>
        {#if createState.type === 'error'}
          <ErrorBox error={createState.error} />
        {/if}
      </ButtonGroup>
    </div>
  </RequiresPermission>

  <svelte:fragment slot="bottom-content">
    {#if allMinutes.type === 'loaded' && allMinutes.data.allMeetingMinutes.length > 10}
      <div style:padding-bottom="5px">
        <ButtonGroup alignment="is-centered">
          <Button click={() => (showAllMinutes = !showAllMinutes)}>
            {showAllMinutes ? 'Hide' : 'Show'} old minutes...
          </Button>
        </ButtonGroup>
      </div>
    {/if}
  </svelte:fragment>
</SelectableList>
