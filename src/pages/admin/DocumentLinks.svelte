<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import DeleteButton from 'src/components/buttons/DeleteButton.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import Remote from 'src/components/remote/Remote.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'

  import { DocumentLink } from 'src/gql-operations'
  import { stringType } from 'src/state/input'
  import { eagerQuery, query } from 'src/state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { get } from 'svelte/store'

  let name = ''
  let url = ''
  let state: RemoteData = emptyLoaded

  const [allLinks, reloadAllLinks] = eagerQuery('AllDocumentLinks', {})

  async function updateLink(link: DocumentLink) {
    state = loading
    const result = await query('CreateDocumentLink', link)

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllLinks()
    }
  }

  async function deleteLink(index: number) {
    const links = get(allLinks)
    if (links.type !== 'loaded') return

    const link = links.data.links[index]
    if (!link) return

    state = loading
    const result = await query('DeleteDocumentLink', { name: link.name })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllLinks()
    }
  }

  async function createLink() {
    const links = get(allLinks)
    if (links.type !== 'loaded' || !name || !url) return

    state = loading
    const result = await query('CreateDocumentLink', { name, url })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      name = ''
      url = ''
      reloadAllLinks()
    }
  }
</script>

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
              value={link.url}
              onInput={(url) => updateLink({ ...link, url })}
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
            onInput={(newName) => (name = newName)}
            placeholder="Name"
          />
        </td>
        <td>
          <TextInput
            type={stringType}
            value={url}
            onInput={(newUrl) => (url = newUrl)}
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
