<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ select: void }>();
</script>

<tr>
  <td colspan=5 style:width="100%" on:click={() => dispatch("select")}>
    <article class="message">
      <div class="message-body">It sure is lonely here...</div>
    </article>
  </td>
</tr>
