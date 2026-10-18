export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateScalar: { input: string; output: string; }
  TimeScalar: { input: string; output: string; }
  UniformColor: { input: string; output: string; }
};

/** A request by a member to not lose credit for missing an event */
export type AbsenceRequest = {
  __typename?: 'AbsenceRequest';
  /** The event they requested absence from */
  event: Event;
  /** The member that requested an absence */
  member: Member;
  /** The reason the member petitioned for absence with */
  reason: Scalars['String']['output'];
  /** The current state of the request */
  state: AbsenceRequestStatus;
  /** The time this request was placed */
  time: DateTime;
};

/** The current status of an absence request */
export enum AbsenceRequestStatus {
  /** The request has been approved */
  Approved = 'APPROVED',
  /** The request has been denied */
  Denied = 'DENIED',
  /** The request hasn't been responded to yet */
  Pending = 'PENDING'
}

/** A semester the given member was active during */
export type ActiveSemester = {
  __typename?: 'ActiveSemester';
  /** Whether the member was registered for the class */
  enrollment: Enrollment;
  /** The grades for the member in the given semester */
  grades: Grades;
  /** The email of the member */
  member: Scalars['String']['output'];
  /** What section the member sang in */
  section: Scalars['String']['output'];
  /** The name of the semester */
  semester: Scalars['String']['output'];
};

/** Info about a member's attendance for a specific event */
export type Attendance = {
  __typename?: 'Attendance';
  /** The absence request made by the current member, if they requested one */
  absenceRequest?: Maybe<AbsenceRequest>;
  /** Whether the absence is approved */
  approvedAbsence: Scalars['Boolean']['output'];
  /** Whether the member confirmed that they would attend */
  confirmed: Scalars['Boolean']['output'];
  /** If credit for attending the event should be denied */
  denyCredit: Scalars['Boolean']['output'];
  /** Whether the member did attend the event */
  didAttend: Scalars['Boolean']['output'];
  /** The email of the member this attendance belongs to */
  member: Member;
  /** How late the member was if they attended */
  minutesLate: Scalars['Int']['output'];
  /** If the member is not allowed to RSVP, this is why */
  rsvpIssue?: Maybe<Scalars['String']['output']>;
  /** Whether the member is expected to attend the event */
  shouldAttend: Scalars['Boolean']['output'];
};

/** An update for a member's attendance at a specific event */
export type AttendanceUpdate = {
  /** Whether the member confirmed that they would attend */
  confirmed: Scalars['Boolean']['input'];
  /** Whether the member did attend the event */
  didAttend: Scalars['Boolean']['input'];
  /** How late the member was if they attended */
  minutesLate: Scalars['Int']['input'];
  /** Whether the member is expected to attend the event */
  shouldAttend: Scalars['Boolean']['input'];
};

/** A carpool for members driving to an event */
export type Carpool = {
  __typename?: 'Carpool';
  /** The driver of the carpool */
  driver: Member;
  /** The event it belongs to */
  event: Scalars['Int']['output'];
  /** The ID of the carpool */
  id: Scalars['Int']['output'];
  /** The passengers of the carpool */
  passengers: Array<Member>;
};

/** A money transaction charged to a member */
export type ClubTransaction = {
  __typename?: 'ClubTransaction';
  /** How much this transaction was for */
  amount: Scalars['Int']['output'];
  /** A description of what the member was charged for specifically */
  description: Scalars['String']['output'];
  /** The ID of the transaction */
  id: Scalars['Int']['output'];
  /** The member this transaction was charged to */
  member: Member;
  /** Whether the member has paid the amount requested in this transaction */
  resolved: Scalars['Boolean']['output'];
  /** Optionally, the name of the semester this tranaction was made during */
  semester?: Maybe<Scalars['String']['output']>;
  /** When this transaction was charged */
  time: DateTime;
  /** The name of the type of transaction */
  type: Scalars['String']['output'];
};

/** A datetime broken into a date and a time */
export type DateTime = {
  __typename?: 'DateTime';
  /** The date part of the datetime */
  date: Scalars['DateScalar']['output'];
  /** The time part of the datetime */
  time: Scalars['TimeScalar']['output'];
};

/** A new datetime broken into a date and a time */
export type DateTimeInput = {
  /** The date part of the datetime */
  date: Scalars['DateScalar']['input'];
  /** The time part of the datetime */
  time: Scalars['TimeScalar']['input'];
};

/** A link to a Google Doc or other important document */
export type DocumentLink = {
  __typename?: 'DocumentLink';
  /** The name of the link */
  name: Scalars['String']['output'];
  /** The link itself */
  url: Scalars['String']['output'];
};

/** Whether a member is in the club for a grade or not */
export enum Enrollment {
  /** The member is enrolled in the course */
  Class = 'CLASS',
  /** The member is there on their own time */
  Club = 'CLUB'
}

