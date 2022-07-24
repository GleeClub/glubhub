<script lang="ts">
  import AdminLinks from './AdminLinks.svelte'
  import DocumentLinks from './DocumentLinks.svelte'
  import Navlink from './Navlink.svelte'
  import HomeLogo from './HomeLogo.svelte'
  import BurgerButton from './BurgerButton.svelte'

  import {
    routeEvents,
    routeMinutes,
    routeRepertoire,
    routeRoster,
    routeProfile,
  } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { route } from 'src/store/route'
  import { siteContext } from 'src/store/context'
  import { onDestroy } from 'svelte'

  let expanded = false

  const unsubscribe = route.subscribe((_route) => {
    expanded = false
  })

  onDestroy(unsubscribe)
</script>

<nav class="navbar is-primary is-fixed-top" aria-label="main navigation">
  <div class="navbar-brand">
    <HomeLogo />
    {#if $siteContext.user}
      <BurgerButton {expanded} toggleExpanded={() => (expanded = !expanded)} />
    {/if}
  </div>
  <div class="navbar-menu" class:is-active={expanded}>
    {#if $siteContext.user}
      <div class="navbar-start">
        <Navlink route={routeEvents(null, null)} />
        <Navlink route={routeRepertoire(null, null)} />
        <Navlink route={routeRoster} />
        <Navlink route={routeMinutes(null, null)} />
        <DocumentLinks />
        <AdminLinks />
      </div>
      <div class="navbar-end">
        <a
          class="navbar-item"
          class:is-active={$route?.route === 'profile' &&
            $route.email === $siteContext.user?.email}
          href={renderRoute(routeProfile($siteContext.user.email, null))}
        >
          {$siteContext.user.fullName}
        </a>
      </div>
    {/if}
  </div>
</nav>
