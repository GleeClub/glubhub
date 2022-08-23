<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import SelectableList from 'src/components/remote/SelectableList.svelte'

  import { AllMinutesQuery } from 'src/gql-operations'
  import {
    minutesPrivate,
    minutesPublic,
    routeMinutes,
  } from 'src/route/constructors'
  import { editMinutes, viewCompleteMinutes } from 'src/state/permissions'
  import { LazyRemoteData, mapLazyLoaded, RemoteData } from 'src/state/types'
  import { siteContext } from 'src/store/context'
  import { replaceRoute } from 'src/store/route'
  import { permittedTo } from 'src/utils/helpers'
  import { get } from 'svelte/store'

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

  function selectMinutes(
    minutes: AllMinutesQuery['allMeetingMinutes'][number]
  ) {
    const context = get(siteContext)
    if (context.user && permittedTo(context.user, viewCompleteMinutes)) {
      replaceRoute(routeMinutes(minutes.id, minutesPrivate))
    } else {
      replaceRoute(routeMinutes(minutes.id, minutesPublic))
    }
  }
</script>

<SelectableList
  title="Meeting Minutes"
  itemGroups={shownMinutes}
  isSelected={(m) => m.id === selectedId}
  on:select={(m) => selectMinutes(m.detail)}
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