/** An event where members are singing */
export type Event = {
  __typename?: 'Event';
  /** Attendance for all current members for the event */
  allAttendance: Array<Attendance>;
  /** The attendance for a specific member at this event */
  attendance?: Maybe<Attendance>;
  /** When members are expected to arrive to the event */
  callTime: DateTime;
  /** All carpools for this event */
  carpools: Array<Carpool>;
  /** General information or details about this event */
  comments: Scalars['String']['output'];
  /** Whether members are assumed to attend (we assume as much for most events) */
  defaultAttend: Scalars['Boolean']['output'];
  /** The gig for this event, if it is a gig */
  gig?: Maybe<Gig>;
  /** Whether this event counts toward the volunteer gig count for the semester */
  gigCount: Scalars['Boolean']['output'];
  /** The ID of the event */
  id: Scalars['Int']['output'];
  /** Where this event will be held */
  location: Scalars['String']['output'];
  /** The name of the event */
  name: Scalars['String']['output'];
  /** How many points attendance of this event is worth */
  points: Scalars['Int']['output'];
  /** When members are probably going to be released */
  releaseTime?: Maybe<DateTime>;
  /** The name of the semester this event belongs to */
  semester: Scalars['String']['output'];
  /** All songs we plan to sing at this event, in order */
  setlist: Array<Song>;
  /** The type of the event (see EventType) */
  type: Scalars['String']['output'];
  /** The attendance for the current user at this event */
  userAttendance?: Maybe<Attendance>;
};


/** An event where members are singing */
export type EventAllAttendanceArgs = {
  emptyIfNotPermitted?: Scalars['Boolean']['input'];
};


/** An event where members are singing */
export type EventAttendanceArgs = {
  member: Scalars['String']['input'];
};

/** The type of an event */
export type EventType = {
  __typename?: 'EventType';
  /** The name of the type of event */
  name: Scalars['String']['output'];
  /** The amount of points this event is normally worth */
  weight: Scalars['Int']['output'];
};

/** An event and the change to a member's grade that it caused */
export type EventWithGradeChange = {
  __typename?: 'EventWithGradeChange';
  /** What grade change occurred, for what reason */
  change: GradeChange;
  /** The event a grade was received for */
  event: Event;
};

/** A fee that can be charged to members */
export type Fee = {
  __typename?: 'Fee';
  /** The amount to charge members */
  amount: Scalars['Int']['output'];
  /** A longer description of what it is charging members for */
  description: Scalars['String']['output'];
  /** The short name of the fee */
  name: Scalars['String']['output'];
};

/** The gig info included for an event, if it is a gig */
export type Gig = {
  __typename?: 'Gig';
  /** The email of the contact for this gig */
  contactEmail: Scalars['String']['output'];
  /** The name of the contact for this gig */
  contactName: Scalars['String']['output'];
  /** The phone number of the contact for this gig */
  contactPhone: Scalars['String']['output'];
  /** A description of this event for the external site (if it is public) */
  description: Scalars['String']['output'];
  /** The ID of the event this gig belongs to */
  event: Scalars['Int']['output'];
  /** When members are expected to actually perform */
  performanceTime: DateTime;
  /** The price we are charging for this gig */
  price?: Maybe<Scalars['Int']['output']>;
  /** Whether this gig is visible on the external website */
  public: Scalars['Boolean']['output'];
  /** A summary of this event for the external site (if it is public) */
  summary: Scalars['String']['output'];
  /** The uniform for this gig */
  uniform: Uniform;
};

/** A request for the Glee Club to perform somewhere */
export type GigRequest = {
  __typename?: 'GigRequest';
  /** Any comments about the event */
  comments: Scalars['String']['output'];
  /** The phone number of the contact for the potential event */
  contactEmail: Scalars['String']['output'];
  /** The name of the contact for the potential event */
  contactName: Scalars['String']['output'];
  /** The email of the contact for the potential event */
  contactPhone: Scalars['String']['output'];
  /** If and when an event is created from a request, this is the event */
  event?: Maybe<Event>;
  /** The ID of the gig request */
  id: Scalars['Int']['output'];
  /** Where the event will be happening */
  location: Scalars['String']['output'];
  /** The name of the potential event */
  name: Scalars['String']['output'];
  /** The organization requesting a performance from the Glee Club */
  organization: Scalars['String']['output'];
  /** When the event will probably happen */
  startTime: DateTime;
  /** The current status of whether the request was accepted */
  status: GigRequestStatus;
  /** When the gig request was placed */
  time: DateTime;
};

/** The status of a gig request */
export enum GigRequestStatus {
  /** We have decided to take the request */
  Accepted = 'ACCEPTED',
  /** We have decided to decline the request */
  Dismissed = 'DISMISSED',
  /** We have not responded to the request yet */
  Pending = 'PENDING'
}

/** A change to a member's grade for a semester */
export type GradeChange = {
  __typename?: 'GradeChange';
  /** How much the grade changed */
  change: Scalars['Float']['output'];
  /** What the final grade was up to this event */
  partialScore: Scalars['Float']['output'];
  /** The reason the grade change was incurred */
  reason: Scalars['String']['output'];
};

/** The grades for a member in a semester */
export type Grades = {
  __typename?: 'Grades';
  /** The events of the semester, with the grade changes for those events */
  eventsWithChanges: Array<EventWithGradeChange>;
  /** The overall grade for the semester */
  grade: Scalars['Float']['output'];
  /** The volunteer gigs attended over the semester */
  volunteerGigsAttended: Array<Event>;
};

/** A type of media belonging to a song */
export type MediaType = {
  __typename?: 'MediaType';
  /** The name of the type of media */
  name: Scalars['String']['output'];
  /** The order of where this media type appears in a song's link section */
  order: Scalars['Int']['output'];
  /** The type of storage that this type of media points to */
  storage: StorageType;
};

