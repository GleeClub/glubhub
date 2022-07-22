<script lang="ts">
  import Divider from "components/bulma/Divider.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";
  import SongLinkButton from "../SongLinkButton.svelte";

  import { FullSongQuery } from "gql-operations";
  import { stringType } from "state/input";
  import { query } from "state/query";
  import { emptyLoaded, FullSongLink, loading, RemoteData, stateFromResult } from "state/types";

  export let song: FullSongQuery['song'];
  export let deleteLink: (link: FullSongLink) => void;
  export let onUpdate: () => void;

  let name = "";
  let url = "";
  let state: RemoteData = emptyLoaded;

  $: linkSection = song.linkSections.find(section => section.name === "Performances");

  async function addPerformanceToSong() {
    state = loading;
    const result = await query("CreateSongLink", {
      songId: song.id,
      newLink: {
        name,
        target: url,
        type: "Performances",
      }
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      name = "";
      url = "";
      onUpdate();
    }
  }
</script>

<Divider content="Performances" />
{#if linkSection}
  {#each linkSection.links as link}
    <SongLinkButton {link} {deleteLink} />
  {/each}
{:else}
  <br />
{/if}

<form on:submit|preventDefault={addPerformanceToSong}>
  <TextInput
    type={stringType}
    value={name}
    onInput={newName => name = newName}
    title="Performance name"
    placeholder="Happy Birthday, live from New York!"
    required
  />
  <TextInput
    type={stringType}
    value={url}
    onInput={newUrl => url = newUrl}
    title="Performance URL"
    prefix="https://youtu.be/"
    placeholder="dtER80sOjX4"
    required
  />
  <SubmitButton loading={state.type === "loading"}>
    Add performance
  </SubmitButton>
  {#if state.type === "error"}
    <ErrorBox error={state.error} />
  {/if}
</form>
