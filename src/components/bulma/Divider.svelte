<script lang="ts">
  export let vertical = false
  export let content = ''
</script>

<div
  class={vertical ? 'is-divider-vertical' : 'is-divider'}
  data-content={content}
/>
