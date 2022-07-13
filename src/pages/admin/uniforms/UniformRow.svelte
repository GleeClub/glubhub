<script lang="ts">
  import DeleteButton from "components/buttons/DeleteButton.svelte";
  import TextareaInput from "components/forms/TextareaInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";

  import { Uniform } from "gql-operations";
  import { stringType } from "state/input";

  export let uniform: Uniform;
  export let updateUniform: (uniform: Uniform) => void;
  export let tryToDelete: (uniform: Uniform) => void;
</script>

<tr>
  <td>
    <TextInput
      type={stringType}
      value={uniform.name}
      onInput={name => updateUniform({ ...uniform, name })}
      placeholder="Name"
    />
  </td>
  <td>
    <TextareaInput
      value={uniform.description || ""}
      onInput={description => updateUniform({ ...uniform, description })}
      placeholder="Description"
    />
  </td>
  <td>
    <span style="display: inline-block; vertical-align: middle;">
      <DeleteButton click={() => tryToDelete(uniform)} />
    </span>
  </td>
</tr>
