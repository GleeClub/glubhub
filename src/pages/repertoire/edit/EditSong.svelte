<script lang="ts">
  import BackButton from 'src/components/buttons/BackButton.svelte'
  import CheckboxInput from 'src/components/forms/CheckboxInput.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import TextareaInput from 'src/components/forms/TextareaInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'
  import NewPerformanceSection from './NewPerformanceSection.svelte'
  import EditFileType from './EditFileType.svelte'

  import { FullSongQuery } from 'src/gql-operations'
  import { repertoireDetails, routeRepertoire } from 'src/route/constructors'
  import { pitchType, songModeType, stringType } from 'src/state/input'
  import { query } from 'src/state/query'
  import {
    emptyLoaded,
    FullSongLink,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'
  import { ALL_PITCHES, ALL_MODES } from 'src/utils/constants'

  export let song: FullSongQuery['song']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  async function updateSong(song: FullSongQuery['song']) {
    state = loading
    const result = await query('UpdateSong', {
      id: song.id,
      update: {
        current: song.current,
        title: song.title,
        info: song.info,
        key: song.key,
        startingPitch: song.startingPitch,
        mode: song.mode,
      },
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
    }
  }

  async function deleteLink(link: FullSongLink) {
    state = loading
    const result = await query('DeleteSongLink', { id: link.id })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
    }
  }
</script>

<BackButton
  content="finish editing"
  click={() => replaceRoute(routeRepertoire(song.id, repertoireDetails))}
/>
<!-- TODO: Convert these to Components -->
<h2 class="title is-4" style:text-align="center">Edit</h2>
<h3 class="subtitle is-6" style:text-align="center">
  {song.title}
</h3>

<TextInput
  type={stringType}
  value={song.title}
  onInput={(title) => updateSong({ ...song, title })}
  title="Name of song"
  placeholder="Happy Birthday in 12/17"
  required
/>
<SelectInput
  type={pitchType}
  values={[null, ...ALL_PITCHES]}
  selected={song.key}
  onInput={(key) => updateSong({ ...song, key })}
  title="Tonic"
/>
<SelectInput
  type={songModeType}
  values={[null, ...ALL_MODES]}
  selected={song.mode}
  onInput={(mode) => updateSong({ ...song, mode })}
  title="Mode"
/>
<SelectInput
  type={pitchType}
  values={[null, ...ALL_PITCHES]}
  selected={song.startingPitch}
  onInput={(startingPitch) => updateSong({ ...song, startingPitch })}
  title="Starting Pitch (if different)"
/>
<CheckboxInput
  content="Current Repertoire"
  checked={song.current}
  onChange={(current) => updateSong({ ...song, current })}
/>
<TextareaInput
  value={song.info || ''}
  onInput={(info) => updateSong({ ...song, info })}
  title="Comments"
  placeholder="There are no soloists, communism wins!"
/>
<StateBox {state} />

<ul style="list-style: none; padding-bottom: 10px;">
  <!-- TODO: replace all uses of link types with constants -->
  <EditFileType typeName="Sheet Music" {song} {onUpdate} {deleteLink} />
  <EditFileType typeName="MIDIs" {song} {onUpdate} {deleteLink} />
  <NewPerformanceSection {song} {onUpdate} {deleteLink} />
</ul>
