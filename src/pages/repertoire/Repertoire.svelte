<script lang="ts">
  import Columns from 'src/components/bulma/Columns.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Sidebar from 'src/components/popup/Sidebar.svelte'
  import SongColumn from './SongColumn.svelte'
  import SongInfo from './SongInfo.svelte'
  import EditSong from './edit/EditSong.svelte'

  import {
    emptyLoaded,
    LazyRemoteData,
    loading,
    mapLazyLoaded,
    notLoaded,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { routeRepertoire } from 'src/route/constructors'
  import { RepertoireTab } from 'src/route/types'
  import { replaceRoute } from 'src/store/route'
  import { derived, Readable, readable } from 'svelte/store'
  import { eagerQuery, query } from 'src/state/query'
  import { AllSongsQuery } from 'src/gql-operations'

  export let songId: number | null
  export let tab: RepertoireTab | null

  let createState: RemoteData = emptyLoaded

  const [songs, reloadAllSongs] = eagerQuery('AllSongs')
  const [selectedSong, reloadSelectedSong] = songId
    ? eagerQuery('FullSong', { id: songId })
    : [readable(notLoaded), (_vars: { id: number }) => {}]

  async function createSong() {
    createState = loading
    const result = await query('CreateSong', { title: 'New Song' })

    createState = stateFromResult(result)
    if (result.type === 'loaded') {
      replaceRoute(routeRepertoire(result.data.createSong.id, null))
    }
  }

  const filterSongs = (
    filter: (song: AllSongsQuery['songs'][number]) => boolean
  ): Readable<LazyRemoteData<AllSongsQuery['songs'][]>> =>
    derived(songs, ($songs) =>
      mapLazyLoaded($songs, (loadedSongs) => [loadedSongs.songs.filter(filter)])
    )

  const currentSongs = filterSongs((song) => song.current)
  const songsAToG = filterSongs(
    (song) => !song.current && song.title.toLowerCase()[0] <= 'g'
  )
  const songsHToP = filterSongs(
    (song) => !song.current && song.title.toLowerCase()[0] <= 'g'
  )
  const songsQToZ = filterSongs(
    (song) => !song.current && song.title.toLowerCase()[0] <= 'g'
  )
</script>

<Section>
  <Container>
    <Columns>
      <SongColumn
        title="Current"
        songs={$currentSongs}
        selectedId={songId}
        {createState}
        {createSong}
      />
      <SongColumn title="A-G" songs={$songsAToG} selectedId={songId} />
      <SongColumn title="H-P" songs={$songsHToP} selectedId={songId} />
      <SongColumn title="Q-Z" songs={$songsQToZ} selectedId={songId} />
    </Columns>
  </Container>
</Section>
<Sidebar
  data={$selectedSong}
  close={() => replaceRoute(routeRepertoire(null, null))}
>
  <svelte:fragment slot="loaded" let:data={song}>
    {#if tab?.route === 'edit'}
      <EditSong
        song={song.song}
        onUpdate={() => reloadSelectedSong({ id: song.song.id })}
      />
    {:else}
      <SongInfo song={song.song} reloadAllSongs={() => reloadAllSongs({})} />
    {/if}
  </svelte:fragment>
</Sidebar>
