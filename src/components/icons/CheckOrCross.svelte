<script lang="ts">
  export let checked: boolean;
</script>

<span class="icon is-medium">
  <i class="fas fa-lg fa-{checked ? 'check' : 'times'}" />
</span>
