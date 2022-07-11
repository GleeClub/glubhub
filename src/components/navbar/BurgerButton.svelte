<script lang="ts">
  export let expanded: boolean
  export let toggleExpanded: () => void
</script>

<a
  role="button"
  aria-label="menu"
  aria-expanded={expanded}
  class="navbar-burger{expanded ? ' is-active' : ''}"
  onClick={toggleExpanded}
  href="javascript:void(0);"
>
  <span aria-hidden="true" />
  <span aria-hidden="true" />
  <span aria-hidden="true" />
</a>
