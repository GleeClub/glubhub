<script lang="ts">
  import Table from 'src/components/bulma/Table.svelte'

  import { FullEventQuery } from 'src/gql-operations'
  import { routeRepertoire } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { pitchToString } from 'src/state/pitch'
  import { titleCase } from 'src/utils/helpers'

  export let songs: FullEventQuery['event']['setlist']
</script>

{#if songs.length === 0}
  <div>No set list for this event.</div>
{:else}
  <Table striped>
    <tbody>
      {#each songs as song, index}
        <tr>
          <td>{index + 1}</td>
          <td>
            <a href={renderRoute(routeRepertoire(song.id, null))}>
              {song.title}
            </a>
          </td>
          <td>
            {#if song.key}
              {pitchToString(song.key)}
              {#if song.mode}
                {' ' + titleCase(song.mode)}
              {/if}
            {:else}
              No key
            {/if}
          </td>
          <td>
            {#if song.startingPitch}
              {pitchToString(song.startingPitch)}
            {:else}
              No starting pitch
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>
{/if}
