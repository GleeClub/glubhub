<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Title from "components/bulma/Title.svelte";
  import Button from "components/buttons/Button.svelte";
  import TextareaInput from "components/forms/TextareaInput.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import DeleteModal from "components/popup/DeleteModal.svelte";
  import Remote from "components/remote/Remote.svelte";
  import StateBox from "components/remote/StateBox.svelte";
  import UniformRow from "./UniformRow.svelte";

  import {
    AllUniformsDocument,
    CreateUniformDocument,
    DeleteUniformDocument,
    Uniform,
    UpdateUniformDocument
  } from "gql-operations";
  import { stringType } from "state/input";
  import { mutation, reexecutableQuery } from "state/query";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";

  let name = "";
  let description = "";
  let state: RemoteData = emptyLoaded;
  let uniformToDelete: Uniform | null = null;
  let deleteState: RemoteData = emptyLoaded;

  const [allUniforms, reloadAllUniforms] = reexecutableQuery(AllUniformsDocument, {});

  async function updateUniform(uniform: Uniform) {
    state = loading;
    const result = await mutation(UpdateUniformDocument, {
      id: uniform.id, update: uniform,
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      reloadAllUniforms({});
    }
  }

  async function deleteUniform(id: number) {
    deleteState = loading;
    const result = await mutation(DeleteUniformDocument, { id });

    deleteState = stateFromResult(result);
    if (result.type === "loaded") {
      reloadAllUniforms({});
    }
  }

  async function createUniform() {
    state = loading;
    const result = await mutation(CreateUniformDocument, {
      newUniform: { name, description }
    });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      reloadAllUniforms({});
    }
  }
</script>

<style>
.uniform-table {
  width: 100%;
  border-spacing: 5px;
  border-collapse: separate;
}
</style>

<div style:width="100%">
  <Title>Uniforms</Title>
  <Box>
    <Remote data={$allUniforms}>
      <table class="uniform-table" slot="loaded" let:data={uniforms}>
        <tr>
          <td>
            <b>Name</b>
          </td>
          <td>
            <b>Description</b>
          </td>
        </tr>
        {#each uniforms.uniforms as uniform}
          <UniformRow
            {uniform}
            {updateUniform}
            tryToDelete={() => uniformToDelete = uniform}
          />
        {/each}
        <tr>
          <td>
            <b>New</b>
          </td>
        </tr>

        <!-- New Uniform Row -->
        <tr>
          <td>
            <TextInput
              type={stringType}
              value={name}
              onInput={newName => name = newName}
              placeholder="Name"
            />
          </td>
          <td>
            <TextareaInput
              value={description}
              onInput={newDescription => description = newDescription}
              placeholder="Description"
            />
          </td>
          <td>
            <Button color="is-primary" click={createUniform}>
              Suit up.
            </Button>
          </td>
        </tr>
      </table>
    </Remote>
    <StateBox {state} />

    {#if uniformToDelete}
      <DeleteModal
        title="Delete uniform {uniformToDelete.name}?"
        cancel={() => uniformToDelete = null}
        confirm={() => deleteUniform(uniformToDelete.id)}
        state={deleteState}
      >
        <p>Are you sure you want to delete the {uniformToDelete.name} uniform?</p>
        <p>
          <i>
            Note: all events that have this uniform will no longer have a uniform.
          </i>
        </p>
      </DeleteModal>
    {/if}
  </Box>
</div>
