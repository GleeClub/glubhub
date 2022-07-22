<script lang="ts">
  import { FullEventQuery } from 'gql-operations'
  import { fullDateTimeFormatter } from 'utils/datetime'

  export let event: FullEventQuery['event']
</script>

<p class="subtitle is-5">
  {fullDateTimeFormatter(event.callTime)}
  <br />
  {#if event.location}
    <a
      href={`https://www.google.com/maps/search/${event.location}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {event.location}
    </a>
  {/if}
</p>
