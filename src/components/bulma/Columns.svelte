<script lang="ts">
  export let centered = false
  export let vcentered = false
  export let flex = false
</script>

<div
  class="columns"
  class:is-centered={centered}
  class:is-vcentered={vcentered}
  style:display={flex ? 'flex' : undefined}
>
  <slot />
</div>
