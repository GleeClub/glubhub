<script lang="ts">
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'
  import { permittedTo } from 'src/utils/helpers'

  export let permission: string
  export let eventType: string | undefined = undefined

  const allowed = derived(
    siteContext,
    (c) => c.user && permittedTo(c.user, permission, eventType)
  )
</script>

{#if $allowed}
  <slot />
{/if}
