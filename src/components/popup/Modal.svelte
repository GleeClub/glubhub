<script lang="ts">
  import Box from "components/basic/Box.svelte";

  export let close: () => void;
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={close} />
  <div class="modal-content" style="text-align: center">
    <Box>
      <slot />
    </Box>
  </div>
</div>
