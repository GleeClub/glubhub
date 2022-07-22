<script lang="ts">
  export let narrow = false
  export let oneQuarter = false
  export let centered = false
</script>

<div
  class="column"
  class:is-narrow={narrow}
  class:is-one-quarter={oneQuarter}
  class:is-centered={centered}
>
  <slot />
</div>
