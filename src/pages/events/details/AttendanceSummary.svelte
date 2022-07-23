<script lang="ts">
  import { SimpleAttendance } from 'src/state/types'

  export let points: number
  export let attendance: SimpleAttendance
</script>

{#if attendance.didAttend}
  {#if attendance.shouldAttend}
    You were there! What a great time. Real #tbt material.
  {:else}
    Wow, thanks for coming. What a guy!
  {/if}
{:else if attendance.shouldAttend}
  You <b>weren't there</b>, and that's <b>not ok</b>. You lost{' '}
  {`${points}`} points.{' '}
  <a href="mailto:gleeclub_officers@lists.gatech.edu?subject=Attendance Issue">
    Email the officers
  </a>{' '}
  if you think that's not right.
{:else}
  You <b>weren't there</b>, but that's <b>ok</b>.
{/if}
