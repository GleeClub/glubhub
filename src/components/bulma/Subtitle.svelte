<script lang="ts">
  export let centered = false
</script>

<style>
.centered {
  text-align: center;
}
</style>

<h3 class="subtitle is-3" class:centered={centered}>
  <slot />
</h3>
