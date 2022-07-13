<script lang="ts">
  import Tooltip from "components/bulma/Tooltip.svelte";

  import { Pitch, SongMode } from "gql-operations";

  export let title: string;
  export let pitch: Pitch | null | undefined;
  export let mode: SongMode | null | undefined;
</script>
<p>
  {title}:
  {#if pitch}
    <b onClick={() => playPitch(pitch)}>
      <Tooltip content="hey kid, wanna pitch?">
        {pitchToUnicode(pitch)}
        {#if mode}
          {" " + readableMode(mode)}}
        {/if}
      </Tooltip>
    </b>
  {:else}
    <b>?</b>
  {/if}
</p>
