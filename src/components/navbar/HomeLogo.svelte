<script lang="ts">
  import { routeHome } from 'route/constructors'
  import { renderRoute } from 'route/render'
</script>

<a href={renderRoute(routeHome)} class="navbar-item">
  <span class="icon is-small" style="width: 3vw">
    <i class="fas fa-home" />
  </span>
</a>
