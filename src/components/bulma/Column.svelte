<script lang="ts">
  export let narrow = false
</script>

<div class="column" class:is-narrow={narrow}>
  <slot />
</div>
