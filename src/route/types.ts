// Route Constructors

export interface RouteHome {
  name: 'Home'
  route: ''
}

export interface RouteLogin {
  name: 'Login'
  route: 'login'
}

export interface RouteRoster {
  name: 'People'
  route: 'roster'
}

export interface RouteProfile {
  name: 'Profile'
  route: 'profile'
  email: string
  tab: ProfileTab | null
}

export interface RouteEditProfile {
  name: 'Edit Profile'
  route: 'edit-profile'
}

export interface RouteEvents {
  name: 'Events'
  route: 'events'
  eventId: number | null
  tab: EventTab | null
}

export interface RouteEditCarpools {
  name: 'Edit Carpools'
  route: 'edit-carpools'
  eventId: number
}

export interface RouteRepertoire {
  name: 'Repertoire'
  route: 'repertoire'
  songId: number | null
  tab: RepertoireTab | null
}

export interface RouteMinutes {
  name: 'Minutes'
  route: 'minutes'
  minutesId: number | null
  tab: MinutesTab | null
}

export interface RouteForgotPassword {
  name: 'Forgot Password'
  route: 'forgot-password'
}

export interface RouteResetPassword {
  name: 'Reset Password'
  route: 'reset-password'
  token: string
}

export interface RouteAdmin {
  name: 'Admin'
  route: 'admin'
  tab: AdminRoute | null
}

export type GlubRoute =
  | RouteHome
  | RouteLogin
  | RouteRoster
  | RouteProfile
  | RouteEditProfile
  | RouteEvents
  | RouteEditCarpools
  | RouteRepertoire
  | RouteMinutes
  | RouteForgotPassword
  | RouteResetPassword
  | RouteAdmin

// Events Page Tabs

export type EventTab =
  | { name: 'Details'; route: 'details' }
  | { name: "Who's Attending"; route: 'attendees' }
  | { name: 'Attendance'; route: 'attendance' }
  | { name: 'Setlist'; route: 'setlist' }
  | { name: 'Carpools'; route: 'carpools' }
  | { name: 'Request Absence'; route: 'request-absence' }
  | { name: 'Edit'; route: 'edit' }

// Minutes Page Tabs

export type MinutesTab =
  | { name: 'Public'; route: 'public' }
  | { name: 'Private'; route: 'private' }
  | { name: 'Edit'; route: 'edit' }

// Profile Page Tabs

export type ProfileTab =
  | { name: 'Details'; route: 'details' }
  | { name: 'Money'; route: 'money' }
  | { name: 'Attendance'; route: 'attendance' }
  | { name: 'Semesters'; route: 'semesters' }

// Admin Page Tabs

export type AdminRoute =
  | { name: 'Create Event'; route: 'create-event'; gigRequestId: number | null }
  | { name: 'Gig Requests'; route: 'gig-requests' }
  | { name: 'Absence Requests'; route: 'absence-requests' }
  | { name: 'Edit the Semester'; route: 'semesters'; tab: SemesterTab | null }
  | { name: 'Edit Officers'; route: 'officer-positions' }
  | { name: 'Edit Permissions'; route: 'site-permissions' }
  | { name: 'Edit Documents'; route: 'document-links' }
  | { name: 'Upload API or Site'; route: 'webmaster-tools' }
  | { name: 'Uniforms'; route: 'uniforms' }
  | { name: 'Money'; route: 'money'; tab: MoneyTab | null }

// Money Tabs

export type MoneyTab =
  | { route: 'assign-dues'; name: 'Assign everyone dues' }
  | { route: 'assign-late-dues'; name: 'Make remaining dues late' }
  | {
      route: 'batch-transactions'
      name: 'Bake a batch of chocolate chip transactions'
    }

// Edit Semester Tabs

export type SemesterTab =
  | { route: 'change'; name: 'Switch semesters' }
  | { route: 'create'; name: 'Birth a semester' }
  | {
      route: 'edit'
      name: 'Edit this semester'
    }

// Edit Repertoire Tabs

export type RepertoireTab =
  | { route: 'details'; name: 'Details' }
  | { route: 'edit'; name: 'Edit' }
