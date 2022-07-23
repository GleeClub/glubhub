<script lang="ts">
  import { routeEvents } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { EventTab } from 'src/route/types'

  export let tab: EventTab
  export let currentTab: EventTab | null
  export let eventId: number
</script>

<li class:is-active={tab.route === currentTab?.route}>
  <a href={renderRoute(routeEvents(eventId, tab))}>{tab.name}</a>
</li>
