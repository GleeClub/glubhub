<script lang="ts">
  export let vertical = false
</script>

<div class="divider" class:is-vertical={vertical}>
  <slot />
</div>
