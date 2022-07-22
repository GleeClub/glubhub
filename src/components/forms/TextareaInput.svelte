<script lang="ts">
  import Control from './Control.svelte'
  import FieldWrapper from './FieldWrapper.svelte'
  import InputWrapper from './InputWrapper.svelte'

  export let value: string
  export let onInput: (val: string) => void
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
      <textarea
        class="textarea {loading ? ' is-loading' : ''}"
        {value}
        on:input={(event) => onInput(event.currentTarget.value)}
        {placeholder}
        {required}
        autoComplete={autocomplete ? 'on' : 'off'}
      />
    </Control>
  </FieldWrapper>
</InputWrapper>
