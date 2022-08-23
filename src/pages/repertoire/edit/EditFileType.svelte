<script lang="ts">
  import Divider from 'src/components/bulma/Divider.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import FileInput from 'src/components/forms/FileInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import SongLinkButton from '../SongLinkButton.svelte'

  import { query } from 'src/state/query'
  import { stringType } from 'src/state/input'
  import { fileToBase64 } from 'src/utils/helpers'
  import { FullSongQuery } from 'src/gql-operations'
  import {
    emptyLoaded,
    FullSongLink,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'

  export let song: FullSongQuery['song']
  export let typeName: string
  export let deleteLink: (link: FullSongLink) => void
  export let onUpdate: () => void

  let name = ''
  let file: File | null = null
  let state: RemoteData = emptyLoaded

  $: linkSection = song.linkSections.find(
    (section) => section.name === typeName
  )

  async function addLinkToSong() {
    if (!name || !file) return
    state = loading

    const content = await fileToBase64(file)
    const result = await query('CreateSongLink', {
      songId: song.id,
      newLink: {
        name,
        type: typeName,
        url: file.name,
        content,
      },
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      onUpdate()
    }
  }
</script>

<Divider>{typeName}</Divider>
{#if linkSection}
  {#each linkSection.links as link}
    <SongLinkButton {link} {deleteLink} />
    <br />
  {/each}
{:else}
  <br />
{/if}

<form on:submit|preventDefault={addLinkToSong}>
  <TextInput
    type={stringType}
    value={name}
    onInput={(newName) => (name = newName)}
    title="{typeName} Name"
    placeholder="Happy Birthday - TTBB"
    required
  />
  <FileInput
    {file}
    selectFile={(newFile) => (file = newFile)}
    title="{typeName} File"
  />
  <SubmitButton loading={state.type === 'loading'}>
    Add {typeName}
  </SubmitButton>
  {#if state.type === 'error'}
    <ErrorBox error={state.error} />
  {/if}
</form>
