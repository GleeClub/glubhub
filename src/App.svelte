<script lang="ts">
  import Spinner from 'components/basic/Spinner.svelte';
  import ErrorBox from 'components/ErrorBox.svelte';
  import Navbar from 'components/navbar/Navbar.svelte';
  import Login from 'page/Login.svelte';
  import EditProfile from 'page/EditProfile.svelte';

  import { initClient } from '@urql/svelte'
  import { reloadContext, siteContext, siteContextStatus } from 'store/context';
  import { getToken } from 'utils/token'
  import { get } from 'svelte/store';
  import type { GlubRoute } from 'route/types';
  import { goToRoute, route } from 'store/route';
  import { routeLogin } from 'route/constructors';

  initClient({
    url: 'http://localhost:8000/cgi-bin/graphql',
    fetchOptions: () => {
      const token = getToken()
      return {
        headers: token ? { GREASE_TOKEN: token } : undefined,
      }
    },
  })

  reloadContext();

  route.subscribe(r => {
    const guestRoutes: (GlubRoute['route'])[] = ["edit-profile", "forgot-password", "reset-password", "login"];
    if (!get(siteContext).user && !guestRoutes.includes(r?.route || "")) {
      goToRoute(routeLogin);
    }
  });
</script>

<Navbar />
<ConfirmAccountHeader />
<div style="padding-bottom: 50px" />
<div class="center">
  {#if $siteContextStatus.type === "loading"}
    <Spinner />
  {:else if $siteContextStatus.type === "error"}
    <ErrorBox error={$siteContextStatus.error} />
  {:else}
    {#if $siteContextStatus.user}
      {#if $route?.route === "edit-profile"}
        <EditProfile />
      {:else if $route?.route === "forgot-password"}
        <ForgotPassword />
      {:else if $route?.route === "reset-password"}
        <ResetPassword token={$route.token} />
      {:else}
        <Login />
      {/if}
    {:else}
    <!--
      {#if $route?.route === "admin"}

      return <Admin tab={location.tab} />;
    case "edit-carpools":
      return <EditCarpools eventId={location.eventId} />;
    case "edit-profile":
      return <EditProfile />;
    case "events":
      return <Events eventId={location.eventId} tab={location.tab} />;
    case "forgot-password":
      return <ForgotPassword />;
    case "login":
      return <Login />;
    case "minutes":
      return <Minutes minutesId={location.minutesId} tab={location.tab} />;
    case "profile":
      return <Profile email={location.email} tab={location.tab} />;
    case "repertoire":
      return <Repertoire songId={location.songId} tab={location.tab} />;
    case "reset-password":
      return <ResetPassword token={location.token} />;
    case "roster":
      return <Roster />;
    default:
      return <Home />;
    -->
    {/if}
  {/if}
</div>
