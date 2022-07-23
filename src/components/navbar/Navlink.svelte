<script lang="ts">
  import type { GlubRoute } from 'src/route/types'
  import { route as routeStore } from 'src/store/route'
  import { renderRoute } from 'src/route/render'

  export let route: GlubRoute
</script>

<a
  class="navbar-item{$routeStore?.route === route.route ? ' is-active' : ''}"
  href={renderRoute(route)}
>
  {route.name}
</a>
