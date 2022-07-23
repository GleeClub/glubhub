<script lang="ts">
  import Tooltip from 'src/components/bulma/Tooltip.svelte'

  import { Pitch, SongMode } from 'src/gql-operations'
  import { pitchToUnicode } from 'src/state/pitch'
  import { titleCase } from 'src/utils/helpers'

  export let title: string
  export let pitch: Pitch | null | undefined
  export let mode: SongMode | null | undefined
</script>

<p>
  {title}:
  {#if pitch}
    <!-- TODO: playPitch -->
    <b>
      <Tooltip content="hey kid, wanna pitch?">
        {pitchToUnicode(pitch)}
        {#if mode}
          {' ' + titleCase(mode)}
        {/if}
      </Tooltip>
    </b>
  {:else}
    <b>?</b>
  {/if}
</p>
