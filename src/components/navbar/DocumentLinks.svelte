<script lang="ts">
  import { derived } from 'svelte/store'
  import { eagerQuery } from 'state/query'

  const [links, _reloadLinks] = eagerQuery('AllDocumentLinks', {})
  const loadedLinks = derived(links, (result) =>
    result.type === 'loaded' ? result.data.links : []
  )
</script>

<div class="navbar-item has-dropdown is-hoverable">
  <a class="navbar-link">Documents</a>
  <div class="navbar-dropdown">
    {#each $loadedLinks as link}
      <a
        class="navbar-item"
        target="_blank"
        rel="noopener noreferrer"
        href={link.url}
      >
        {link.name}
      </a>
    {/each}
  </div>
</div>
