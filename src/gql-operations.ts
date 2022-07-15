import type { OperationStore } from '@urql/svelte';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GqlDate: string;
  GqlDateTime: string;
  UniformColor: string;
};

export type AbsenceRequest = {
  __typename?: 'AbsenceRequest';
  /** The event they requested absence from */
  event: Event;
  /** The member that requested an absence */
  member: Member;
  /** The reason the member petitioned for absence with */
  reason: Scalars['String'];
  /** The current state of the request */
  state: AbsenceRequestStatus;
  /** The time this request was placed */
  time: Scalars['GqlDateTime'];
};

export enum AbsenceRequestStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING'
}

export type ActiveSemester = {
  __typename?: 'ActiveSemester';
  /** Whether the member was registered for the class */
  enrollment: Enrollment;
  /** The grades for the member in the given semester */
  grades: Grades;
  /** The email of the member */
  member: Scalars['String'];
  /** What section the member sang in */
  section?: Maybe<Scalars['String']>;
  /** The name of the semester */
  semester: Scalars['String'];
};

export type Attendance = {
  __typename?: 'Attendance';
  /** The absence request made by the current member, if they requested one */
  absenceRequest?: Maybe<AbsenceRequest>;
  /** Whether the absence is approved */
  approvedAbsence: Scalars['Boolean'];
  /** Whether the member confirmed that they would attend */
  confirmed: Scalars['Boolean'];
  /** If credit for attending the event should be denied */
  denyCredit: Scalars['Boolean'];
  /** Whether the member did attend the event */
  didAttend: Scalars['Boolean'];
  /** The email of the member this attendance belongs to */
  member: Member;
  /** How late the member was if they attended */
  minutesLate: Scalars['Int'];
  /** If the member is not allowed to RSVP, this is why */
  rsvpIssue?: Maybe<Scalars['String']>;
  /** Whether the member is expected to attend the event */
  shouldAttend: Scalars['Boolean'];
};

export type AttendanceUpdate = {
  confirmed: Scalars['Boolean'];
  didAttend: Scalars['Boolean'];
  minutesLate: Scalars['Int'];
  shouldAttend: Scalars['Boolean'];
};

export type Carpool = {
  __typename?: 'Carpool';
  /** The driver of the carpool */
  driver: Member;
  /** The event it belongs to */
  event: Scalars['Int'];
  /** The ID of the carpool */
  id: Scalars['Int'];
  /** The passengers of the carpool */
  passengers: Array<Member>;
};

export type ClubTransaction = {
  __typename?: 'ClubTransaction';
  /** How much this transaction was for */
  amount: Scalars['Int'];
  /** A description of what the member was charged for specifically */
  description: Scalars['String'];
  /** The ID of the transaction */
  id: Scalars['Int'];
  /** The member this transaction was charged to */
  member: Member;
  /** Whether the member has paid the amount requested in this transaction */
  resolved: Scalars['Boolean'];
  /** Optionally, the name of the semester this tranaction was made during */
  semester?: Maybe<Scalars['String']>;
  /** When this transaction was charged */
  time: Scalars['GqlDateTime'];
  /** The name of the type of transaction */
  type: Scalars['String'];
};

/** A link to a Google Doc or other important document. */
export type DocumentLink = {
  __typename?: 'DocumentLink';
  /** The name of the link */
  name: Scalars['String'];
  /** The link itself */
  url: Scalars['String'];
};

export enum Enrollment {
  Class = 'CLASS',
  Club = 'CLUB'
}

export type Event = {
  __typename?: 'Event';
  allAttendance: Array<Attendance>;
  /** The attendance for a specific member at this event */
  attendance: Attendance;
  /** When members are expected to arrive to the event */
  callTime: Scalars['GqlDateTime'];
  carpools: Array<Carpool>;
  /** General information or details about this event */
  comments?: Maybe<Scalars['String']>;
  /** Whether members are assumed to attend (we assume as much for most events) */
  defaultAttend: Scalars['Boolean'];
  /** The gig for this event, if it is a gig */
  gig?: Maybe<Gig>;
  /** Whether this event counts toward the volunteer gig count for the semester */
  gigCount: Scalars['Boolean'];
  /** The ID of the event */
  id: Scalars['Int'];
  /** Where this event will be held */
  location?: Maybe<Scalars['String']>;
  /** The name of the event */
  name: Scalars['String'];
  /** How many points attendance of this event is worth */
  points: Scalars['Int'];
  /** When members are probably going to be released */
  releaseTime?: Maybe<Scalars['GqlDateTime']>;
  /** The name of the semester this event belongs to */
  semester: Scalars['String'];
  setlist: Array<Song>;
  /** The type of the event (see EventType) */
  type: Scalars['String'];
  /** The attendance for the current user at this event */
  userAttendance?: Maybe<Attendance>;
};


export type EventAllAttendanceArgs = {
  emptyIfNotPermitted?: Scalars['Boolean'];
};


export type EventAttendanceArgs = {
  member: Scalars['String'];
};

export type EventType = {
  __typename?: 'EventType';
  /** The name of the type of event */
  name: Scalars['String'];
  /** The amount of points this event is normally worth */
  weight: Scalars['Int'];
};

export type EventWithGradeChange = {
  __typename?: 'EventWithGradeChange';
  /** What grade change occurred, for what reason */
  change: GradeChange;
  /** The event a grade was received for */
  event: Event;
};

export type Fee = {
  __typename?: 'Fee';
  /** The amount to charge members */
  amount: Scalars['Int'];
  /** A longer description of what it is charging members for */
  description: Scalars['String'];
  /** The short name of the fee */
  name: Scalars['String'];
};

export type Gig = {
  __typename?: 'Gig';
  /** The email of the contact for this gig */
  contactEmail?: Maybe<Scalars['String']>;
  /** The name of the contact for this gig */
  contactName?: Maybe<Scalars['String']>;
  /** The phone number of the contact for this gig */
  contactPhone?: Maybe<Scalars['String']>;
  /** A description of this event for the external site (if it is public) */
  description?: Maybe<Scalars['String']>;
  /** The ID of the event this gig belongs to */
  event: Scalars['Int'];
  /** When members are expected to actually perform */
  performanceTime: Scalars['GqlDateTime'];
  /** The price we are charging for this gig */
  price?: Maybe<Scalars['Int']>;
  /** Whether this gig is visible on the external website */
  public: Scalars['Boolean'];
  /** A summary of this event for the external site (if it is public) */
  summary?: Maybe<Scalars['String']>;
  /** The uniform for this gig */
  uniform: Uniform;
};

export type GigRequest = {
  __typename?: 'GigRequest';
  /** Any comments about the event */
  comments?: Maybe<Scalars['String']>;
  /** The phone number of the contact for the potential event */
  contactEmail: Scalars['String'];
  /** The name of the contact for the potential event */
  contactName: Scalars['String'];
  /** The email of the contact for the potential event */
  contactPhone: Scalars['String'];
  /** If and when an event is created from a request, this is the event */
  event?: Maybe<Event>;
  /** The ID of the gig request */
  id: Scalars['Int'];
  /** Where the event will be happening */
  location: Scalars['String'];
  /** The name of the potential event */
  name: Scalars['String'];
  /** The organization requesting a performance from the Glee Club */
  organization: Scalars['String'];
  /** When the event will probably happen */
  startTime: Scalars['GqlDateTime'];
  /** The current status of whether the request was accepted */
  status: GigRequestStatus;
  /** When the gig request was placed */
  time: Scalars['GqlDateTime'];
};

