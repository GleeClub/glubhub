<script lang="ts">
  export let centered = false
  export let is6 = false
</script>

<h3 class="subtitle {is6 ? 'is-6' : 'is-3'}" class:centered>
  <slot />
</h3>

<style>
  .centered {
    text-align: center;
  }
</style>
