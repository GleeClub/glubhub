<script lang="ts">
  import BackButton from 'components/buttons/BackButton.svelte'
  import CheckboxInput from 'components/forms/CheckboxInput.svelte'
  import SelectInput from 'components/forms/SelectInput.svelte'
  import TextareaInput from 'components/forms/TextareaInput.svelte'
  import TextInput from 'components/forms/TextInput.svelte'
  import StateBox from 'components/remote/StateBox.svelte'
  import NewPerformanceSection from './NewPerformanceSection.svelte'
  import EditFileType from './EditFileType.svelte'

  import { FullSongQuery } from 'gql-operations'
  import { repertoireDetails, routeRepertoire } from 'route/constructors'
  import { pitchType, songModeType, stringType } from 'state/input'
  import { query } from 'state/query'
  import {
    emptyLoaded,
    FullSongLink,
    loading,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { replaceRoute } from 'store/route'
  import { ALL_PITCHES, ALL_MODES } from 'utils/constants'

  export let song: FullSongQuery['song']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded

  async function updateSong(song: FullSongQuery['song']) {
    state = loading
    const result = await query('UpdateSong', {
      id: song.id,
      update: song,
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
