import * as r from 'src/route/constructors'
import type { GlubRoute } from 'src/route/types'

export const parseRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return r.routeHome
  }

  switch (segments[0]) {
    case r.routeLogin.route:
      return r.routeLogin

    case r.routeRoster.route:
      return r.routeRoster

    case r.routeProfile('', null).route:
      return parseProfileRoute(segments.slice(1))

    case r.routeEditProfile.route:
      return r.routeEditProfile

    case r.routeEvents(null, null).route:
      return parseEventsRoute(segments.slice(1))

    case r.routeEditCarpools(0).route:
      return parseEditCarpoolsRoute(segments.slice(1))

    case r.routeRepertoire(null, null).route:
      return parseRepertoireRoute(segments.slice(1))

    case r.routeMinutes(null, null).route:
      return parseMinutesRoute(segments.slice(1))

    case r.routeForgotPassword.route:
      return r.routeForgotPassword

    case r.routeResetPassword('').route:
      return parseResetPasswordRoute(segments.slice(1))

    case r.routeAdmin(null).route:
      return parseAdminRoute(segments.slice(1))

    default:
      return null
  }
}

// Parsing Helpers

const parseProfileRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return null
  }

  const email = segments[0]
  switch (segments[1]) {
    case undefined:
      return r.routeProfile(email, null)

    case r.profileAttendance.route:
      return r.routeProfile(email, r.profileAttendance)

    case r.profileDetails.route:
      return r.routeProfile(email, r.profileDetails)

    case r.profileMoney.route:
      return r.routeProfile(email, r.profileMoney)

    case r.profileSemesters.route:
      return r.routeProfile(email, r.profileSemesters)

    default:
      return null
  }
}

const parseEventsRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return r.routeEvents(null, null)
  }

  const eventId = parseInt(segments[0])
  if (isNaN(eventId)) {
    return null
  }

  switch (segments[1]) {
    case undefined:
      return r.routeEvents(eventId, null)

    case r.eventDetails.route:
      return r.routeEvents(eventId, r.eventDetails)

    case r.eventAttendees.route:
      return r.routeEvents(eventId, r.eventAttendees)

    case r.eventAttendance.route:
      return r.routeEvents(eventId, r.eventAttendance)

    case r.eventSetlist.route:
      return r.routeEvents(eventId, r.eventSetlist)

    case r.eventCarpools.route:
      return r.routeEvents(eventId, r.eventCarpools)

    case r.eventRequestAbsence.route:
      return r.routeEvents(eventId, r.eventRequestAbsence)

    case r.eventEdit.route:
      return r.routeEvents(eventId, r.eventEdit)

    default:
      return null
  }
}

const parseEditCarpoolsRoute = (segments: string[]): GlubRoute | null => {
  const eventId = parseInt(segments[0])
  if (!isNaN(eventId)) {
    return r.routeEditCarpools(eventId)
  } else {
    return null
  }
}

const parseRepertoireRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return r.routeRepertoire(null, null)
  }

  const songId = parseInt(segments[0])
  if (isNaN(songId)) {
    return null
  }

  switch (segments[1]) {
    case undefined:
      return r.routeRepertoire(songId, null)

    case r.repertoireDetails.route:
      return r.routeRepertoire(songId, r.repertoireDetails)

    case r.repertoireEdit.route:
      return r.routeRepertoire(songId, r.repertoireEdit)

    default:
      return null
  }
}

const parseMinutesRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return r.routeMinutes(null, null)
  }

  const minutesId = parseInt(segments[0])
  if (isNaN(minutesId)) {
    return null
  }

  switch (segments[1]) {
    case undefined:
      return r.routeMinutes(minutesId, null)

    case r.minutesPublic.route:
      return r.routeMinutes(minutesId, r.minutesPublic)

    case r.minutesPrivate.route:
      return r.routeMinutes(minutesId, r.minutesPrivate)

    case r.minutesEdit.route:
      return r.routeMinutes(minutesId, r.minutesEdit)

    default:
      return null
  }
}

const parseResetPasswordRoute = (segments: string[]): GlubRoute | null => {
  return segments.length >= 1 ? r.routeResetPassword(segments[0]) : null
}

const parseAdminRoute = (segments: string[]): GlubRoute | null => {
  if (segments.length === 0) {
    return r.routeAdmin(null)
  }

  switch (segments[0]) {
    case r.adminGigRequests.route:
      return r.routeAdmin(r.adminGigRequests)

    case r.adminAbsenceRequests.route:
      return r.routeAdmin(r.adminAbsenceRequests)

    case r.adminOfficerPositions.route:
      return r.routeAdmin(r.adminOfficerPositions)

    case r.adminSitePermissions.route:
      return r.routeAdmin(r.adminSitePermissions)

    case r.adminDocumentLinks.route:
      return r.routeAdmin(r.adminDocumentLinks)

    case r.adminWebmasterTools.route:
      return r.routeAdmin(r.adminWebmasterTools)

    case r.adminUniforms.route:
      return r.routeAdmin(r.adminUniforms)

    case r.adminSemesters(null).route:
      if (segments.length === 1) {
        return r.routeAdmin(r.adminSemesters(null))
      }

      switch (segments[1]) {
        case r.semesterChange.route:
          return r.routeAdmin(r.adminSemesters(r.semesterChange))

        case r.semesterCreate.route:
          return r.routeAdmin(r.adminSemesters(r.semesterCreate))

        case r.semesterEdit.route:
          return r.routeAdmin(r.adminSemesters(r.semesterEdit))

        default:
          return null
      }

    case r.adminMoney(null).route:
      if (segments.length === 1) {
        return r.routeAdmin(r.adminMoney(null))
      }

      switch (segments[1]) {
        case r.moneyAssignDues.route:
          return r.routeAdmin(r.adminMoney(r.moneyAssignDues))

        case r.moneyAssignLateDues.route:
          return r.routeAdmin(r.adminMoney(r.moneyAssignLateDues))

        case r.moneyBatchTransactions.route:
          return r.routeAdmin(r.adminMoney(r.moneyBatchTransactions))

        default:
          return null
      }

    case r.adminCreateEvent(null).route:
      if (segments.length === 1) {
        return r.routeAdmin(r.adminCreateEvent(null))
      }

      const gigRequestId = parseInt(segments[1])
      if (!isNaN(gigRequestId)) {
        return r.routeAdmin(r.adminCreateEvent(gigRequestId))
      } else {
        return null
      }

    default:
      return null
  }
}
