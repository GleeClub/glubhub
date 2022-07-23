<script lang="ts">
  import Navbar from 'src/components/navbar/Navbar.svelte'
  import ConfirmAccountHeader from 'src/components/confirm-account/ConfirmAccountHeader.svelte'
  import ForgotPassword from 'src/pages/ForgotPassword.svelte'
  import ResetPassword from 'src/pages/ResetPassword.svelte'
  import Admin from 'src/pages/admin/Admin.svelte'
  import Events from 'src/pages/events/overview/Events.svelte'
  import Minutes from 'src/pages/minutes/Minutes.svelte'
  import Profile from 'src/pages/profile/Profile.svelte'
  import Repertoire from 'src/pages/repertoire/Repertoire.svelte'
  import Roster from 'src/pages/Roster.svelte'
  import Home from 'src/pages/home/Home.svelte'
  import Spinner from 'src/components/remote/Spinner.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import Login from 'src/pages/Login.svelte'
  import EditProfile from 'src/pages/edit-profile/EditProfile.svelte'
  import EditCarpools from 'src/pages/events/edit-carpools/EditCarpools.svelte'

  import { get } from 'svelte/store'
  import type { GlubRoute } from 'src/route/types'
  import { goToRoute, replaceRoute, route } from 'src/store/route'
  import { routeHome, routeLogin } from 'src/route/constructors'
  import { onDestroy } from 'svelte'
  import {
    reloadSiteContext,
    siteContext,
    siteContextStatus,
  } from 'src/store/context'

  reloadSiteContext()

  const unsubscribe1 = siteContext.subscribe((_context) => {
    const r = get(route)
    if (r) {
      replaceRoute(r)
    }
  })

  const unsubscribe2 = route.subscribe((r) => {
    const loggedIn = !!get(siteContext).user
    const guestRoutes: GlubRoute['route'][] = [
      'edit-profile',
      'forgot-password',
      'reset-password',
      'login',
    ]

    if (!loggedIn && !guestRoutes.includes(r?.route || '')) {
      goToRoute(routeLogin)
    } else if (loggedIn && r?.route === 'login') {
      goToRoute(routeHome)
    }
  })

  onDestroy(unsubscribe1)
  onDestroy(unsubscribe2)
</script>

<Navbar />
<ConfirmAccountHeader />
<div style="padding-bottom: 50px" />
<div class="center">
  {#if $siteContextStatus.type === 'loading'}
    <Spinner />
  {:else if $siteContextStatus.type === 'error'}
    <ErrorBox error={$siteContextStatus.error} />
  {:else if $route?.route === 'edit-profile'}
    <EditProfile />
  {:else if $route?.route === 'forgot-password'}
    <ForgotPassword />
  {:else if $route?.route === 'reset-password'}
    <ResetPassword token={$route.token} />
  {:else if $route?.route === 'admin'}
    <Admin tab={$route.tab} />
  {:else if $route?.route === 'edit-carpools'}
    <EditCarpools eventId={$route.eventId} />
  {:else if $route?.route === 'events'}
    <Events eventId={$route.eventId} tab={$route.tab} />
  {:else if $route?.route === 'login'}
    <Login />
  {:else if $route?.route === 'minutes'}
    <Minutes minutesId={$route.minutesId} tab={$route.tab} />
  {:else if $route?.route === 'profile'}
    <Profile email={$route.email} tab={$route.tab} />
  {:else if $route?.route === 'repertoire'}
    <Repertoire songId={$route.songId} tab={$route.tab} />
  {:else if $route?.route === 'roster'}
    <Roster />
  {:else}
    <Home />
  {/if}
</div>
