<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import BackButton from 'src/components/buttons/BackButton.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import DeleteModal from 'src/components/popup/DeleteModal.svelte'
  import SongLinkButton from './SongLinkButton.svelte'
  import PitchSection from './PitchSection.svelte'

  import { FullSongQuery } from 'src/gql-operations'
  import { repertoireEdit, routeRepertoire } from 'src/route/constructors'
  import { editRepertoire } from 'src/state/permissions'
  import { replaceRoute } from 'src/store/route'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { query } from 'src/state/query'

  export let song: FullSongQuery['song']
  export let reloadAllSongs: () => void

  let deleteState: RemoteData | null = null

  async function deleteSong() {
    deleteState = loading
    const result = await query('DeleteSong', { id: song.id })

    deleteState = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllSongs()
      replaceRoute(routeRepertoire(null, null))
    }
  }
</script>

<BackButton
  content="all songs"
  click={() => replaceRoute(routeRepertoire(null, null))}
/>
<Title centered>{song.title}</Title>
{#if song.info}
  <p>
    {song.info}
    <br />
  </p>
{/if}
<p>
  {song.key}:
</p>
<PitchSection title="Key" pitch={song.key} mode={song.mode} />
<PitchSection title="Starting Pitch" pitch={song.startingPitch} mode={null} />
<br />

<Table fullwidth>
  <tbody>
    {#each song.linkSections.filter((links) => links.links.length) as linkSection}
      <tr style:border="none">
        <td style:border="none">{linkSection.name}</td>
        <td style:border="none">
          {#each linkSection.links as link}
            <SongLinkButton {link} />
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</Table>

<RequiresPermission permission={editRepertoire}>
  <div>
    <Button
      click={() => replaceRoute(routeRepertoire(song.id, repertoireEdit))}
    >
      Edit Song
    </Button>
    <br />
    <br />
    <Button color="is-danger" click={() => (deleteState = emptyLoaded)}>
      Delete Song
    </Button>
  </div>
</RequiresPermission>

{#if deleteState}
  <DeleteModal
    title="Are you sure you want to delete {song.title}?"
    cancel={() => (deleteState = null)}
    confirm={() => deleteSong()}
    state={deleteState}
  >
    <div>
      <p>Are you sure you want to delete {song.title}?</p>
      <p>
        <i>It'll be gong like Varys' dong.</i>
      </p>
    </div>
  </DeleteModal>
{/if}
