<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Title from "components/bulma/Title.svelte";
  import Button from "components/buttons/Button.svelte";
  import DeleteButton from "components/buttons/DeleteButton.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import Remote from "components/remote/Remote.svelte";
  import StateBox from "components/remote/StateBox.svelte";

  import {
    AllDocumentLinksDocument,
    CreateDocumentLinkDocument,
    DeleteDocumentLinkDocument,
    DocumentLink
  } from "gql-operations";
  import { stringType } from "state/input";
  import { mutation, reexecutableQuery } from "state/query";
  import { emptyLoaded, loading, RemoteData } from "state/types";
  import { get } from "svelte/store";

  let name = "";
  let url = "";
  let state: RemoteData = emptyLoaded;

  const [allLinks, reloadAllLinks] = reexecutableQuery(AllDocumentLinksDocument, {});

  async function updateLink(link: DocumentLink) {
    state = loading;
    const response = await mutation(CreateDocumentLinkDocument, link);

    if (response.type === "loaded") {
      state = emptyLoaded;
      reloadAllLinks({});
    } else {
      state = response;
    }
  }

  async function deleteLink(index: number) {
    const links = get(allLinks);
    if (links.type !== "loaded") return;

    const link = links.data.links[index];
    if (!link) return;

    state = loading;
    const response = await mutation(DeleteDocumentLinkDocument, { name: link.name });

    if (response.type === "loaded") {
      state = emptyLoaded;
      reloadAllLinks({});
    } else {
      state = response;
    }
  }

  async function createLink() {
    const links = get(allLinks);
    if (links.type !== "loaded" || !name || !url) return;

    state = loading;
    const response = await mutation(CreateDocumentLinkDocument, { name, url });

    if (response.type === "loaded") {
      name = "";
      url = "";
      state = emptyLoaded;
      reloadAllLinks({});
    } else {
      state = response;
    }
  }
</script>

<style>
.link-table {
  border-spacing: 5px;
  border-collapse: separate;
}

.inline-middle {
  display: inline-block;
  vertical-align: middle;
}
</style>

<Title>Document Links</Title>
<Box>
  <Remote data={$allLinks}>
    <table class="link-table" slot="loaded" let:data={links}>
      {#each links.links as link, index}
        <tr>
          <td style:padding-right="10px">
            <span class="inline-middle">
              {link.name}
            </span>
          </td>
          <td>
            <TextInput
              type={stringType}
              value={url}
              onInput={url => updateLink({ ...link, url })}
              placeholder="URL"
            />
          </td>
          <td>
            <span class="inline-middle">
              <DeleteButton click={() => deleteLink(index)} />
            </span>
          </td>
        </tr>
      {/each}
      <tr>
        <td>
          <b>New</b>
        </td>
      </tr>

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
          <TextInput
            type={stringType}
            value={url}
            onInput={newUrl => url = newUrl}
            placeholder="URL"
          />
        </td>
        <td>
          <Button click={createLink}>sí</Button>
        </td>
      </tr>
    </table>
  </Remote>
  <StateBox {state} />
</Box>
