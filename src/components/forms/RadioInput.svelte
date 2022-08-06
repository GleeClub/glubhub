<script lang="ts">
  import FieldWrapper from './FieldWrapper.svelte'
  import InputWrapper from './InputWrapper.svelte'

  type T = $$Generic

  interface $$Props {
    values: T[]
    selected: T
    render: (t: T) => string
    onInput: (t: T) => void
    title?: string
    horizontal?: boolean
    required?: boolean
    helpText?: string
    placeholder?: string
    expanded?: boolean
    loading?: boolean
    prefix?: string
    suffix?: string
    autocomplete?: boolean
  }

  export let values: T[]
  export let selected: T
  export let render: (t: T) => string
  export let onInput: (t: T) => void
  export let title = ''
  export let horizontal = false
  export let helpText = ''
  export let expanded = false
  export let loading = false
  export let prefix = ''
  export let suffix = ''
</script>

<InputWrapper {title} {horizontal} {helpText}>
  <FieldWrapper {expanded} {loading} {prefix} {suffix}>
    {#each values as value, index}
      <label class="radio">
        <input
          type="radio"
          checked={render(value) === render(selected)}
          on:click={() => onInput(value)}
        />
        {' ' + render(value)}
      </label>
      {#if index !== values.length - 1}
        <br />
      {/if}
    {/each}
  </FieldWrapper>
</InputWrapper>
