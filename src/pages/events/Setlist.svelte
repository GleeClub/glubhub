<script lang="ts">
  import Table from 'components/bulma/Table.svelte'

  import { FullEventQuery } from 'gql-operations'
  import { routeRepertoire } from 'route/constructors'
  import { renderRoute } from 'route/render'
  import { pitchToUnicode } from 'state/pitch'

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
          <!-- TODO: show mode as well -->
          <td>{song.key ? pitchToUnicode(song.key) : 'No key'}</td>
          <td>
            {song.startingPitch
              ? pitchToUnicode(song.startingPitch)
              : 'No starting pitch'}
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>
{/if}
