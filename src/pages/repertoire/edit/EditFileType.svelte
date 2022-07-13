<script lang="ts">
  import Divider from "components/bulma/Divider.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import FileInput from "components/forms/FileInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";
  import SongLinkButton from "../SongLinkButton.svelte";

  import { stringType } from "state/input";
  import { mutation } from "state/query";
  import { fileToBase64 } from "utils/helpers";
  import { CreateSongLinkDocument, FullSongQuery } from "gql-operations";
  import { emptyLoaded, FullSongLink, loading, RemoteData } from "state/types";

  export let song: FullSongQuery['song'];
  export let typeName: string;
  export let deleteLink: (link: FullSongLink) => void;
  export let onDelete: () => void;

  let name = "";
  let file: File | null = null;
  let state: RemoteData = emptyLoaded;

  $: linkSection = song.linkSections.find(section => section.name === typeName);

  async function addLinkToSong() {
    if (!name || !file) return;
    state = loading;

    const content = await fileToBase64(file);
    const response = await mutation(CreateSongLinkDocument, {
      songId: song.id,
      newLink: {
        name,
        type: typeName,
        target: file.name,
        content,
      }
    });

    if (response.type === "loaded") {
      state = emptyLoaded;
      onUpdate();
    } else {
      state = response;
    }
  }
</script>

<Divider content={typeName} />
{#if linkSection}
  {#each linkSection.links as link}
    <SongLinkButton {link} {onDelete} />
    <br />
  {/each}
{:else}
  <br />
{/if}

<form on:submit|preventDefault={addLinkToSong}>
  <TextInput
    type={stringType}
    value={name}
    onInput={newName => name = newName}
    title="{typeName} Name"
    placeholder="Happy Birthday - TTBB"
    required
  />
  <FileInput
    {file}
    selectFile={newFile => file = newFile}
    title="{typeName} File"
  />
  <SubmitButton loading={state.type === "loading"}>
    Add {typeName}
  </SubmitButton>
  {#if state.type === "error"}
    <ErrorBox error={state.error} />
  {/if}
</form>