/** A member in the Glee Club */
export type Member = {
  __typename?: 'Member';
  /** A short biography written by the member */
  about: Scalars['String']['output'];
  /** What year the member arrived at Georgia Tech */
  arrivedAtTech?: Maybe<Scalars['Int']['output']>;
  /** What conflicts with rehearsal the member may have */
  conflicts: Scalars['String']['output'];
  /** Any dietary restrictions the member may have */
  dietaryRestrictions: Scalars['String']['output'];
  /** The member's email, which must be unique */
  email: Scalars['String']['output'];
  /** The member's first name */
  firstName: Scalars['String']['output'];
  /** The member's full name */
  fullName: Scalars['String']['output'];
  /** What got them to join Glee Club */
  gatewayDrug: Scalars['String']['output'];
  /** The grades for the member in the given semester (default the current semester) */
  grades: Grades;
  /** Where the member came from */
  hometown: Scalars['String']['output'];
  /** The member's last name */
  lastName: Scalars['String']['output'];
  /** Where the member lives */
  location: Scalars['String']['output'];
  /** The member's academic major */
  major: Scalars['String']['output'];
  /** The member's academic minor */
  minor: Scalars['String']['output'];
  /** Whether the member lives on campus */
  onCampus: Scalars['Boolean']['output'];
  /** How many people the member can drive to events (besides themself) */
  passengers: Scalars['Int']['output'];
  /** The permissions currently held by the member */
  permissions: Array<MemberPermission>;
  /** The member's phone number */
  phoneNumber: Scalars['String']['output'];
  /** An optional link to a profile picture for the member */
  picture: Scalars['String']['output'];
  /** The officer positions currently held by the member */
  positions: Array<Role>;
  /** The member's nick name */
  preferredName?: Maybe<Scalars['String']['output']>;
  /** Info about the member from last semester, if they were active */
  previousSemester?: Maybe<ActiveSemester>;
  /** Info on the member for the current semester, if they are active */
  semester?: Maybe<ActiveSemester>;
  /** Info for each semester the member was active */
  semesters: Array<ActiveSemester>;
  /** All of the member's transactions for their entire time in Glee Club */
  transactions: Array<ClubTransaction>;
};


/** A member in the Glee Club */
export type MemberGradesArgs = {
  semester?: InputMaybe<Scalars['String']['input']>;
};

/** A permission that a member holds */
export type MemberPermission = {
  __typename?: 'MemberPermission';
  /** Optionally, the type of event the permission applies to */
  eventType?: Maybe<Scalars['String']['output']>;
  /** The name of the permission */
  name: Scalars['String']['output'];
};

/** A member that holds a role */
export type MemberRole = {
  __typename?: 'MemberRole';
  /** The member holding the role */
  member: Member;
  /** The name of the role being held */
  role: Scalars['String']['output'];
};

/** An update to a member in the Glee Club */
export type MemberUpdate = {
  /** A short biography written by the member */
  about: Scalars['String']['input'];
  /** What year the member arrived at Georgia Tech */
  arrivedAtTech?: InputMaybe<Scalars['Int']['input']>;
  /** What conflicts with rehearsal the member may have */
  conflicts: Scalars['String']['input'];
  /** Any dietary restrictions the member may have */
  dietaryRestrictions: Scalars['String']['input'];
  /**
   * The member's new email. If they choose a new one, it must not
   * be held by other members
   */
  email: Scalars['String']['input'];
  /** The new enrollment of the member */
  enrollment?: InputMaybe<Enrollment>;
  /** The member's first name */
  firstName: Scalars['String']['input'];
  /** What got them to join Glee Club */
  gatewayDrug: Scalars['String']['input'];
  /** Where the member came from */
  hometown: Scalars['String']['input'];
  /** The member's last name */
  lastName: Scalars['String']['input'];
  /** Where the member lives */
  location: Scalars['String']['input'];
  /** The member's academic major */
  major: Scalars['String']['input'];
  /** The member's academic minor */
  minor: Scalars['String']['input'];
  /** Whether the member lives on campus */
  onCampus: Scalars['Boolean']['input'];
  /** The member's password (MD5-encrypted), if they want to update it */
  passHash?: InputMaybe<Scalars['String']['input']>;
  /** How many people the member can drive to events (besides themself) */
  passengers: Scalars['Int']['input'];
  /** The member's phone number */
  phoneNumber: Scalars['String']['input'];
  /** An optional link to a profile picture for the member */
  picture: Scalars['String']['input'];
  /** The member's nick name */
  preferredName?: InputMaybe<Scalars['String']['input']>;
  /** The new voice section of the member */
  section?: InputMaybe<Scalars['String']['input']>;
};

