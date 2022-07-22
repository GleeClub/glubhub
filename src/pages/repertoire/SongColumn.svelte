<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import Button from 'components/buttons/Button.svelte'
  import ButtonGroup from 'components/buttons/ButtonGroup.svelte'
  import RequiresPermission from 'components/member/RequiresPermission.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'
  import SelectableList from 'components/remote/SelectableList.svelte'

  import { AllSongsQuery } from 'gql-operations'
  import { routeRepertoire } from 'route/constructors'
  import { editRepertoire } from 'state/permissions'
  import { LazyRemoteData, RemoteData } from 'state/types'
  import { replaceRoute } from 'store/route'

  export let title: string
  export let songs: LazyRemoteData<AllSongsQuery['songs'][]>
  export let selectedId: number | null
  export let createState: RemoteData | undefined = undefined
  export let createSong: (() => void) | undefined = undefined
</script>

<Column oneQuarter centered>
  <SelectableList
    {title}
    itemGroups={songs}
    isSelected={(song) => song.id === selectedId}
    render={(song) => song.title}
    on:select={(song) => replaceRoute(routeRepertoire(song.detail.id, null))}
    messageIfEmpty="Nothin' to see here, buddy."
  >
    {#if createState}
      <RequiresPermission slot="bottom-content" permission={editRepertoire}>
        <div style:padding-top="5px">
          <ButtonGroup alignment="is-centered">
            <Button
              color="is-primary"
              loading={createState.type === 'loading'}
              click={createSong}
            >
              + Add New Song
            </Button>
          </ButtonGroup>
          {#if createState.type === 'error'}
            <ErrorBox error={createState.error} />
          {/if}
        </div>
      </RequiresPermission>
    {/if}
  </SelectableList>
</Column>
