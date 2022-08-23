<script lang="ts">
  export let content: string
  export let alignment: 'left' | 'right' | 'multiline' | undefined = undefined
</script>

<span
  data-tooltip={content}
  class="has-tooltip {alignment ? `has-tooltip-${alignment}` : ''}"
>
  <slot />
</span>
