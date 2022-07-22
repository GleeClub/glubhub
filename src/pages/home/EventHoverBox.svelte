<script lang="ts">
  import type { UserGradesEvent } from 'state/types'
  import { fullDateTimeFormatter } from 'utils/datetime'

  export let x: number
  export let y: number
  export let event: UserGradesEvent
</script>

<div
  class="box"
  style="position: absolute; transform: translateX(-50%)"
  style:left="{x}px"
  style:top="{y + 20}px"
>
  <p>
    <strong>{event.event.name}</strong>
  </p>
  <p>{fullDateTimeFormatter(event.event.callTime)}</p>
  <p>
    {event.change?.change || 0.0} points
    <span class="icon is-primary has-text-primary">
      <i class="fas fa-arrow-right" />
    </span>
    {event.change?.partialScore}%
  </p>
  <p>
    <em>{event.change?.reason}</em>
  </p>
</div>
