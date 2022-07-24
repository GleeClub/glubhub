<script lang="ts">
  import { ButtonColor, ButtonSize } from 'src/utils/helpers'

  export let color: ButtonColor | undefined = undefined
  export let size: ButtonSize | undefined = undefined
  export let loading = false
  export let inverted = false
  export let outlined = false
  export let fullwidth = false
  export let className = ''
  // TODO: should this be required?
  export let click: (() => void) | undefined = undefined
  export let element: 'a' | 'button' = 'button'
</script>

<svelte:element
  this={element}
  type="button"
  class="button {color || ''} {size || ''} {className}"
  class:is-loading={loading}
  class:is-fullwidth={fullwidth}
  class:is-inverted={inverted}
  class:is-outlined={outlined}
  on:click={click}
  disabled={click == undefined}
>
  <slot />
</svelte:element>
