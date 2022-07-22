import { writable, derived } from 'svelte/store'
import { parseRoute } from 'route/parse'
import { renderRoute } from 'route/render'
import type { GlubRoute } from 'route/types'

const parseRouteFromLocation = () =>
  window.location.hash.length >= 2
    ? parseRoute(window.location.hash.slice(2).split('/'))
    : null;

const routeInner = writable(parseRouteFromLocation())

const originalPushState = history.pushState
const originalReplaceState = history.replaceState

const updateRoute = () =>
  routeInner.set(parseRouteFromLocation())

history.pushState = function () {
  originalPushState.apply(this, arguments)
  updateRoute()
}

history.replaceState = function () {
  originalReplaceState.apply(this, arguments)
  updateRoute()
}

window.addEventListener('popstate', updateRoute)
window.addEventListener('hashchange', updateRoute)

export const route = derived(routeInner, (route) => route)
export const goToRoute = (route: GlubRoute) =>
  history.pushState({}, '', renderRoute(route))
export const replaceRoute = (route: GlubRoute) =>
  history.pushState({}, '', renderRoute(route))