/** Meeting minutes from officer meetings */
export type Minutes = {
  __typename?: 'Minutes';
  /** When these notes were initially created */
  date: Scalars['DateScalar']['output'];
  /** The ID of the meeting minutes */
  id: Scalars['Int']['output'];
  /** The name of the meeting */
  name: Scalars['String']['output'];
  /** The private, complete officer notes */
  private?: Maybe<Scalars['String']['output']>;
  /** The public, redacted notes visible by all members */
  public?: Maybe<Scalars['String']['output']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  /** Creates multiple transactions from the given batch */
  addBatchOfTransactions: Array<ClubTransaction>;
  /** Assign the given member the given officer position */
  addOfficership: Scalars['Boolean']['output'];
  /** Adds a permission to the given role */
  addPermissionToRole: Scalars['Boolean']['output'];
  /** Charge dues for the semester */
  chargeDues: Array<ClubTransaction>;
  /** Charges late dues for the semester (anyone who hasn't paid their due) */
  chargeLateDues: Array<ClubTransaction>;
  /** Confirms attendance for the given event */
  confirmForEvent: Attendance;
  /** Creates a new event */
  createEvent: Event;
  /** Creates a new document link */
  createLink: DocumentLink;
  /** Create some new meeting minutes */
  createMeetingMinutes: Minutes;
  /** Creates a new semester */
  createSemester: Semester;
  /** Creates a new song */
  createSong: Song;
  /** Creates a new song link */
  createSongLink: SongLink;
  /** Creates a new uniform */
  createUniform: Uniform;
  /** Deletes an event and returns its ID */
  deleteEvent: Scalars['Int']['output'];
  /** Deletes the given document link */
  deleteLink: DocumentLink;
  /** Deletes the given meeting minutes */
  deleteMeetingMinutes: Minutes;
  /** Deletes a member and returns their email */
  deleteMember: Scalars['String']['output'];
  /** Deletes the given song */
  deleteSong: Song;
  /** Deletes the given song link */
  deleteSongLink: SongLink;
  /** Deletes the given uniform */
  deleteUniform: Uniform;
  /** Dismisses a gig request */
  dismissGigRequest: GigRequest;
  /** Excuses all unconfirmed members at the given event */
  excuseUnconfirmedForEvent: Scalars['String']['output'];
  /** Requests a password reset email for the given member */
  forgotPassword: Scalars['String']['output'];
  /** Gets a login token on successful login */
  login: Scalars['String']['output'];
  /** Logs in as the given member */
  loginAs: Scalars['String']['output'];
  /** Logs the member out */
  logout: Scalars['String']['output'];
  /** Registers an existing member for the current semester */
  registerForSemester: Member;
  /** Registers a new member */
  registerMember: Member;
  /** Remove an officer position from the given mmember */
  removeOfficership: Scalars['Boolean']['output'];
  /** Removes a permission from the given role */
  removePermissionFromRole: Scalars['Boolean']['output'];
  /** Reopens a dismissed gig request */
  reopenGigRequest: GigRequest;
  /** Resets the member's password */
  resetPassword: Scalars['String']['output'];
  /** Resolves the given transaction */
  resolveTransaction: ClubTransaction;
  /** Responds to an absence request from the given member for the given event */
  respondToAbsenceRequest: AbsenceRequest;
  /** RSVP's for the given event */
  rsvpForEvent: Attendance;
  /** Set the given semester as the current semester */
  setCurrentSemester: Semester;
  /** Sets the given global variable */
  setVariable: Variable;
  /** Submits a new absence request for the current user at the given event */
  submitAbsenceRequest: AbsenceRequest;
  /** Submits a new gig request */
  submitGigRequest: GigRequest;
  /** Unsets the given variable and returns */
  unsetVariable: Scalars['String']['output'];
  /** Updates the attendance for the given member at the given event */
  updateAttendance: Attendance;
  /** Updates the carpools for the given event */
  updateCarpools: Array<Carpool>;
  /** Updates the given event */
  updateEvent: Event;
  /** Update the cost for the given fee */
  updateFeeAmount: Fee;
  /** Updates the given document link */
  updateLink: DocumentLink;
  /** Updates the given meeting minutes */
  updateMeetingMinutes: Minutes;
  /** Updates the given member's profile */
  updateMember: Member;
  /** Updates the current user's profile */
  updateProfile: Member;
  /** Updates the given semester */
  updateSemester: Semester;
  /** Updates the given song */
  updateSong: Song;
  /** Updates the given song link */
  updateSongLink: SongLink;
  /** Updates the given uniform */
  updateUniform: Uniform;
};


export type MutationRootAddBatchOfTransactionsArgs = {
  batch: TransactionBatch;
};


export type MutationRootAddOfficershipArgs = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationRootAddPermissionToRoleArgs = {
  rolePermission: NewRolePermission;
};


export type MutationRootConfirmForEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootCreateEventArgs = {
  gigRequestId?: InputMaybe<Scalars['Int']['input']>;
  newEvent: NewEvent;
};


export type MutationRootCreateLinkArgs = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationRootCreateMeetingMinutesArgs = {
  name: Scalars['String']['input'];
};


export type MutationRootCreateSemesterArgs = {
  newSemester: NewSemester;
};


export type MutationRootCreateSongArgs = {
  newSong: NewSong;
};


export type MutationRootCreateSongLinkArgs = {
  newLink: NewSongLink;
  songId: Scalars['Int']['input'];
};


export type MutationRootCreateUniformArgs = {
  newUniform: NewUniform;
};


export type MutationRootDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootDeleteLinkArgs = {
  name: Scalars['String']['input'];
};


export type MutationRootDeleteMeetingMinutesArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootDeleteMemberArgs = {
  email: Scalars['String']['input'];
};


export type MutationRootDeleteSongArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootDeleteSongLinkArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootDeleteUniformArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootDismissGigRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootExcuseUnconfirmedForEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationRootForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationRootLoginArgs = {
  email: Scalars['String']['input'];
  passHash: Scalars['String']['input'];
};


