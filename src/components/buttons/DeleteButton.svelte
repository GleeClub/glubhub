<script lang="ts">
  export let click: () => void
</script>

<button class="delete" aria-label="close" on:click={click} />
