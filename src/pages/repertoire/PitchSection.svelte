<script lang="ts">
  import Tooltip from 'src/components/bulma/Tooltip.svelte'

  import { Pitch, SongMode } from 'src/gql-operations'
  import { pitchToString } from 'src/state/pitch';
  import { playPitch, titleCase } from 'src/utils/helpers'

  export let title: string
  export let pitch: Pitch | null | undefined
  export let mode: SongMode | null | undefined
</script>

<p>
  {title}:
  {#if pitch}
    <b on:click={() => pitch && playPitch(pitch)}>
      <Tooltip content="hey kid, wanna pitch?">
        {pitchToString(pitch)}
        {#if mode}
          {' ' + titleCase(mode)}
        {/if}
      </Tooltip>
    </b>
  {:else}
    <b>?</b>
  {/if}
</p>