export type MutationRootLoginAsArgs = {
  email: Scalars['String']['input'];
};


export type MutationRootRegisterForSemesterArgs = {
  newSemester: RegisterForSemesterForm;
};


export type MutationRootRegisterMemberArgs = {
  newMember: NewMember;
};


export type MutationRootRemoveOfficershipArgs = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationRootRemovePermissionFromRoleArgs = {
  rolePermission: NewRolePermission;
};


export type MutationRootReopenGigRequestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootResetPasswordArgs = {
  passHash: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationRootResolveTransactionArgs = {
  id: Scalars['Int']['input'];
  resolved: Scalars['Boolean']['input'];
};


export type MutationRootRespondToAbsenceRequestArgs = {
  approved: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
};


export type MutationRootRsvpForEventArgs = {
  attending: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};


export type MutationRootSetCurrentSemesterArgs = {
  name: Scalars['String']['input'];
};


export type MutationRootSetVariableArgs = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationRootSubmitAbsenceRequestArgs = {
  eventId: Scalars['Int']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRootSubmitGigRequestArgs = {
  request: NewGigRequest;
};


export type MutationRootUnsetVariableArgs = {
  key: Scalars['String']['input'];
};


export type MutationRootUpdateAttendanceArgs = {
  email: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  update: AttendanceUpdate;
};


export type MutationRootUpdateCarpoolsArgs = {
  carpools: Array<UpdatedCarpool>;
  eventId: Scalars['Int']['input'];
};


export type MutationRootUpdateEventArgs = {
  id: Scalars['Int']['input'];
  newEvent: NewEvent;
};


export type MutationRootUpdateFeeAmountArgs = {
  amount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationRootUpdateLinkArgs = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationRootUpdateMeetingMinutesArgs = {
  id: Scalars['Int']['input'];
  update: UpdatedMeetingMinutes;
};


export type MutationRootUpdateMemberArgs = {
  email: Scalars['String']['input'];
  newMember: MemberUpdate;
};


export type MutationRootUpdateProfileArgs = {
  newMember: MemberUpdate;
};


export type MutationRootUpdateSemesterArgs = {
  name: Scalars['String']['input'];
  update: NewSemester;
};


export type MutationRootUpdateSongArgs = {
  id: Scalars['Int']['input'];
  update: SongUpdate;
};


export type MutationRootUpdateSongLinkArgs = {
  id: Scalars['Int']['input'];
  update: SongLinkUpdate;
};


export type MutationRootUpdateUniformArgs = {
  id: Scalars['Int']['input'];
  update: NewUniform;
};

/** A new event, broken into different groups of fields */
export type NewEvent = {
  /** The event fields */
  event: NewEventFields;
  /** The gig fields, if this event is a gig */
  gig?: InputMaybe<NewGig>;
  /** How often to optionally repeat the event */
  repeat?: InputMaybe<NewEventPeriod>;
};

/** The event-specific fields on a new event */
export type NewEventFields = {
  /** When members are expected to arrive to the event */
  callTime: DateTimeInput;
  /** General information or details about this event */
  comments?: InputMaybe<Scalars['String']['input']>;
  /** Whether members are assumed to attend (we assume as much for most events) */
  defaultAttend: Scalars['Boolean']['input'];
  /** Whether this event counts toward the volunteer gig count for the semester */
  gigCount?: InputMaybe<Scalars['Boolean']['input']>;
  /** Where this event will be held */
  location?: InputMaybe<Scalars['String']['input']>;
  /** The name of the event */
  name: Scalars['String']['input'];
  /** How many points attendance of this event is worth */
  points: Scalars['Int']['input'];
  /** When members are probably going to be released */
  releaseTime?: InputMaybe<DateTimeInput>;
  /** The name of the semester this event belongs to */
  semester: Scalars['String']['input'];
  /** The type of the event (see EventType) */
  type: Scalars['String']['input'];
};

/** How often an event should repeat and until when */
export type NewEventPeriod = {
  /** How many days between repeat events */
  period: Period;
  /** The last date the event will repeat until */
  repeatUntil: Scalars['DateScalar']['input'];
};

/** A new gig attached to a new event created from a gig request */
export type NewGig = {
  /** The email of the contact for the gig */
  contactEmail: Scalars['String']['input'];
  /** The name of the contact for the gig */
  contactName: Scalars['String']['input'];
  /** The phone number of the contact for the gig */
  contactPhone: Scalars['String']['input'];
  /** A short description for the event on our external site */
  description: Scalars['String']['input'];
  /** When we will start performing */
  performanceTime: Scalars['TimeScalar']['input'];
  /** How much we are charging for the gig */
  price?: InputMaybe<Scalars['Int']['input']>;
  /** Whether we will show this gig on our external site */
  public: Scalars['Boolean']['input'];
  /** A title for the event on our external site */
  summary: Scalars['String']['input'];
  /** The ID of the uniform for the gig */
  uniform: Scalars['Int']['input'];
};

/** A new gig request */
export type NewGigRequest = {
  /** Any comments about the event */
  comments: Scalars['String']['input'];
  /** The email of the contact for the potential event */
  contactEmail: Scalars['String']['input'];
  /** The name of the contact for the potential event */
  contactName: Scalars['String']['input'];
  /** The phone number of the contact for the potential event */
  contactPhone: Scalars['String']['input'];
  /** Where the event will be happening */
  location: Scalars['String']['input'];
  /** The name of the potential event */
  name: Scalars['String']['input'];
  /** The organization requesting a performance from the Glee Club */
  organization: Scalars['String']['input'];
  /** When the event will probably happen */
  startTime: DateTimeInput;
};

/** A new member in the Glee Club */
export type NewMember = {
  /** A short biography written by the member */
  about: Scalars['String']['input'];
  /** What year the member arrived at Georgia Tech */
  arrivedAtTech?: InputMaybe<Scalars['Int']['input']>;
  /** What conflicts with rehearsal the member may have */
  conflicts: Scalars['String']['input'];
  /** Any dietary restrictions the member may have */
  dietaryRestrictions: Scalars['String']['input'];
  /** The new member's email, which must be unique */
  email: Scalars['String']['input'];
  /** Whether the member will be in the class or club */
  enrollment: Enrollment;
  /** The member's first name */
  firstName: Scalars['String']['input'];
  /** What got them to join Glee Club */
  gatewayDrug: Scalars['String']['input'];
  /** Where the member came from */
  hometown: Scalars['String']['input'];
  /** The member's last name */
  lastName: Scalars['String']['input'];
  /** Where the member lives */
  location: Scalars['String']['input'];
  /** The member's academic major */
  major: Scalars['String']['input'];
  /** The member's academic minor */
  minor: Scalars['String']['input'];
  /** Whether the member lives on campus */
  onCampus: Scalars['Boolean']['input'];
  /** The member's password, MD5-encrypted */
  passHash: Scalars['String']['input'];
  /** How many people the member can drive to events (besides themself) */
  passengers: Scalars['Int']['input'];
  /** The member's phone number */
  phoneNumber: Scalars['String']['input'];
  /** An optional link to a profile picture for the member */
  picture: Scalars['String']['input'];
  /** The member's nick name */
  preferredName?: InputMaybe<Scalars['String']['input']>;
  /** What voice section the member will sing in */
  section?: InputMaybe<Scalars['String']['input']>;
};

/** A new assignment of a permission to a role */
export type NewRolePermission = {
  /** Optionally, the type of the event the permission applies to */
  eventType?: InputMaybe<Scalars['String']['input']>;
  /** The name of the permission the role is awarded */
  permission: Scalars['String']['input'];
  /** The name of the role this junction refers to */
  role: Scalars['String']['input'];
};

/** A new semester for events */
export type NewSemester = {
  /** When the new semester will end */
  endDate: Scalars['DateScalar']['input'];
  /** How many gigs are required for members to attend during this semester */
  gigRequirement: Scalars['Int']['input'];
  /** The name of the new semester */
  name: Scalars['String']['input'];
  /** When the new semester will start */
  startDate: Scalars['DateScalar']['input'];
};

/** A new song for the club to perform */
export type NewSong = {
  /** A description of the song */
  info?: InputMaybe<Scalars['String']['input']>;
  /** The name of the new song */
  title: Scalars['String']['input'];
};

/** A new link to media under a song */
export type NewSongLink = {
  /** The content of the link */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The name of the resource */
  name: Scalars['String']['input'];
  /** The type of the media */
  type: Scalars['String']['input'];
  /** A link to the media */
  url: Scalars['String']['input'];
};

/** A new uniform type */
export type NewUniform = {
  /** The color to display for the uniform */
  color?: InputMaybe<Scalars['UniformColor']['input']>;
  /** A description of the uniform */
  description: Scalars['String']['input'];
  /** The name of the new uniform */
  name: Scalars['String']['input'];
};

/** How often an event repeats */
export enum Period {
  /** The event repeat every two weeks */
  Biweekly = 'BIWEEKLY',
  /** The event repeat every day */
  Daily = 'DAILY',
  /** The event repeats every thirty days */
  Monthly = 'MONTHLY',
  /** The event repeat every week */
  Weekly = 'WEEKLY',
  /** The event repeats every year */
  Yearly = 'YEARLY'
}

/** A permission that grants abilities to a member */
export type Permission = {
  __typename?: 'Permission';
  /** A description of what the permission entails */
  description?: Maybe<Scalars['String']['output']>;
  /** The name of the permission */
  name: Scalars['String']['output'];
  /** Whether the permission applies to a type of event or generally */
  type: PermissionType;
};

/** Whether a permission applies to a specific event type or not */
export enum PermissionType {
  /** The permission applies for a specific type of event */
  Event = 'EVENT',
  /** The permission applies globally */
  Static = 'STATIC'
}

/** A musical note */
export enum Pitch {
  A = 'A',
  AFlat = 'A_FLAT',
  ASharp = 'A_SHARP',
  B = 'B',
  BFlat = 'B_FLAT',
  BSharp = 'B_SHARP',
  C = 'C',
  CFlat = 'C_FLAT',
  CSharp = 'C_SHARP',
  D = 'D',
  DFlat = 'D_FLAT',
  DSharp = 'D_SHARP',
  E = 'E',
  EFlat = 'E_FLAT',
  ESharp = 'E_SHARP',
  F = 'F',
  FFlat = 'F_FLAT',
  FSharp = 'F_SHARP',
  G = 'G',
  GFlat = 'G_FLAT',
  GSharp = 'G_SHARP'
}

/** Events that are visible to the public */
export type PublicEvent = {
  __typename?: 'PublicEvent';
  /** A short description of the event */
  description: Scalars['String']['output'];
  /** When this event will end */
  endTime?: Maybe<DateTime>;
  /** The ID of the event */
  id: Scalars['Int']['output'];
  /** An invite to add this event to your calendar */
  invite: Scalars['String']['output'];
  /** The location of the event */
  location: Scalars['String']['output'];
  /** The name of the event */
  name: Scalars['String']['output'];
  /** When this event will start */
  startTime: DateTime;
  /** A short summary of the event */
  summary: Scalars['String']['output'];
};

/** A song that is visible on the external site */
export type PublicSong = {
  __typename?: 'PublicSong';
  /** Whether the song is in the current club repertoire */
  current: Scalars['Boolean']['output'];
  /** The title of the song */
  title: Scalars['String']['output'];
  /** Links to YouTube performances of this song by the Glee Club */
  videos: Array<PublicVideo>;
};

/** A YouTube performance of a song by the Glee Club */
export type PublicVideo = {
  __typename?: 'PublicVideo';
  /** The name of the song */
  title: Scalars['String']['output'];
  /** A link to the performance on YouTube */
  url: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  /** All absence requests for the current semester */
  absenceRequests: Array<AbsenceRequest>;
  /** All meeting minutes */
  allMeetingMinutes: Array<Minutes>;
  /** The current role permissions */
  currentPermissions: Array<RolePermission>;
  /** The current semester */
  currentSemester: Semester;
  /** The event with the given ID */
  event: Event;
  /** All events in the current semester */
  events: Array<Event>;
  /** All fees */
  fees: Array<Fee>;
  /** The gig request with the given ID */
  gigRequest: GigRequest;
  /** All gig requests made this semester and other unresolved requests */
  gigRequests: Array<GigRequest>;
  /** All document links */
  links: Array<DocumentLink>;
  /** The meeting minutes with the given ID */
  meetingMinutes: Minutes;
  /** The member with the given email */
  member: Member;
  /** All members registered on the site. Only loads active members by default */
  members: Array<Member>;
  /** All current officers */
  officers: Array<MemberRole>;
  /** All events visible on the external site */
  publicEvents: Array<PublicEvent>;
  /** All songs visible on the external site */
  publicSongs: Array<PublicSong>;
  /** The semester with the given name */
  semester: Semester;
  /** All semesters */
  semesters: Array<Semester>;
  /** The song with the given ID */
  song: Song;
  /** The song link with the given ID */
  songLink: SongLink;
  /** All songs in our repertoire */
  songs: Array<Song>;
  /** The static data for the site */
  static: StaticData;
  /** All transactions for this semester */
  transactions: Array<ClubTransaction>;
  /** The uniform with the given ID */
  uniform: Uniform;
  /** All uniforms */
  uniforms: Array<Uniform>;
  /** The current user, if they are logged in */
  user?: Maybe<Member>;
  /** The variable with the given key */
  variable: Variable;
};


export type QueryRootEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootGigRequestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootMeetingMinutesArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootMemberArgs = {
  email: Scalars['String']['input'];
};


export type QueryRootMembersArgs = {
  includeClass?: Scalars['Boolean']['input'];
  includeClub?: Scalars['Boolean']['input'];
  includeInactive?: Scalars['Boolean']['input'];
};


export type QueryRootSemesterArgs = {
  name: Scalars['String']['input'];
};


export type QueryRootSongArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSongLinkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootUniformArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootVariableArgs = {
  key: Scalars['String']['input'];
};

/** The info needed for a member to register for a new semester */
export type RegisterForSemesterForm = {
  /** Any conflicts the member has */
  conflicts: Scalars['String']['input'];
  /** Any dietary restrictions the member has */
  dietaryRestrictions: Scalars['String']['input'];
  /** Whether the member is in the class or the club */
  enrollment: Enrollment;
  /** Where the member lives */
  location: Scalars['String']['input'];
  /** Whether the member lives on-campus */
  onCampus: Scalars['Boolean']['input'];
  /** What voice section the member will sing in */
  section: Scalars['String']['input'];
};

/** Roles that can be held by members to grant permissions */
export type Role = {
  __typename?: 'Role';
  /**
   * The maximum number of the position allowed to be held at once.
   * If it is 0 or less, no maximum is enforced
   */
  maxQuantity: Scalars['Int']['output'];
  /** The name of the role */
  name: Scalars['String']['output'];
  /** Used for ordering the positions (e.g. President beforee Ombudsman) */
  rank: Scalars['Int']['output'];
};

/** A permissin that is inherited by a role */
export type RolePermission = {
  __typename?: 'RolePermission';
  /** Optionally, the type of the event the permission applies to */
  eventType?: Maybe<Scalars['String']['output']>;
  /** The ID of the role permission */
  id: Scalars['Int']['output'];
  /** The name of the permission the role is awarded */
  permission: Scalars['String']['output'];
  /** The name of the role this junction refers to */
  role: Scalars['String']['output'];
};

/** A voice section members sing in */
export type SectionType = {
  __typename?: 'SectionType';
  /** The name of the section (Tenor, Baritone, etc.) */
  name: Scalars['String']['output'];
};

/** A school semester that events happen during */
export type Semester = {
  __typename?: 'Semester';
  /** Whether this is the current semester */
  current: Scalars['Boolean']['output'];
  /** When the semester ends */
  endDate: Scalars['DateScalar']['output'];
  /** How many volunteer gigs are required for the semester (default: 5) */
  gigRequirement: Scalars['Int']['output'];
  /** The name of the semester */
  name: Scalars['String']['output'];
  /** When the semester starts */
  startDate: Scalars['DateScalar']['output'];
};

/** A song that the Glee Club performs */
export type Song = {
  __typename?: 'Song';
  /** Whether it is in this semester's repertoire */
  current: Scalars['Boolean']['output'];
  /** The ID of the song */
  id: Scalars['Int']['output'];
  /**
   * Any information related to the song
   * (minor changes to the music, who wrote it, soloists, etc.)
   */
  info: Scalars['String']['output'];
  /** The key of the song */
  key?: Maybe<Pitch>;
  /** The sorted sections of links belonging to the song */
  linkSections: Array<SongLinkSection>;
  /** The mode of the song (Major or Minor) */
  mode?: Maybe<SongMode>;
  /** The starting pitch for the song */
  startingPitch?: Maybe<Pitch>;
  /** The title of the song */
  title: Scalars['String']['output'];
};

/** A link to some media under a song */
export type SongLink = {
  __typename?: 'SongLink';
  /** The ID of the song link */
  id: Scalars['Int']['output'];
  /** The name of this link */
  name: Scalars['String']['output'];
  /** The ID of the song this link belongs to */
  song: Scalars['Int']['output'];
  /** The type of this link (e.g. MIDI) */
  type: Scalars['String']['output'];
  /** The URL this link points to */
  url: Scalars['String']['output'];
};

/** A group of links to resources for a song */
export type SongLinkSection = {
  __typename?: 'SongLinkSection';
  /** The links in this group */
  links: Array<SongLink>;
  /** The name of the link group */
  name: Scalars['String']['output'];
};

/** An update to a song link */
export type SongLinkUpdate = {
  /** The new name of the link */
  name: Scalars['String']['input'];
  /** The new URL for the link */
  url: Scalars['String']['input'];
};

/** Whether a song is in major or minor */
export enum SongMode {
  /** The song is in a major key */
  Major = 'MAJOR',
  /** The song is in a minor key */
  Minor = 'MINOR'
}

/** An update to an existing song */
export type SongUpdate = {
  /** Whether the song is in the club's current repertoire */
  current: Scalars['Boolean']['input'];
  /** A description of the song */
  info: Scalars['String']['input'];
  /** The key of the song */
  key?: InputMaybe<Pitch>;
  /** Whether the song is in major or minor */
  mode?: InputMaybe<SongMode>;
  /** The pitch the song starts on */
  startingPitch?: InputMaybe<Pitch>;
  /** The new name for the song */
  title: Scalars['String']['input'];
};

/** A collection of static data */
export type StaticData = {
  __typename?: 'StaticData';
  /** All types of events */
  eventTypes: Array<EventType>;
  /** The types of media available for song links */
  mediaTypes: Array<MediaType>;
  /** All permissions used by the site */
  permissions: Array<Permission>;
  /** All officer roles */
  roles: Array<Role>;
  /** All voice sections members can sing in */
  sections: Array<SectionType>;
  /** All types of transactions */
  transactionTypes: Array<TransactionType>;
};

/** Whether a media item is a link or a local file */
export enum StorageType {
  /** The item is stored locally */
  Local = 'LOCAL',
  /** The item is a link to an external resource */
  Remote = 'REMOTE'
}

/** A batch of transactions to charge to multiple members */
export type TransactionBatch = {
  /** The amount to charge each member */
  amount: Scalars['Int']['input'];
  /** A description of the purpose of the transaction */
  description: Scalars['String']['input'];
  /** The emails of the members */
  members: Array<Scalars['String']['input']>;
  /** The type of the transaction */
  type: Scalars['String']['input'];
};

/** A type of transaction */
export type TransactionType = {
  __typename?: 'TransactionType';
  /** The name of the type of transaction */
  name: Scalars['String']['output'];
};

/** A uniform members might need to wear for an event */
export type Uniform = {
  __typename?: 'Uniform';
  /** The associated color (In the format #HHH, H being a hex digit) */
  color?: Maybe<Scalars['UniformColor']['output']>;
  /** The explanation of what to wear when wearing the uniform */
  description: Scalars['String']['output'];
  /** The ID of the uniform */
  id: Scalars['Int']['output'];
  /** The name of the uniform */
  name: Scalars['String']['output'];
};

/** An updated carpool */
export type UpdatedCarpool = {
  /** The email of the driver */
  driver: Scalars['String']['input'];
  /** The emails of the passengers */
  passengers: Array<Scalars['String']['input']>;
};

/** An update for some meeting minutes */
export type UpdatedMeetingMinutes = {
  /** The name of the meeting */
  name: Scalars['String']['input'];
  /** The full version of the meeting minutes */
  private?: InputMaybe<Scalars['String']['input']>;
  /** The redacted version of the meeting minutes */
  public: Scalars['String']['input'];
};

/** Arbitrary variables for developer usage. */
export type Variable = {
  __typename?: 'Variable';
  /** The name of the variable. */
  key: Scalars['String']['output'];
  /** The value of the variable. */
  value: Scalars['String']['output'];
};
