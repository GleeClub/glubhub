<script lang="ts">
  import Tooltip from "components/bulma/Tooltip.svelte";

  import { Pitch, SongMode } from "gql-operations";
  import { pitchToUnicode } from "state/pitch";
  import { titleCase } from "utils/helpers";

  export let title: string;
  export let pitch: Pitch | null | undefined;
  export let mode: SongMode | null | undefined;
</script>
<p>
  {title}:
  {#if pitch}
    <!-- TODO: playPitch -->
    <b>
      <Tooltip content="hey kid, wanna pitch?">
        {pitchToUnicode(pitch)}
        {#if mode}
          {" " + titleCase(mode)}}
        {/if}
      </Tooltip>
    </b>
  {:else}
    <b>?</b>
  {/if}
</p>
