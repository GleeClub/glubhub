<script lang="ts">
  export let centered = false
</script>

<h3 class="subtitle is-3" class:centered>
  <slot />
</h3>

<style>
  .centered {
    text-align: center;
  }
</style>
