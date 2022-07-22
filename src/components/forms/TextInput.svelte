<script lang="ts">
  import Control from './Control.svelte'
  import FieldWrapper from './FieldWrapper.svelte'
  import InputWrapper from './InputWrapper.svelte'

  import type { FormInputType } from 'state/input'

  type T = $$Generic

  interface $$Props {
    value: T
    type: FormInputType<T>
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

  export let value: T
  export let type: FormInputType<T>
  export let onInput: (t: T) => void
  export let title = ''
  export let horizontal = false
  export let required = false
  export let helpText = ''
  export let placeholder = ''
  export let expanded = false
  export let loading = false
  export let prefix = ''
  export let suffix = ''
  export let autocomplete = false
</script>

<InputWrapper {title} {horizontal} {helpText}>
  <FieldWrapper {expanded} {loading} {prefix} {suffix}>
    <Control>
      <input
        class="input {loading ? ' is-loading' : ''}"
        value={type.toString(value)}
        on:input={(event) =>
          onInput(type.fromString(event.currentTarget.value))}
        type={type.textType}
        {placeholder}
        {required}
        autoComplete={autocomplete ? 'on' : 'off'}
      />
    </Control>
  </FieldWrapper>
</InputWrapper>
