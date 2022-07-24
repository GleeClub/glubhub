<script lang="ts">
  import Control from './Control.svelte'

  export let expanded = false
  export let loading = false
  export let prefix = ''
  export let suffix = ''
</script>

<div
  class="field"
  class:is-expanded={expanded}
  class:is-loading={loading}
  class:has-addons={!!prefix || !!suffix}
>
  {#if prefix}
    <Control>
      <a class="button is-static">
        {prefix}
      </a>
    </Control>
  {/if}
  <slot />
  {#if suffix}
    <Control>
      <a class="button is-static">
        {suffix}
      </a>
    </Control>
  {/if}
</div>
