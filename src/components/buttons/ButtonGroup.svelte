<script lang="ts">
  export let connected = false
  export let alignment: 'is-centered' | 'is-right' | undefined = undefined
</script>

<div class="buttons {alignment || ''}" class:has-addons={connected}>
  <slot />
</div>
