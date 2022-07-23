<script lang="ts">
  import { ButtonColor, ButtonSize } from 'src/utils/helpers'

  export let color: ButtonColor | undefined = undefined
  export let size: ButtonSize | undefined = undefined
  export let loading = false
  export let inverted = false
  export let outlined = false
  export let fullwidth = false
  export let className = ''
</script>

<button
  type="submit"
  class="button {color || ''} {size || ''} {className}"
  class:is-loading={loading}
  class:is-inverted={inverted}
  class:is-outlined={outlined}
  class:is-fullwidth={fullwidth}
>
  <slot />
</button>
