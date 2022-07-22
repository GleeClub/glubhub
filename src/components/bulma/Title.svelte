<script lang="ts">
  export let centered = false
  export let is4 = false
</script>

<h1 class="title" class:is-4={is4} class:centered>
  <slot />
</h1>

<style>
  .centered {
    text-align: center;
  }
</style>