export enum GigRequestStatus {
  Accepted = 'ACCEPTED',
  Dismissed = 'DISMISSED',
  Pending = 'PENDING'
}

export type GradeChange = {
  __typename?: 'GradeChange';
  /** How much the grade changed */
  change: Scalars['Float'];
  /** What the final grade was up to this event */
  partialScore: Scalars['Float'];
  /** The reason the grade change was incurred */
  reason: Scalars['String'];
};

export type Grades = {
  __typename?: 'Grades';
  /** The events of the semester, with the grade changes for those events */
  eventsWithChanges: Array<EventWithGradeChange>;
  /** The overall grade for the semester */
  grade: Scalars['Float'];
  /** The volunteer gigs attended over the semester */
  volunteerGigsAttended: Array<Event>;
};

export type MediaType = {
  __typename?: 'MediaType';
  /** The name of the type of media */
  name: Scalars['String'];
  /** The order of where this media type appears in a song's link section */
  order: Scalars['Int'];
  /** The type of storage that this type of media points to */
  storage: StorageType;
};

export type Member = {
  __typename?: 'Member';
  /** A short biography written by the member */
  about?: Maybe<Scalars['String']>;
  /** What year the member arrived at Georgia Tech */
  arrivedAtTech?: Maybe<Scalars['Int']>;
  /** What conflicts with rehearsal the member may have */
  conflicts?: Maybe<Scalars['String']>;
  /** Any dietary restrictions the member may have */
  dietaryRestrictions?: Maybe<Scalars['String']>;
  /** The member's email, which must be unique */
  email: Scalars['String'];
  /** The member's first name */
  firstName: Scalars['String'];
  /** The member's full name */
  fullName: Scalars['String'];
  /** What got them to join Glee Club */
  gatewayDrug?: Maybe<Scalars['String']>;
  /** The grades for the member in the given semester (default the current semester) */
  grades: Grades;
  /** Where the member came from */
  hometown?: Maybe<Scalars['String']>;
  /** The member's last name */
  lastName: Scalars['String'];
  /** Where the member lives */
  location: Scalars['String'];
  /** The member's academic major */
  major?: Maybe<Scalars['String']>;
  /** The member's academic minor */
  minor?: Maybe<Scalars['String']>;
  /** Whether the member lives on campus */
  onCampus?: Maybe<Scalars['Boolean']>;
  /** How many people the member can drive to events (besides themself) */
  passengers: Scalars['Int'];
  /** The permissions currently held by the member */
  permissions: Array<MemberPermission>;
  /** The member's phone number */
  phoneNumber: Scalars['String'];
  /** An optional link to a profile picture for the member */
  picture?: Maybe<Scalars['String']>;
  /** The officer positions currently held by the member */
  positions: Array<Role>;
  /** The member's nick name */
  preferredName?: Maybe<Scalars['String']>;
  previousSemester?: Maybe<ActiveSemester>;
  /** The semester TODO */
  semester?: Maybe<ActiveSemester>;
  /** The semester TODO */
  semesters: Array<ActiveSemester>;
  /** All of the member's transactions for their entire time in Glee Club */
  transactions: Array<ClubTransaction>;
};


export type MemberGradesArgs = {
  semester?: InputMaybe<Scalars['String']>;
};

export type MemberPermission = {
  __typename?: 'MemberPermission';
  /** Optionally, the type of event the permission applies to */
  eventType?: Maybe<Scalars['String']>;
  /** The name of the permission */
  name: Scalars['String'];
};

export type MemberRole = {
  __typename?: 'MemberRole';
  /** The member holding the role */
  member: Member;
  /** The name of the role being held */
  role: Scalars['String'];
};

export type MemberUpdate = {
  about?: InputMaybe<Scalars['String']>;
  arrivedAtTech?: InputMaybe<Scalars['Int']>;
  conflicts?: InputMaybe<Scalars['String']>;
  dietaryRestrictions?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  enrollment?: InputMaybe<Enrollment>;
  firstName: Scalars['String'];
  gatewayDrug?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  location: Scalars['String'];
  major?: InputMaybe<Scalars['String']>;
  minor?: InputMaybe<Scalars['String']>;
  onCampus: Scalars['Boolean'];
  passHash?: InputMaybe<Scalars['String']>;
  passengers: Scalars['Int'];
  phoneNumber: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
  preferredName?: InputMaybe<Scalars['String']>;
  section?: InputMaybe<Scalars['String']>;
};

export type Minutes = {
  __typename?: 'Minutes';
  /** When these notes were initially created */
  date: Scalars['GqlDate'];
  /** The ID of the meeting minutes */
  id: Scalars['Int'];
  /** The name of the meeting */
  name: Scalars['String'];
  /** The private, complete officer notes */
  private?: Maybe<Scalars['String']>;
  /** The public, redacted notes visible by all members */
  public?: Maybe<Scalars['String']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  addBatchOfTransactions: Array<ClubTransaction>;
  addOfficership: Scalars['Boolean'];
  addPermissionToRole: Scalars['Boolean'];
  chargeDues: Array<ClubTransaction>;
  chargeLateDues: Array<ClubTransaction>;
  confirmForEvent: Attendance;
  createEvent: Event;
  createLink: DocumentLink;
  createMeetingMinutes: Minutes;
  createSemester: Semester;
  createSong: Song;
  createSongLink: SongLink;
  createUniform: Uniform;
  /** Deletes an event and returns its ID */
  deleteEvent: Scalars['Int'];
  deleteLink: DocumentLink;
  deleteMeetingMinutes: Minutes;
  /** Deletes a member and returns their email */
  deleteMember: Scalars['String'];
  deleteSong: Song;
  deleteSongLink: SongLink;
  deleteUniform: Uniform;
  dismissGigRequest: GigRequest;
  emailMeetingMinutes: Minutes;
  excuseUnconfirmedForEvent: Scalars['String'];
  forgotPassword: Scalars['String'];
  /** Gets a login token on successful login */
  login: Scalars['String'];
  loginAs: Scalars['String'];
  /** Logs the member out */
  logout: Scalars['String'];
  registerForSemester: Member;
  registerMember: Member;
  removeOfficership: Scalars['Boolean'];
  removePermissionFromRole: Scalars['Boolean'];
  reopenGigRequest: GigRequest;
  resetPassword: Scalars['String'];
  resolveTransaction: ClubTransaction;
  respondToAbsenceRequest: AbsenceRequest;
  rsvpForEvent: Attendance;
  setCurrentSemester: Semester;
  setVariable: Variable;
  submitAbsenceRequest: AbsenceRequest;
  submitGigRequest: GigRequest;
  unsetVariable: Scalars['String'];
  updateAttendance: Attendance;
  updateCarpools: Array<Carpool>;
  updateEvent: Event;
  updateFeeAmount: Fee;
  updateLink: DocumentLink;
  updateMeetingMinutes: Minutes;
  updateMember: Member;
  updateProfile: Member;
  updateSemester: Semester;
  updateSong: Song;
  updateSongLink: SongLink;
  updateUniform: Uniform;
};


export type MutationRootAddBatchOfTransactionsArgs = {
  batch: TransactionBatch;
};


export type MutationRootAddOfficershipArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};


