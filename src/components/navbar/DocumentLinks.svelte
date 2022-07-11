<script lang="ts">
  import { DocumentLinksDocument } from 'gql-operations'
  import { query } from 'state/query';
  import { derived } from 'svelte/store';

  const links = derived(
    query(DocumentLinksDocument),
    result => result.type === "loaded" ? result.data.links : []
  );
</script>

<div class="navbar-item has-dropdown is-hoverable">
  <a class="navbar-link">Documents</a>
  <div class="navbar-dropdown">
    {#each $links as link}
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
