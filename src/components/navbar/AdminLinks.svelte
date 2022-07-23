<script lang="ts">
  import { visibleAdminTabs } from 'src/utils/admin'
  import { renderRoute } from 'src/route/render'
  import { routeAdmin } from 'src/route/constructors'
</script>

{#if $visibleAdminTabs.length > 0}
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link" href={renderRoute(routeAdmin(null))}> Admin </a>
    <div class="navbar-dropdown">
      {#each $visibleAdminTabs as tabGroup, tabIndex}
        {#each tabGroup as tab}
          <a class="navbar-item" href={renderRoute(routeAdmin(tab))}>
            {tab.name}
          </a>
        {/each}
        {#if tabIndex < $visibleAdminTabs.length - 1}
          <hr class="navbar-divider" />
        {/if}
      {/each}
    </div>
  </div>
{/if}
