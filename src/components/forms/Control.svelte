<script lang="ts">
  export let expanded = false
</script>

<p class="control {expanded ? 'is-expanded' : ''}">
  <slot />
</p>
