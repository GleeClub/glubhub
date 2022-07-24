import type {
  AdminRoute,
  EventTab,
  GlubRoute,
  MinutesTab,
  RepertoireTab,
} from 'src/route/types'

export const renderRoute = (route: GlubRoute): string =>
  `#/${buildRoute(route).join('/')}`

const buildAdminRoute = (base: string, tab: AdminRoute | null): string[] => {
  if (tab === null) {
    return [base]
  } else if (tab.route === 'create-event' && tab.gigRequestId !== null) {
    return [base, tab.route, `${tab.gigRequestId}`]
  } else if (tab.route === 'money' && tab.tab !== null) {
    return [base, tab.route, tab.tab.route]
  } else if (tab.route === 'semesters' && tab.tab !== null) {
    return [base, tab.route, tab.tab.route]
  } else {
    return [base, tab.route]
  }
}

const buildEventsRoute = (
  base: string,
  id: number | null,
  tab: EventTab | null
): string[] => [base, ...(id ? [`${id}`] : []), ...(tab ? [tab.route] : [])]

const buildRepertoireRoute = (
  base: string,
  songId: number | null,
  tab: RepertoireTab | null
): string[] => [
  base,
  ...(songId ? [`${songId}`] : []),
  ...(tab ? [tab.route] : []),
]

const buildMinutesRoute = (
  base: string,
  id: number | null,
  tab: MinutesTab | null
): string[] => [base, ...(id ? [`${id}`] : []), ...(tab ? [tab.route] : [])]

const buildRoute = (route: GlubRoute): string[] => {
  if (!route.route) {
    return []
  } else if (route.route === 'events') {
    return buildEventsRoute(route.route, route.eventId, route.tab)
  } else if (route.route === 'minutes') {
    return buildMinutesRoute(route.route, route.minutesId, route.tab)
  } else if (route.route === 'admin') {
    return buildAdminRoute(route.route, route.tab)
  } else if (route.route === 'repertoire') {
    return buildRepertoireRoute(route.route, route.songId, route.tab)
  } else if (route.route === 'profile') {
    return [route.route, route.email, ...(route.tab ? [route.tab.route] : [])]
  } else if (route.route === 'reset-password') {
    return [route.route, route.token]
  } else if (route.route === 'edit-carpools') {
    return [route.route, `${route.eventId}`]
  } else {
    return [route.route]
  }
}
