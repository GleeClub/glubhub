<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import SelectableList from 'src/components/remote/SelectableList.svelte'

  import { AllSongsQuery } from 'src/gql-operations'
  import { routeRepertoire } from 'src/route/constructors'
  import { editRepertoire } from 'src/state/permissions'
  import { LazyRemoteData, RemoteData } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'

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
