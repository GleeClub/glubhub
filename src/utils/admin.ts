import {
  adminAbsenceRequests,
  adminCreateEvent,
  adminDocumentLinks,
  adminGigRequests,
  adminMoney,
  adminOfficerPositions,
  adminSemesters,
  adminSitePermissions,
  adminUniforms,
  adminWebmasterTools,
} from 'src/route/constructors'
import type { AdminRoute } from 'src/route/types'
import { siteContext } from 'src/store/context'
import { derived } from 'svelte/store'
import { permittedTo } from './helpers'
import * as Permissions from 'src/state/permissions'

export const visibleAdminTabs = derived(siteContext, (context) => {
  const user = context.user
  if (!user) return []

  const eventTabs: [AdminRoute, boolean][] = [
    [adminCreateEvent(null), permittedTo(user, Permissions.createEvent)],
    [adminGigRequests, permittedTo(user, Permissions.processGigRequests)],
    [
      adminAbsenceRequests,
      permittedTo(user, Permissions.processAbsenceRequests),
    ],
  ]
  const dataTabs: [AdminRoute, boolean][] = [
    [adminSemesters(null), permittedTo(user, Permissions.editSemester)],
    [adminDocumentLinks, permittedTo(user, Permissions.editLinks)],
    [adminMoney(null), permittedTo(user, Permissions.editTransaction)],
    [adminOfficerPositions, permittedTo(user, Permissions.editOfficers)],
    [adminUniforms, permittedTo(user, Permissions.editUniforms)],
    [adminSitePermissions, permittedTo(user, Permissions.editPermissions)],
  ]
  const webmasterTab: [AdminRoute, boolean][] = [
    [
      adminWebmasterTools,
      (user.positions || []).some((role) => role.name === 'Webmaster'),
    ],
  ]

  return [eventTabs, dataTabs, webmasterTab]
    .map((tabGroup) =>
      tabGroup
        .filter(([_tab, visible]) => visible)
        .map(([tab, _visible]) => tab)
    )
    .filter((tabGroup) => tabGroup.length)
})
