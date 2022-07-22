<script lang="ts">
  export let content: string
  export let alignment: 'left' | 'right' | 'multiline' | undefined = undefined
</script>

<span
  style="cursor: pointer"
  data-tooltip={content}
  class="tooltip is-tooltip{alignment ? ` is-tooltip-${alignment}` : ''}"
>
  <slot />
</span>
