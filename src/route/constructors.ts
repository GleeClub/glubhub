import type {
  AdminRoute, EventTab, MinutesTab, MoneyTab, ProfileTab, RepertoireTab, RouteAdmin, RouteEditCarpools,
  RouteEditProfile, RouteEvents, RouteForgotPassword, RouteHome, RouteLogin, RouteMinutes, RouteProfile,
  RouteRepertoire, RouteResetPassword, RouteRoster, SemesterTab
} from "route/types";

export const routeHome: RouteHome = { name: 'Home', route: '' };

export const routeLogin: RouteLogin = { name: 'Login', route: 'login' };

export const routeRoster: RouteRoster = { name: 'People', route: 'roster' };

export const routeProfile = (
  email: string,
  tab: ProfileTab | null
): RouteProfile => ({
  name: 'Profile',
  route: 'profile',
  email,
  tab
});

export const routeEditProfile: RouteEditProfile = {
  name: 'Edit Profile',
  route: 'edit-profile'
};


export const routeEvents = (
  eventId: number | null,
  tab: EventTab | null
): RouteEvents => ({
  name: 'Events',
  route: 'events',
  eventId,
  tab
});


export const routeEditCarpools = (eventId: number): RouteEditCarpools => ({
  name: 'Edit Carpools',
  route: 'edit-carpools',
  eventId
});


export const routeRepertoire = (
  songId: number | null,
  tab: RepertoireTab | null
): RouteRepertoire => ({
  name: 'Repertoire',
  route: 'repertoire',
  songId,
  tab
});


export const routeMinutes = (
  minutesId: number | null,
  tab: MinutesTab | null
): RouteMinutes => ({
  name: 'Minutes',
  route: 'minutes',
  minutesId,
  tab
});


export const routeForgotPassword: RouteForgotPassword = {
  name: 'Forgot Password',
  route: 'forgot-password'
};


export const routeResetPassword = (
  token: string
): RouteResetPassword => ({
  name: 'Reset Password',
  route: 'reset-password',
  token
});

export const routeAdmin = (tab: AdminRoute | null): RouteAdmin => ({
  name: 'Admin',
  route: 'admin',
  tab
});

// Events Tab Constructors

export const eventDetails: EventTab = { name: 'Details', route: 'details' };
export const eventAttendees: EventTab = {
  name: 'Who\'s Attending',
  route: 'attendees'
};
export const eventAttendance: EventTab = {
  name: 'Attendance',
  route: 'attendance'
};
export const eventSetlist: EventTab = { name: 'Setlist', route: 'setlist' };
export const eventCarpools: EventTab = { name: 'Carpools', route: 'carpools' };
export const eventRequestAbsence: EventTab = {
  name: 'Request Absence',
  route: 'request-absence'
};
export const eventEdit: EventTab = { name: 'Edit', route: 'edit' };

// Minutes Tab Constructors

export const minutesPublic: MinutesTab = { name: 'Public', route: 'public' };
export const minutesPrivate: MinutesTab = { name: 'Private', route: 'private' };
export const minutesEdit: MinutesTab = { name: 'Edit', route: 'edit' };

// Profile Tab Constructors

export const profileDetails: ProfileTab = { name: 'Details', route: 'details' };
export const profileMoney: ProfileTab = { name: 'Money', route: 'money' };
export const profileAttendance: ProfileTab = {
  name: 'Attendance',
  route: 'attendance'
};
export const profileSemesters: ProfileTab = {
  name: 'Semesters',
  route: 'semesters'
};

// Admin Tab Constructors

export const adminCreateEvent = (gigRequestId: number | null): AdminRoute => ({
  name: 'Create Event',
  route: 'create-event',
  gigRequestId
});
export const adminGigRequests: AdminRoute = {
  name: 'Gig Requests',
  route: 'gig-requests'
};
export const adminAbsenceRequests: AdminRoute = {
  name: 'Absence Requests',
  route: 'absence-requests'
};
export const adminSemesters = (tab: SemesterTab | null): AdminRoute => ({
  name: 'Edit the Semester',
  route: 'semesters',
  tab
});
export const adminOfficerPositions: AdminRoute = {
  name: 'Edit Officers',
  route: 'officer-positions'
};
export const adminSitePermissions: AdminRoute = {
  name: 'Edit Permissions',
  route: 'site-permissions'
};
export const adminDocumentLinks: AdminRoute = {
  name: 'Edit Documents',
  route: 'document-links'
};
export const adminWebmasterTools: AdminRoute = {
  name: 'Upload API or Site',
  route: 'webmaster-tools'
};
export const adminUniforms: AdminRoute = {
  name: 'Uniforms',
  route: 'uniforms'
};
export const adminMoney = (tab: MoneyTab | null): AdminRoute => ({
  name: 'Money',
  route: 'money',
  tab
});

// Money Tab Constructors

export const moneyAssignDues: MoneyTab = {
  route: 'assign-dues',
  name: 'Assign everyone dues'
};
export const moneyAssignLateDues: MoneyTab = {
  route: 'assign-late-dues',
  name: 'Make remaining dues late'
};
export const moneyBatchTransactions: MoneyTab = {
  route: 'batch-transactions',
  name: 'Bake a batch of chocolate chip transactions'
};

// Edit Semester Tab Constructors

export const semesterChange: SemesterTab = {
  route: 'change',
  name: 'Switch semesters'
};
export const semesterCreate: SemesterTab = {
  route: 'create',
  name: 'Birth a semester'
};
export const semesterEdit: SemesterTab = {
  route: 'edit',
  name: 'Edit this semester'
};

// Repertoire Tab Constructors

export const repertoireDetails: RepertoireTab = {
  route: 'details',
  name: 'Details'
};
export const repertoireEdit: RepertoireTab = {
  route: 'edit',
  name: 'Edit'
};
