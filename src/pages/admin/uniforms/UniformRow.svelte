<script lang="ts">
  import DeleteButton from 'src/components/buttons/DeleteButton.svelte'
  import TextareaInput from 'src/components/forms/TextareaInput.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { Uniform } from 'src/gql-operations'
  import { stringType } from 'src/state/input'

  export let uniform: Uniform
  export let updateUniform: (uniform: Uniform) => void
  export let tryToDelete: (uniform: Uniform) => void
</script>

<tr>
  <td>
    <TextInput
      type={stringType}
      value={uniform.name}
      onInput={(name) => updateUniform({ ...uniform, name })}
      placeholder="Name"
    />
  </td>
  <td>
    <TextareaInput
      value={uniform.description || ''}
      onInput={(description) => updateUniform({ ...uniform, description })}
      placeholder="Description"
    />
  </td>
  <td>
    <span style="display: inline-block; vertical-align: middle;">
      <DeleteButton click={() => tryToDelete(uniform)} />
    </span>
  </td>
</tr>
