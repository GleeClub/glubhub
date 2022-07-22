<script lang="ts">
  export let content: string
  export let checked: boolean
  export let onChange: (checked: boolean) => void
</script>

<div class="control checkbox">
  <label class="checkbox">
    <input type="checkbox" {checked} on:change={() => onChange(!checked)} />
    {' ' + content}
  </label>
</div>
