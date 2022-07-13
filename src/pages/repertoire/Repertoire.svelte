<script lang="ts">
  import Columns from "components/bulma/Columns.svelte";
  import Container from "components/bulma/Container.svelte";
  import Section from "components/bulma/Section.svelte";
  import Sidebar from "components/popup/Sidebar.svelte";
  import SongColumn from "./SongColumn.svelte";
  import SongInfo from "./SongInfo.svelte";

  import { AllSongsDocument, AllSongsQuery, CreateSongDocument, FullSongDocument } from "gql-operations";
  import { routeRepertoire } from "route/constructors";
  import { RepertoireTab } from "route/types";
  import { mutation, reexecutableQuery } from "state/query";
  import { emptyLoaded, LazyRemoteData, loading, mapLazyLoaded, notLoaded, RemoteData } from "state/types";
  import { replaceRoute } from "store/route";
  import { derived, Readable, readable } from "svelte/store";
import EditSong from "./edit/EditSong.svelte";

  export let songId: number | null;
  export let tab: RepertoireTab | null;

  let createState: RemoteData = emptyLoaded;

  const [songs, reloadAllSongs] = reexecutableQuery(AllSongsDocument, {});
  const [selectedSong, reloadSelectedSong] = songId 
    ? reexecutableQuery(FullSongDocument, { id: songId }) 
    : [readable(notLoaded), (_vars: { id: number }) => {}];

  async function createSong() {
    createState = loading;
    const response = await mutation(CreateSongDocument, { title: "New Song" });

    if (response.type === "loaded") {
      createState = emptyLoaded;
      replaceRoute(routeRepertoire(response.data.createSong.id, null));
    } else {
      createState = response;
    }
  }
 
  const filterSongs = (
    filter: (song: AllSongsQuery['songs'][number]) => boolean
  ): Readable<LazyRemoteData<AllSongsQuery['songs'][]>> => 
    derived(songs, $songs => mapLazyLoaded($songs, loadedSongs => [loadedSongs.songs.filter(filter)]));

  const currentSongs = filterSongs(song => song.current);
  const songsAToG = filterSongs(song => !song.current && song.title.toLowerCase()[0] <= "g");
  const songsHToP = filterSongs(song => !song.current && song.title.toLowerCase()[0] <= "g");
  const songsQToZ = filterSongs(song => !song.current && song.title.toLowerCase()[0] <= "g");
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
<Sidebar data={$selectedSong} close={() => replaceRoute(routeRepertoire(null, null))}>
  <svelte:fragment slot="loaded" let:data={song}>
    {#if tab?.route === "edit"}
      <EditSong
        song={song.song}
        onUpdate={() => reloadSelectedSong({ id: song.song.id })}
      />
    {:else }
      <SongInfo song={song.song} {reloadAllSongs} />
    {/if}
  </svelte:fragment>
</Sidebar>
