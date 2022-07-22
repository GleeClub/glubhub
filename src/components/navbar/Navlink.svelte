<script lang="ts">
  import type { GlubRoute } from 'route/types'
  import { route as routeStore } from 'store/route'
  import { renderRoute } from 'route/render'

  export let route: GlubRoute
</script>

<a
  class="navbar-item{$routeStore?.route === route.route ? ' is-active' : ''}"
  href={renderRoute(route)}
>
  {route.name}
</a>
