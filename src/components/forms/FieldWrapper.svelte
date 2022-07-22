<script lang="ts">
  import Control from './Control.svelte'

  export let expanded = false
  export let loading = false
  export let prefix = ''
  export let suffix = ''

  $: className = [
    'field',
    expanded ? 'is-expanded' : null,
    loading ? 'is-loading' : null,
    prefix || suffix ? 'has-addons' : null,
  ]
    .filter((c) => !!c)
    .join(' ')
</script>

<div class={className}>
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
