<script lang="ts">
  export let centered = false;
  export let is4 = false;
</script>

<style>
.centered {
  text-align: center;
}
</style>

<h1 class="title" class:is-4={is4} class:centered={centered}>
  <slot />
</h1>