export type MutationRootAddPermissionToRoleArgs = {
  rolePermission: NewRolePermission;
};


export type MutationRootConfirmForEventArgs = {
  id: Scalars['Int'];
};


export type MutationRootCreateEventArgs = {
  gigRequestId?: InputMaybe<Scalars['Int']>;
  newEvent: NewEvent;
};


export type MutationRootCreateLinkArgs = {
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationRootCreateMeetingMinutesArgs = {
  name: Scalars['String'];
};


export type MutationRootCreateSemesterArgs = {
  newSemester: NewSemester;
};


export type MutationRootCreateSongArgs = {
  newSong: NewSong;
};


export type MutationRootCreateSongLinkArgs = {
  newLink: NewSongLink;
  songId: Scalars['Int'];
};


export type MutationRootCreateUniformArgs = {
  newUniform: NewUniform;
};


export type MutationRootDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationRootDeleteLinkArgs = {
  name: Scalars['String'];
};


export type MutationRootDeleteMeetingMinutesArgs = {
  id: Scalars['Int'];
};


export type MutationRootDeleteMemberArgs = {
  email: Scalars['String'];
};


export type MutationRootDeleteSongArgs = {
  id: Scalars['Int'];
};


export type MutationRootDeleteSongLinkArgs = {
  id: Scalars['Int'];
};


export type MutationRootDeleteUniformArgs = {
  id: Scalars['Int'];
};


export type MutationRootDismissGigRequestArgs = {
  id: Scalars['Int'];
};


export type MutationRootEmailMeetingMinutesArgs = {
  id: Scalars['Int'];
};


export type MutationRootExcuseUnconfirmedForEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationRootForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRootLoginArgs = {
  email: Scalars['String'];
  passHash: Scalars['String'];
};


export type MutationRootLoginAsArgs = {
  email: Scalars['String'];
};


export type MutationRootRegisterForSemesterArgs = {
  newSemester: RegisterForSemesterForm;
};


export type MutationRootRegisterMemberArgs = {
  newMember: NewMember;
};


export type MutationRootRemoveOfficershipArgs = {
  email: Scalars['String'];
  role: Scalars['String'];
};


export type MutationRootRemovePermissionFromRoleArgs = {
  rolePermission: NewRolePermission;
};


export type MutationRootReopenGigRequestArgs = {
  id: Scalars['Int'];
};


export type MutationRootResetPasswordArgs = {
  passHash: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRootResolveTransactionArgs = {
  id: Scalars['Int'];
  resolved: Scalars['Boolean'];
};


export type MutationRootRespondToAbsenceRequestArgs = {
  approved: Scalars['Boolean'];
  email: Scalars['String'];
  eventId: Scalars['Int'];
};


export type MutationRootRsvpForEventArgs = {
  attending: Scalars['Boolean'];
  id: Scalars['Int'];
};


export type MutationRootSetCurrentSemesterArgs = {
  name: Scalars['String'];
};


export type MutationRootSetVariableArgs = {
  key: Scalars['String'];
  value: Scalars['String'];
};


export type MutationRootSubmitAbsenceRequestArgs = {
  eventId: Scalars['Int'];
  reason: Scalars['String'];
};


export type MutationRootSubmitGigRequestArgs = {
  request: NewGigRequest;
};


export type MutationRootUnsetVariableArgs = {
  key: Scalars['String'];
};


export type MutationRootUpdateAttendanceArgs = {
  email: Scalars['String'];
  eventId: Scalars['Int'];
  update: AttendanceUpdate;
};


export type MutationRootUpdateCarpoolsArgs = {
  carpools: Array<UpdatedCarpool>;
  eventId: Scalars['Int'];
};


export type MutationRootUpdateEventArgs = {
  id: Scalars['Int'];
  newEvent: NewEvent;
};


export type MutationRootUpdateFeeAmountArgs = {
  amount: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationRootUpdateLinkArgs = {
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationRootUpdateMeetingMinutesArgs = {
  id: Scalars['Int'];
  update: UpdatedMeetingMinutes;
};


export type MutationRootUpdateMemberArgs = {
  email: Scalars['String'];
  newMember: MemberUpdate;
};


export type MutationRootUpdateProfileArgs = {
  newMember: MemberUpdate;
};


export type MutationRootUpdateSemesterArgs = {
  name: Scalars['String'];
  update: NewSemester;
};


export type MutationRootUpdateSongArgs = {
  id: Scalars['Int'];
  update: SongUpdate;
};


export type MutationRootUpdateSongLinkArgs = {
  id: Scalars['Int'];
  update: SongLinkUpdate;
};


export type MutationRootUpdateUniformArgs = {
  id: Scalars['Int'];
  update: NewUniform;
};

export type NewEvent = {
  event: NewEventFields;
  gig?: InputMaybe<NewGig>;
  repeat?: InputMaybe<NewEventPeriod>;
};

export type NewEventFields = {
  callTime: Scalars['GqlDateTime'];
  comments?: InputMaybe<Scalars['String']>;
  defaultAttend: Scalars['Boolean'];
  gigCount?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  points: Scalars['Int'];
  releaseTime?: InputMaybe<Scalars['GqlDateTime']>;
  semester: Scalars['String'];
  type: Scalars['String'];
};

export type NewEventPeriod = {
  period: Period;
  repeatUntil: Scalars['GqlDateTime'];
};

export type NewGig = {
  contactEmail?: InputMaybe<Scalars['String']>;
  contactName?: InputMaybe<Scalars['String']>;
  contactPhone?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  performanceTime: Scalars['GqlDateTime'];
  price?: InputMaybe<Scalars['Int']>;
  public: Scalars['Boolean'];
  summary?: InputMaybe<Scalars['String']>;
  uniform: Scalars['Int'];
};

export type NewGigRequest = {
  comments?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  organization: Scalars['String'];
  startTime: Scalars['GqlDateTime'];
};

export type NewMember = {
  about?: InputMaybe<Scalars['String']>;
  arrivedAtTech?: InputMaybe<Scalars['Int']>;
  conflicts?: InputMaybe<Scalars['String']>;
  dietaryRestrictions?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  enrollment: Enrollment;
  firstName: Scalars['String'];
  gatewayDrug?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  location: Scalars['String'];
  major?: InputMaybe<Scalars['String']>;
  minor?: InputMaybe<Scalars['String']>;
  onCampus: Scalars['Boolean'];
  passHash: Scalars['String'];
  passengers: Scalars['Int'];
  phoneNumber: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
  preferredName?: InputMaybe<Scalars['String']>;
  section?: InputMaybe<Scalars['String']>;
};

export type NewRolePermission = {
  /** Optionally, the type of the event the permission applies to */
  eventType?: InputMaybe<Scalars['String']>;
  /** The name of the permission the role is awarded */
  permission: Scalars['String'];
  /** The name of the role this junction refers to */
  role: Scalars['String'];
};

export type NewSemester = {
  endDate: Scalars['GqlDate'];
  gigRequirement: Scalars['Int'];
  name: Scalars['String'];
  startDate: Scalars['GqlDate'];
};

export type NewSong = {
  info?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NewSongLink = {
  content?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  target: Scalars['String'];
  type: Scalars['String'];
};

export type NewUniform = {
  color?: InputMaybe<Scalars['UniformColor']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum Period {
  Biweekly = 'BIWEEKLY',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type Permission = {
  __typename?: 'Permission';
  /** A description of what the permission entails */
  description?: Maybe<Scalars['String']>;
  /** The name of the permission */
  name: Scalars['String'];
  /** Whether the permission applies to a type of event or generally */
  type: PermissionType;
};

export enum PermissionType {
  Event = 'EVENT',
  Static = 'STATIC'
}

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

export type PublicEvent = {
  __typename?: 'PublicEvent';
  description?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['GqlDateTime']>;
  id: Scalars['Int'];
  invite: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  startTime: Scalars['GqlDateTime'];
  summary?: Maybe<Scalars['String']>;
};

export type PublicSong = {
  __typename?: 'PublicSong';
  current: Scalars['Boolean'];
  title: Scalars['String'];
  videos: Array<PublicVideo>;
};

export type PublicVideo = {
  __typename?: 'PublicVideo';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  absenceRequests: Array<AbsenceRequest>;
  allMeetingMinutes: Array<Minutes>;
  currentPermissions: Array<RolePermission>;
  currentSemester: Semester;
  event: Event;
  events: Array<Event>;
  fees: Array<Fee>;
  gigRequest: GigRequest;
  gigRequests: Array<GigRequest>;
  links: Array<DocumentLink>;
  meetingMinutes: Minutes;
  member: Member;
  members: Array<Member>;
  officers: Array<MemberRole>;
  publicEvents: Array<PublicEvent>;
  publicSongs: Array<PublicSong>;
  semester: Semester;
  semesters: Array<Semester>;
  song: Song;
  songLink: SongLink;
  songs: Array<Song>;
  static: StaticData;
  transactions: Array<ClubTransaction>;
  uniform: Uniform;
  uniforms: Array<Uniform>;
  user?: Maybe<Member>;
  variable: Variable;
};


export type QueryRootEventArgs = {
  id: Scalars['Int'];
};


export type QueryRootGigRequestArgs = {
  id: Scalars['Int'];
};


export type QueryRootMeetingMinutesArgs = {
  id: Scalars['Int'];
};


export type QueryRootMemberArgs = {
  email: Scalars['String'];
};


export type QueryRootMembersArgs = {
  includeClass?: Scalars['Boolean'];
  includeClub?: Scalars['Boolean'];
  includeInactive?: Scalars['Boolean'];
};


export type QueryRootSemesterArgs = {
  name: Scalars['String'];
};


export type QueryRootSongArgs = {
  id: Scalars['Int'];
};


export type QueryRootSongLinkArgs = {
  id: Scalars['Int'];
};


export type QueryRootUniformArgs = {
  id: Scalars['Int'];
};


export type QueryRootVariableArgs = {
  key: Scalars['String'];
};

export type RegisterForSemesterForm = {
  conflicts: Scalars['String'];
  dietaryRestrictions: Scalars['String'];
  enrollment: Enrollment;
  location: Scalars['String'];
  onCampus: Scalars['Boolean'];
  section: Scalars['String'];
};

/** Roles that can be held by members to grant permissions */
export type Role = {
  __typename?: 'Role';
  /**
   * The maximum number of the position allowed to be held at once.
   * If it is 0 or less, no maximum is enforced
   */
  maxQuantity: Scalars['Int'];
  /** The name of the role */
  name: Scalars['String'];
  /** Used for ordering the positions (e.g. President beforee Ombudsman) */
  rank: Scalars['Int'];
};

export type RolePermission = {
  __typename?: 'RolePermission';
  /** Optionally, the type of the event the permission applies to */
  eventType?: Maybe<Scalars['String']>;
  /** The ID of the role permission */
  id: Scalars['Int'];
  /** The name of the permission the role is awarded */
  permission: Scalars['String'];
  /** The name of the role this junction refers to */
  role: Scalars['String'];
};

export type SectionType = {
  __typename?: 'SectionType';
  /** The name of the section (Tenor, Baritone, etc.) */
  name: Scalars['String'];
};

export type Semester = {
  __typename?: 'Semester';
  /** Whether this is the current semester */
  current: Scalars['Boolean'];
  /** When the semester ends */
  endDate: Scalars['GqlDate'];
  /** How many volunteer gigs are required for the semester (default: 5) */
  gigRequirement: Scalars['Int'];
  /** The name of the semester */
  name: Scalars['String'];
  /** When the semester starts */
  startDate: Scalars['GqlDate'];
};

export type Song = {
  __typename?: 'Song';
  /** Whether it is in this semester's repertoire */
  current: Scalars['Boolean'];
  /** The ID of the song */
  id: Scalars['Int'];
  /**
   * Any information related to the song
   * (minor changes to the music, who wrote it, soloists, etc.)
   */
  info?: Maybe<Scalars['String']>;
  /** The key of the song */
  key?: Maybe<Pitch>;
  /** The sorted sections of links belonging to the song */
  linkSections: Array<SongLinkSection>;
  /** The mode of the song (Major or Minor) */
  mode?: Maybe<SongMode>;
  /** The starting pitch for the song */
  startingPitch?: Maybe<Pitch>;
  /** The title of the song */
  title: Scalars['String'];
};

export type SongLink = {
  __typename?: 'SongLink';
  /** The ID of the song link */
  id: Scalars['Int'];
  /** The name of this link */
  name: Scalars['String'];
  /** The ID of the song this link belongs to */
  song: Scalars['Int'];
  /** The target this link points to */
  target: Scalars['String'];
  /** The type of this link (e.g. MIDI) */
  type: Scalars['String'];
};

export type SongLinkSection = {
  __typename?: 'SongLinkSection';
  links: Array<SongLink>;
  name: Scalars['String'];
};

export type SongLinkUpdate = {
  name: Scalars['String'];
  target: Scalars['String'];
};

export enum SongMode {
  Major = 'MAJOR',
  Minor = 'MINOR'
}

export type SongUpdate = {
  current: Scalars['Boolean'];
  info?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Pitch>;
  mode?: InputMaybe<SongMode>;
  startingPitch?: InputMaybe<Pitch>;
  title: Scalars['String'];
};

export type StaticData = {
  __typename?: 'StaticData';
  eventTypes: Array<EventType>;
  mediaTypes: Array<MediaType>;
  permissions: Array<Permission>;
  roles: Array<Role>;
  sections: Array<SectionType>;
  transactionTypes: Array<TransactionType>;
};

export enum StorageType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export type TransactionBatch = {
  amount: Scalars['Int'];
  description: Scalars['String'];
  members: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TransactionType = {
  __typename?: 'TransactionType';
  name: Scalars['String'];
};

export type Uniform = {
  __typename?: 'Uniform';
  /** The associated color (In the format #HHH, H being a hex digit) */
  color?: Maybe<Scalars['UniformColor']>;
  /** The explanation of what to wear when wearing the uniform */
  description?: Maybe<Scalars['String']>;
  /** The ID of the uniform */
  id: Scalars['Int'];
  /** The name of the uniform */
  name: Scalars['String'];
};

export type UpdatedCarpool = {
  driver: Scalars['String'];
  passengers: Array<Scalars['String']>;
};

export type UpdatedMeetingMinutes = {
  name: Scalars['String'];
  private?: InputMaybe<Scalars['String']>;
  public: Scalars['String'];
};

/** Arbitrary variables for developer usage. */
export type Variable = {
  __typename?: 'Variable';
  /** The name of the variable. */
  key: Scalars['String'];
  /** The value of the variable. */
  value: Scalars['String'];
};

export type AddOfficershipMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type AddOfficershipMutation = { __typename?: 'MutationRoot', addOfficership: boolean };

export type AddTransactionBatchMutationVariables = Exact<{
  batch: TransactionBatch;
}>;


export type AddTransactionBatchMutation = { __typename?: 'MutationRoot', addBatchOfTransactions: Array<{ __typename?: 'ClubTransaction', id: number }> };

export type ChargeDuesMutationVariables = Exact<{ [key: string]: never; }>;


export type ChargeDuesMutation = { __typename?: 'MutationRoot', chargeDues: Array<{ __typename?: 'ClubTransaction', id: number }> };

export type ChargeLateDuesMutationVariables = Exact<{ [key: string]: never; }>;


export type ChargeLateDuesMutation = { __typename?: 'MutationRoot', chargeLateDues: Array<{ __typename?: 'ClubTransaction', id: number }> };

export type CreateDocumentLinkMutationVariables = Exact<{
  name: Scalars['String'];
  url: Scalars['String'];
}>;


export type CreateDocumentLinkMutation = { __typename?: 'MutationRoot', createLink: { __typename?: 'DocumentLink', name: string, url: string } };

export type CreateEventMutationVariables = Exact<{
  newEvent: NewEvent;
  gigRequestId?: InputMaybe<Scalars['Int']>;
}>;


export type CreateEventMutation = { __typename?: 'MutationRoot', createEvent: { __typename?: 'Event', id: number } };

export type CreateMinutesMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateMinutesMutation = { __typename?: 'MutationRoot', createMeetingMinutes: { __typename?: 'Minutes', id: number } };

export type CreateSemesterMutationVariables = Exact<{
  newSemester: NewSemester;
}>;


export type CreateSemesterMutation = { __typename?: 'MutationRoot', createSemester: { __typename?: 'Semester', name: string } };

export type CreateSongMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateSongMutation = { __typename?: 'MutationRoot', createSong: { __typename?: 'Song', id: number } };

export type CreateSongLinkMutationVariables = Exact<{
  songId: Scalars['Int'];
  newLink: NewSongLink;
}>;


export type CreateSongLinkMutation = { __typename?: 'MutationRoot', createSongLink: { __typename?: 'SongLink', id: number } };

export type CreateUniformMutationVariables = Exact<{
  newUniform: NewUniform;
}>;


export type CreateUniformMutation = { __typename?: 'MutationRoot', createUniform: { __typename?: 'Uniform', id: number } };

export type DeleteDocumentLinkMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type DeleteDocumentLinkMutation = { __typename?: 'MutationRoot', deleteLink: { __typename?: 'DocumentLink', name: string, url: string } };

export type DeleteMemberMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteMemberMutation = { __typename?: 'MutationRoot', deleteMember: string };

export type DeleteSongMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSongMutation = { __typename?: 'MutationRoot', deleteSong: { __typename?: 'Song', id: number } };

export type DeleteSongLinkMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSongLinkMutation = { __typename?: 'MutationRoot', deleteSongLink: { __typename?: 'SongLink', id: number } };

export type DeleteUniformMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUniformMutation = { __typename?: 'MutationRoot', deleteUniform: { __typename?: 'Uniform', id: number } };

export type DisableRolePermissionMutationVariables = Exact<{
  rolePermission: NewRolePermission;
}>;


export type DisableRolePermissionMutation = { __typename?: 'MutationRoot', removePermissionFromRole: boolean };

export type EnableRolePermissionMutationVariables = Exact<{
  rolePermission: NewRolePermission;
}>;


export type EnableRolePermissionMutation = { __typename?: 'MutationRoot', addPermissionToRole: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'MutationRoot', forgotPassword: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  passHash: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'MutationRoot', login: string };

export type LoginAsMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LoginAsMutation = { __typename?: 'MutationRoot', loginAs: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'MutationRoot', logout: string };

export type RegisterForSemesterMutationVariables = Exact<{
  newSemester: RegisterForSemesterForm;
}>;


export type RegisterForSemesterMutation = { __typename?: 'MutationRoot', registerForSemester: { __typename?: 'Member', email: string } };

export type RemoveOfficershipMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type RemoveOfficershipMutation = { __typename?: 'MutationRoot', removeOfficership: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  passHash: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'MutationRoot', resetPassword: string };

export type ResolveTransactionMutationVariables = Exact<{
  id: Scalars['Int'];
  resolved: Scalars['Boolean'];
}>;


export type ResolveTransactionMutation = { __typename?: 'MutationRoot', resolveTransaction: { __typename?: 'ClubTransaction', id: number } };

export type SetCurrentSemesterMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type SetCurrentSemesterMutation = { __typename?: 'MutationRoot', setCurrentSemester: { __typename?: 'Semester', name: string } };

export type UpdateAttendanceMutationVariables = Exact<{
  eventId: Scalars['Int'];
  member: Scalars['String'];
  update: AttendanceUpdate;
}>;


export type UpdateAttendanceMutation = { __typename?: 'MutationRoot', updateAttendance: { __typename?: 'Attendance', shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number } };

export type UpdateFeeMutationVariables = Exact<{
  name: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type UpdateFeeMutation = { __typename?: 'MutationRoot', updateFeeAmount: { __typename?: 'Fee', name: string } };

export type UpdateSongMutationVariables = Exact<{
  id: Scalars['Int'];
  update: SongUpdate;
}>;


export type UpdateSongMutation = { __typename?: 'MutationRoot', updateSong: { __typename?: 'Song', id: number } };

export type UpdateUniformMutationVariables = Exact<{
  id: Scalars['Int'];
  update: NewUniform;
}>;


export type UpdateUniformMutation = { __typename?: 'MutationRoot', updateUniform: { __typename?: 'Uniform', id: number } };

export type AllDocumentLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDocumentLinksQuery = { __typename?: 'QueryRoot', links: Array<{ __typename?: 'DocumentLink', name: string, url: string }> };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'QueryRoot', events: Array<{ __typename?: 'Event', id: number, name: string, callTime: string, releaseTime?: string | null, userAttendance?: { __typename?: 'Attendance', shouldAttend: boolean, confirmed: boolean } | null }> };

export type AllFeesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeesQuery = { __typename?: 'QueryRoot', fees: Array<{ __typename?: 'Fee', name: string, description: string, amount: number }> };

export type AllMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMembersQuery = { __typename?: 'QueryRoot', members: Array<{ __typename?: 'Member', email: string, phoneNumber: string, fullName: string, location: string, semester?: { __typename?: 'ActiveSemester', section?: string | null } | null }> };

export type AllMinutesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMinutesQuery = { __typename?: 'QueryRoot', allMeetingMinutes: Array<{ __typename?: 'Minutes', id: number, name: string, date: string }> };

export type AllRolePermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRolePermissionsQuery = { __typename?: 'QueryRoot', currentPermissions: Array<{ __typename?: 'RolePermission', id: number, role: string, permission: string, eventType?: string | null }> };

export type AllSemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSemestersQuery = { __typename?: 'QueryRoot', semesters: Array<{ __typename?: 'Semester', name: string }> };

export type AllSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSongsQuery = { __typename?: 'QueryRoot', songs: Array<{ __typename?: 'Song', id: number, title: string, current: boolean }> };

export type AllUniformsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUniformsQuery = { __typename?: 'QueryRoot', uniforms: Array<{ __typename?: 'Uniform', id: number, name: string, color?: string | null, description?: string | null }> };

export type ConfirmSemesterFormQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfirmSemesterFormQuery = { __typename?: 'QueryRoot', user?: { __typename?: 'Member', location: string, onCampus?: boolean | null, dietaryRestrictions?: string | null, conflicts?: string | null, previousSemester?: { __typename?: 'ActiveSemester', enrollment: Enrollment, section?: string | null } | null } | null };

export type CurrentOfficersQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOfficersQuery = { __typename?: 'QueryRoot', officers: Array<{ __typename?: 'MemberRole', role: string, member: { __typename?: 'Member', email: string, fullName: string } }>, members: Array<{ __typename?: 'Member', email: string, fullName: string }> };

export type DocumentLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentLinksQuery = { __typename?: 'QueryRoot', links: Array<{ __typename?: 'DocumentLink', name: string, url: string }> };

export type FullEventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullEventQuery = { __typename?: 'QueryRoot', event: { __typename?: 'Event', name: string, semester: string, type: string, callTime: string, releaseTime?: string | null, points: number, comments?: string | null, location?: string | null, gigCount: boolean, defaultAttend: boolean, gig?: { __typename?: 'Gig', summary?: string | null, description?: string | null } | null, userAttendance?: { __typename?: 'Attendance', shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number, rsvpIssue?: string | null, approvedAbsence: boolean, denyCredit: boolean } | null, allAttendance: Array<{ __typename?: 'Attendance', didAttend: boolean, shouldAttend: boolean, confirmed: boolean, minutesLate: number, member: { __typename?: 'Member', fullName: string, email: string, semester?: { __typename?: 'ActiveSemester', section?: string | null } | null } }>, carpools: Array<{ __typename?: 'Carpool', driver: { __typename?: 'Member', email: string, fullName: string }, passengers: Array<{ __typename?: 'Member', fullName: string, email: string }> }>, setlist: Array<{ __typename?: 'Song', id: number, title: string, key?: Pitch | null, mode?: SongMode | null, startingPitch?: Pitch | null }> } };

export type FullMemberQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type FullMemberQuery = { __typename?: 'QueryRoot', member: { __typename?: 'Member', email: string, firstName: string, preferredName?: string | null, lastName: string, phoneNumber: string, picture?: string | null, passengers: number, location: string, onCampus?: boolean | null, about?: string | null, major?: string | null, minor?: string | null, hometown?: string | null, arrivedAtTech?: number | null, gatewayDrug?: string | null, conflicts?: string | null, dietaryRestrictions?: string | null, fullName: string, semester?: { __typename?: 'ActiveSemester', enrollment: Enrollment, section?: string | null } | null, positions: Array<{ __typename?: 'Role', name: string }>, semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section?: string | null, grades: { __typename?: 'Grades', grade: number, eventsWithChanges: Array<{ __typename?: 'EventWithGradeChange', event: { __typename?: 'Event', id: number, name: string }, change: { __typename?: 'GradeChange', reason: string, change: number, partialScore: number } }> } }>, transactions: Array<{ __typename?: 'ClubTransaction', id: number, time: string, amount: number, description: string, semester?: string | null, type: string, resolved: boolean }> } };

export type FullMinutesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullMinutesQuery = { __typename?: 'QueryRoot', meetingMinutes: { __typename?: 'Minutes', id: number, name: string, date: string, public?: string | null, private?: string | null } };

export type FullSongQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullSongQuery = { __typename?: 'QueryRoot', song: { __typename?: 'Song', id: number, title: string, info?: string | null, current: boolean, key?: Pitch | null, startingPitch?: Pitch | null, mode?: SongMode | null, linkSections: Array<{ __typename?: 'SongLinkSection', name: string, links: Array<{ __typename?: 'SongLink', id: number, name: string, type: string, target: string }> }> } };

export type GigRequestForNewEventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GigRequestForNewEventQuery = { __typename?: 'QueryRoot', gigRequest: { __typename?: 'GigRequest', id: number, time: string, name: string, organization: string, contactName: string, contactPhone: string, contactEmail: string, startTime: string, location: string, comments?: string | null, status: GigRequestStatus } };

export type MemberSemestersQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type MemberSemestersQuery = { __typename?: 'QueryRoot', member: { __typename?: 'Member', semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section?: string | null, grades: { __typename?: 'Grades', grade: number } }> } };

export type SiteContextQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteContextQuery = { __typename?: 'QueryRoot', currentSemester: { __typename?: 'Semester', name: string, startDate: string, endDate: string, gigRequirement: number }, user?: { __typename?: 'Member', email: string, firstName: string, preferredName?: string | null, lastName: string, fullName: string, phoneNumber: string, picture?: string | null, passengers: number, location: string, onCampus?: boolean | null, about?: string | null, major?: string | null, minor?: string | null, hometown?: string | null, arrivedAtTech?: number | null, gatewayDrug?: string | null, conflicts?: string | null, dietaryRestrictions?: string | null, semester?: { __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section?: string | null } | null, positions: Array<{ __typename?: 'Role', name: string }>, permissions: Array<{ __typename?: 'MemberPermission', name: string, eventType?: string | null }>, semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section?: string | null }>, grades: { __typename?: 'Grades', grade: number, volunteerGigsAttended: Array<{ __typename?: 'Event', id: number, name: string, callTime: string, releaseTime?: string | null }>, eventsWithChanges: Array<{ __typename?: 'EventWithGradeChange', event: { __typename?: 'Event', id: number, name: string, callTime: string, releaseTime?: string | null }, change: { __typename?: 'GradeChange', change: number, partialScore: number, reason: string } }> }, transactions: Array<{ __typename?: 'ClubTransaction', id: number, time: string, amount: number, description: string, semester?: string | null, type: string, resolved: boolean }> } | null, static: { __typename?: 'StaticData', sections: Array<{ __typename?: 'SectionType', name: string }>, permissions: Array<{ __typename?: 'Permission', name: string, description?: string | null, type: PermissionType }>, roles: Array<{ __typename?: 'Role', name: string, rank: number, maxQuantity: number }>, mediaTypes: Array<{ __typename?: 'MediaType', name: string, order: number, storage: StorageType }>, eventTypes: Array<{ __typename?: 'EventType', name: string, weight: number }>, transactionTypes: Array<{ __typename?: 'TransactionType', name: string }> } };

export type TransactionsForSemesterQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsForSemesterQuery = { __typename?: 'QueryRoot', transactions: Array<{ __typename?: 'ClubTransaction', id: number, time: string, amount: number, description: string, semester?: string | null, type: string, resolved: boolean, member: { __typename?: 'Member', email: string, fullName: string } }> };


export const AddOfficershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOfficership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOfficership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<AddOfficershipMutation, AddOfficershipMutationVariables>;
export const AddTransactionBatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTransactionBatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"batch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionBatch"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBatchOfTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"batch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"batch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTransactionBatchMutation, AddTransactionBatchMutationVariables>;
export const ChargeDuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChargeDues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeDues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChargeDuesMutation, ChargeDuesMutationVariables>;
export const ChargeLateDuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChargeLateDues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeLateDues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChargeLateDuesMutation, ChargeLateDuesMutationVariables>;
export const CreateDocumentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDocumentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentLinkMutation, CreateDocumentLinkMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newEvent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewEvent"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gigRequestId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newEvent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newEvent"}}},{"kind":"Argument","name":{"kind":"Name","value":"gigRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gigRequestId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const CreateMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMeetingMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMinutesMutation, CreateMinutesMutationVariables>;
export const CreateSemesterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSemester"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newSemester"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewSemester"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSemester"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newSemester"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newSemester"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSemesterMutation, CreateSemesterMutationVariables>;
export const CreateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newSong"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSongMutation, CreateSongMutationVariables>;
export const CreateSongLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSongLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"songId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newLink"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewSongLink"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSongLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"songId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"songId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newLink"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newLink"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSongLinkMutation, CreateSongLinkMutationVariables>;
export const CreateUniformDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUniform"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newUniform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewUniform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUniform"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newUniform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newUniform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUniformMutation, CreateUniformMutationVariables>;
export const DeleteDocumentLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDocumentLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<DeleteDocumentLinkMutation, DeleteDocumentLinkMutationVariables>;
export const DeleteMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const DeleteSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSongMutation, DeleteSongMutationVariables>;
export const DeleteSongLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSongLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSongLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSongLinkMutation, DeleteSongLinkMutationVariables>;
export const DeleteUniformDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUniform"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUniform"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUniformMutation, DeleteUniformMutationVariables>;
export const DisableRolePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableRolePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rolePermission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewRolePermission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePermissionFromRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rolePermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rolePermission"}}}]}]}}]} as unknown as DocumentNode<DisableRolePermissionMutation, DisableRolePermissionMutationVariables>;
export const EnableRolePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableRolePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rolePermission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewRolePermission"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPermissionToRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rolePermission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rolePermission"}}}]}]}}]} as unknown as DocumentNode<EnableRolePermissionMutation, EnableRolePermissionMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"passHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passHash"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LoginAsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<LoginAsMutation, LoginAsMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterForSemesterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterForSemester"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newSemester"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterForSemesterForm"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerForSemester"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newSemester"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newSemester"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<RegisterForSemesterMutation, RegisterForSemesterMutationVariables>;
export const RemoveOfficershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveOfficership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOfficership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RemoveOfficershipMutation, RemoveOfficershipMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"passHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passHash"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResolveTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResolveTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resolved"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"resolved"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resolved"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ResolveTransactionMutation, ResolveTransactionMutationVariables>;
export const SetCurrentSemesterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCurrentSemester"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setCurrentSemester"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SetCurrentSemesterMutation, SetCurrentSemesterMutationVariables>;
export const UpdateAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttendanceUpdate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldAttend"}},{"kind":"Field","name":{"kind":"Name","value":"didAttend"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"minutesLate"}}]}}]}}]} as unknown as DocumentNode<UpdateAttendanceMutation, UpdateAttendanceMutationVariables>;
export const UpdateFeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFeeAmount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateFeeMutation, UpdateFeeMutationVariables>;
export const UpdateSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SongUpdate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSong"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSongMutation, UpdateSongMutationVariables>;
export const UpdateUniformDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUniform"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"update"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewUniform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUniform"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"update"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUniformMutation, UpdateUniformMutationVariables>;
export const AllDocumentLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllDocumentLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AllDocumentLinksQuery, AllDocumentLinksQueryVariables>;
export const AllEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"callTime"}},{"kind":"Field","name":{"kind":"Name","value":"releaseTime"}},{"kind":"Field","name":{"kind":"Name","value":"userAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldAttend"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}}]}}]}}]}}]} as unknown as DocumentNode<AllEventsQuery, AllEventsQueryVariables>;
export const AllFeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllFees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<AllFeesQuery, AllFeesQueryVariables>;
export const AllMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"semester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"}}]}}]}}]}}]} as unknown as DocumentNode<AllMembersQuery, AllMembersQueryVariables>;
export const AllMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllMinutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allMeetingMinutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<AllMinutesQuery, AllMinutesQueryVariables>;
export const AllRolePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRolePermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}}]}}]} as unknown as DocumentNode<AllRolePermissionsQuery, AllRolePermissionsQueryVariables>;
export const AllSemestersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSemesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AllSemestersQuery, AllSemestersQueryVariables>;
export const AllSongsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSongs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"songs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]}}]} as unknown as DocumentNode<AllSongsQuery, AllSongsQueryVariables>;
export const AllUniformsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUniforms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniforms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AllUniformsQuery, AllUniformsQueryVariables>;
export const ConfirmSemesterFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConfirmSemesterForm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"onCampus"}},{"kind":"Field","name":{"kind":"Name","value":"previousSemester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"conflicts"}}]}}]}}]} as unknown as DocumentNode<ConfirmSemesterFormQuery, ConfirmSemesterFormQueryVariables>;
export const CurrentOfficersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentOfficers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"officers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]} as unknown as DocumentNode<CurrentOfficersQuery, CurrentOfficersQueryVariables>;
export const DocumentLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DocumentLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<DocumentLinksQuery, DocumentLinksQueryVariables>;
export const FullEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"callTime"}},{"kind":"Field","name":{"kind":"Name","value":"releaseTime"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"gigCount"}},{"kind":"Field","name":{"kind":"Name","value":"defaultAttend"}},{"kind":"Field","name":{"kind":"Name","value":"gig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldAttend"}},{"kind":"Field","name":{"kind":"Name","value":"didAttend"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"minutesLate"}},{"kind":"Field","name":{"kind":"Name","value":"rsvpIssue"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAbsence"}},{"kind":"Field","name":{"kind":"Name","value":"denyCredit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emptyIfNotPermitted"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"semester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"didAttend"}},{"kind":"Field","name":{"kind":"Name","value":"shouldAttend"}},{"kind":"Field","name":{"kind":"Name","value":"confirmed"}},{"kind":"Field","name":{"kind":"Name","value":"minutesLate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"carpools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"setlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"startingPitch"}}]}}]}}]}}]} as unknown as DocumentNode<FullEventQuery, FullEventQueryVariables>;
export const FullMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"preferredName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"onCampus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"minor"}},{"kind":"Field","name":{"kind":"Name","value":"hometown"}},{"kind":"Field","name":{"kind":"Name","value":"arrivedAtTech"}},{"kind":"Field","name":{"kind":"Name","value":"gatewayDrug"}},{"kind":"Field","name":{"kind":"Name","value":"conflicts"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"semester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"grades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"eventsWithChanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"change"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"change"}},{"kind":"Field","name":{"kind":"Name","value":"partialScore"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}}]}}]}}]}}]} as unknown as DocumentNode<FullMemberQuery, FullMemberQueryVariables>;
export const FullMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meetingMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]}}]} as unknown as DocumentNode<FullMinutesQuery, FullMinutesQueryVariables>;
export const FullSongDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FullSong"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"startingPitch"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"linkSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"target"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FullSongQuery, FullSongQueryVariables>;
export const GigRequestForNewEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GigRequestForNewEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organization"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GigRequestForNewEventQuery, GigRequestForNewEventQueryVariables>;
export const MemberSemestersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MemberSemesters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"grades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grade"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MemberSemestersQuery, MemberSemestersQueryVariables>;
export const SiteContextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SiteContext"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentSemester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"gigRequirement"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"preferredName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"onCampus"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"minor"}},{"kind":"Field","name":{"kind":"Name","value":"hometown"}},{"kind":"Field","name":{"kind":"Name","value":"arrivedAtTech"}},{"kind":"Field","name":{"kind":"Name","value":"gatewayDrug"}},{"kind":"Field","name":{"kind":"Name","value":"conflicts"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"semester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"semesters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"enrollment"}},{"kind":"Field","name":{"kind":"Name","value":"section"}}]}},{"kind":"Field","name":{"kind":"Name","value":"grades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"volunteerGigsAttended"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"callTime"}},{"kind":"Field","name":{"kind":"Name","value":"releaseTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsWithChanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"callTime"}},{"kind":"Field","name":{"kind":"Name","value":"releaseTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"change"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"change"}},{"kind":"Field","name":{"kind":"Name","value":"partialScore"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"static"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"maxQuantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"storage"}}]}}]}}]}}]} as unknown as DocumentNode<SiteContextQuery, SiteContextQueryVariables>;
export const TransactionsForSemesterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TransactionsForSemester"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}}]}}]}}]} as unknown as DocumentNode<TransactionsForSemesterQuery, TransactionsForSemesterQueryVariables>;
export type AddOfficershipMutationStore = OperationStore<AddOfficershipMutation, AddOfficershipMutationVariables>;
export type AddTransactionBatchMutationStore = OperationStore<AddTransactionBatchMutation, AddTransactionBatchMutationVariables>;
export type ChargeDuesMutationStore = OperationStore<ChargeDuesMutation, ChargeDuesMutationVariables>;
export type ChargeLateDuesMutationStore = OperationStore<ChargeLateDuesMutation, ChargeLateDuesMutationVariables>;
export type CreateDocumentLinkMutationStore = OperationStore<CreateDocumentLinkMutation, CreateDocumentLinkMutationVariables>;
export type CreateEventMutationStore = OperationStore<CreateEventMutation, CreateEventMutationVariables>;
export type CreateMinutesMutationStore = OperationStore<CreateMinutesMutation, CreateMinutesMutationVariables>;
export type CreateSemesterMutationStore = OperationStore<CreateSemesterMutation, CreateSemesterMutationVariables>;
export type CreateSongMutationStore = OperationStore<CreateSongMutation, CreateSongMutationVariables>;
export type CreateSongLinkMutationStore = OperationStore<CreateSongLinkMutation, CreateSongLinkMutationVariables>;
export type CreateUniformMutationStore = OperationStore<CreateUniformMutation, CreateUniformMutationVariables>;
export type DeleteDocumentLinkMutationStore = OperationStore<DeleteDocumentLinkMutation, DeleteDocumentLinkMutationVariables>;
export type DeleteMemberMutationStore = OperationStore<DeleteMemberMutation, DeleteMemberMutationVariables>;
export type DeleteSongMutationStore = OperationStore<DeleteSongMutation, DeleteSongMutationVariables>;
export type DeleteSongLinkMutationStore = OperationStore<DeleteSongLinkMutation, DeleteSongLinkMutationVariables>;
export type DeleteUniformMutationStore = OperationStore<DeleteUniformMutation, DeleteUniformMutationVariables>;
export type DisableRolePermissionMutationStore = OperationStore<DisableRolePermissionMutation, DisableRolePermissionMutationVariables>;
export type EnableRolePermissionMutationStore = OperationStore<EnableRolePermissionMutation, EnableRolePermissionMutationVariables>;
export type ForgotPasswordMutationStore = OperationStore<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type LoginMutationStore = OperationStore<LoginMutation, LoginMutationVariables>;
export type LoginAsMutationStore = OperationStore<LoginAsMutation, LoginAsMutationVariables>;
export type LogoutMutationStore = OperationStore<LogoutMutation, LogoutMutationVariables>;
export type RegisterForSemesterMutationStore = OperationStore<RegisterForSemesterMutation, RegisterForSemesterMutationVariables>;
export type RemoveOfficershipMutationStore = OperationStore<RemoveOfficershipMutation, RemoveOfficershipMutationVariables>;
export type ResetPasswordMutationStore = OperationStore<ResetPasswordMutation, ResetPasswordMutationVariables>;
export type ResolveTransactionMutationStore = OperationStore<ResolveTransactionMutation, ResolveTransactionMutationVariables>;
export type SetCurrentSemesterMutationStore = OperationStore<SetCurrentSemesterMutation, SetCurrentSemesterMutationVariables>;
export type UpdateAttendanceMutationStore = OperationStore<UpdateAttendanceMutation, UpdateAttendanceMutationVariables>;
export type UpdateFeeMutationStore = OperationStore<UpdateFeeMutation, UpdateFeeMutationVariables>;
export type UpdateSongMutationStore = OperationStore<UpdateSongMutation, UpdateSongMutationVariables>;
export type UpdateUniformMutationStore = OperationStore<UpdateUniformMutation, UpdateUniformMutationVariables>;
export type AllDocumentLinksQueryStore = OperationStore<AllDocumentLinksQuery, AllDocumentLinksQueryVariables>;
export type AllEventsQueryStore = OperationStore<AllEventsQuery, AllEventsQueryVariables>;
export type AllFeesQueryStore = OperationStore<AllFeesQuery, AllFeesQueryVariables>;
export type AllMembersQueryStore = OperationStore<AllMembersQuery, AllMembersQueryVariables>;
export type AllMinutesQueryStore = OperationStore<AllMinutesQuery, AllMinutesQueryVariables>;
export type AllRolePermissionsQueryStore = OperationStore<AllRolePermissionsQuery, AllRolePermissionsQueryVariables>;
export type AllSemestersQueryStore = OperationStore<AllSemestersQuery, AllSemestersQueryVariables>;
export type AllSongsQueryStore = OperationStore<AllSongsQuery, AllSongsQueryVariables>;
export type AllUniformsQueryStore = OperationStore<AllUniformsQuery, AllUniformsQueryVariables>;
export type ConfirmSemesterFormQueryStore = OperationStore<ConfirmSemesterFormQuery, ConfirmSemesterFormQueryVariables>;
export type CurrentOfficersQueryStore = OperationStore<CurrentOfficersQuery, CurrentOfficersQueryVariables>;
export type DocumentLinksQueryStore = OperationStore<DocumentLinksQuery, DocumentLinksQueryVariables>;
export type FullEventQueryStore = OperationStore<FullEventQuery, FullEventQueryVariables>;
export type FullMemberQueryStore = OperationStore<FullMemberQuery, FullMemberQueryVariables>;
export type FullMinutesQueryStore = OperationStore<FullMinutesQuery, FullMinutesQueryVariables>;
export type FullSongQueryStore = OperationStore<FullSongQuery, FullSongQueryVariables>;
export type GigRequestForNewEventQueryStore = OperationStore<GigRequestForNewEventQuery, GigRequestForNewEventQueryVariables>;
export type MemberSemestersQueryStore = OperationStore<MemberSemestersQuery, MemberSemestersQueryVariables>;
export type SiteContextQueryStore = OperationStore<SiteContextQuery, SiteContextQueryVariables>;
export type TransactionsForSemesterQueryStore = OperationStore<TransactionsForSemesterQuery, TransactionsForSemesterQueryVariables>;