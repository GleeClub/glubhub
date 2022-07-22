<script lang="ts">
  export let fullwidth = false
  export let scrollable = false
  export let striped = false
  export let hoverable = false
  export let bottomBorder = true
  export let className: string | undefined = undefined
</script>

<div class:table-container={scrollable}>
  <table
    class="table {className}"
    class:is-fullwidth={fullwidth}
    class:is-striped={striped}
    class:is-hoverable={hoverable}
    class:no-bottom-border={!bottomBorder}
  >
    <slot />
  </table>
</div>
