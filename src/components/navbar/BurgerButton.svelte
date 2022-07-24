<script lang="ts">
  export let expanded: boolean
  export let toggleExpanded: () => void
</script>

<a
  role="button"
  aria-label="menu"
  aria-expanded={expanded}
  class="navbar-burger"
  class:is-active={expanded}
  on:click={toggleExpanded}
>
  <span aria-hidden="true" />
  <span aria-hidden="true" />
  <span aria-hidden="true" />
</a>
