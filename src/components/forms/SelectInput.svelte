<script lang="ts">
  import FieldWrapper from './FieldWrapper.svelte'
  import InputWrapper from './InputWrapper.svelte'

  import type { FormInputType } from 'src/state/input'

  type T = $$Generic

  // TODO: remove these duplicate definitions?
  interface $$Props {
    values: T[]
    selected: T
    type: FormInputType<T>
    onInput: (t: T) => void
    leftAligned?: boolean
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
  export let type: FormInputType<T>
  export let onInput: (t: T) => void
  export let leftAligned = false
  export let title = ''
  export let horizontal = false
  export let helpText = ''
  export let expanded = false
  export let loading = false
  export let prefix = ''
  export let suffix = ''

  $: valueStrings = values.map((val) => type.toString(val))
</script>

<InputWrapper {title} {horizontal} {helpText}>
  <FieldWrapper {expanded} {loading} {prefix} {suffix}>
    <div
      class="select control {loading ? ' is-loading' : ''} {leftAligned
        ? ' is-pulled-left'
        : ''}"
    >
      <select
        on:input={(event) =>
          onInput(type.fromString(event.currentTarget.value))}
      >
        {#each valueStrings as value}
          <option {value} selected={value === type.toString(selected)}>
            {value}
          </option>
        {/each}
      </select>
    </div>
  </FieldWrapper>
</InputWrapper>
