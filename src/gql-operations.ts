import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
  DateScalar: string;
  TimeScalar: string;
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
  time: DateTime;
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
  section: Scalars['String'];
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
  time: DateTime;
  /** The name of the type of transaction */
  type: Scalars['String'];
};

export type DateTime = {
  __typename?: 'DateTime';
  /** The date part of the datetime */
  date: Scalars['DateScalar'];
  /** The time part of the datetime */
  time: Scalars['TimeScalar'];
};

export type DateTimeInput = {
  /** The date part of the datetime */
  date: Scalars['DateScalar'];
  /** The time part of the datetime */
  time: Scalars['TimeScalar'];
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
  attendance?: Maybe<Attendance>;
  /** When members are expected to arrive to the event */
  callTime: DateTime;
  carpools: Array<Carpool>;
  /** General information or details about this event */
  comments: Scalars['String'];
  /** Whether members are assumed to attend (we assume as much for most events) */
  defaultAttend: Scalars['Boolean'];
  /** The gig for this event, if it is a gig */
  gig?: Maybe<Gig>;
  /** Whether this event counts toward the volunteer gig count for the semester */
  gigCount: Scalars['Boolean'];
  /** The ID of the event */
  id: Scalars['Int'];
  /** Where this event will be held */
  location: Scalars['String'];
  /** The name of the event */
  name: Scalars['String'];
  /** How many points attendance of this event is worth */
  points: Scalars['Int'];
  /** When members are probably going to be released */
  releaseTime?: Maybe<DateTime>;
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
  contactEmail: Scalars['String'];
  /** The name of the contact for this gig */
  contactName: Scalars['String'];
  /** The phone number of the contact for this gig */
  contactPhone: Scalars['String'];
  /** A description of this event for the external site (if it is public) */
  description: Scalars['String'];
  /** The ID of the event this gig belongs to */
  event: Scalars['Int'];
  /** When members are expected to actually perform */
  performanceTime: DateTime;
  /** The price we are charging for this gig */
  price?: Maybe<Scalars['Int']>;
  /** Whether this gig is visible on the external website */
  public: Scalars['Boolean'];
  /** A summary of this event for the external site (if it is public) */
  summary: Scalars['String'];
  /** The uniform for this gig */
  uniform: Uniform;
};

export type GigRequest = {
  __typename?: 'GigRequest';
  /** Any comments about the event */
  comments: Scalars['String'];
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
  startTime: DateTime;
  /** The current status of whether the request was accepted */
  status: GigRequestStatus;
  /** When the gig request was placed */
  time: DateTime;
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
  about: Scalars['String'];
  /** What year the member arrived at Georgia Tech */
  arrivedAtTech?: Maybe<Scalars['Int']>;
  /** What conflicts with rehearsal the member may have */
  conflicts: Scalars['String'];
  /** Any dietary restrictions the member may have */
  dietaryRestrictions: Scalars['String'];
  /** The member's email, which must be unique */
  email: Scalars['String'];
  /** The member's first name */
  firstName: Scalars['String'];
  /** The member's full name */
  fullName: Scalars['String'];
  /** What got them to join Glee Club */
  gatewayDrug: Scalars['String'];
  /** The grades for the member in the given semester (default the current semester) */
  grades: Grades;
  /** Where the member came from */
  hometown: Scalars['String'];
  /** The member's last name */
  lastName: Scalars['String'];
  /** Where the member lives */
  location: Scalars['String'];
  /** The member's academic major */
  major: Scalars['String'];
  /** The member's academic minor */
  minor: Scalars['String'];
  /** Whether the member lives on campus */
  onCampus: Scalars['Boolean'];
  /** How many people the member can drive to events (besides themself) */
  passengers: Scalars['Int'];
  /** The permissions currently held by the member */
  permissions: Array<MemberPermission>;
  /** The member's phone number */
  phoneNumber: Scalars['String'];
  /** An optional link to a profile picture for the member */
  picture: Scalars['String'];
  /** The officer positions currently held by the member */
  positions: Array<Role>;
  /** The member's nick name */
  preferredName?: Maybe<Scalars['String']>;
  /** Info about the member from last semester, if they were active */
  previousSemester?: Maybe<ActiveSemester>;
  /** Info on the member for the current semester, if they are active */
  semester?: Maybe<ActiveSemester>;
  /** Info for each semester the member was active */
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
  about: Scalars['String'];
  arrivedAtTech?: InputMaybe<Scalars['Int']>;
  conflicts: Scalars['String'];
  dietaryRestrictions: Scalars['String'];
  email: Scalars['String'];
  enrollment?: InputMaybe<Enrollment>;
  firstName: Scalars['String'];
  gatewayDrug: Scalars['String'];
  hometown: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  major: Scalars['String'];
  minor: Scalars['String'];
  onCampus: Scalars['Boolean'];
  passHash?: InputMaybe<Scalars['String']>;
  passengers: Scalars['Int'];
  phoneNumber: Scalars['String'];
  picture: Scalars['String'];
  preferredName?: InputMaybe<Scalars['String']>;
  section?: InputMaybe<Scalars['String']>;
};

export type Minutes = {
  __typename?: 'Minutes';
  /** When these notes were initially created */
  date: Scalars['DateScalar'];
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
  callTime: DateTimeInput;
  comments?: InputMaybe<Scalars['String']>;
  defaultAttend: Scalars['Boolean'];
  gigCount?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  points: Scalars['Int'];
  releaseTime?: InputMaybe<DateTimeInput>;
  semester: Scalars['String'];
  type: Scalars['String'];
};

export type NewEventPeriod = {
  period: Period;
  repeatUntil: Scalars['DateScalar'];
};

export type NewGig = {
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  description: Scalars['String'];
  performanceTime: DateTimeInput;
  price?: InputMaybe<Scalars['Int']>;
  public: Scalars['Boolean'];
  summary: Scalars['String'];
  uniform: Scalars['Int'];
};

export type NewGigRequest = {
  comments: Scalars['String'];
  contactEmail: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  organization: Scalars['String'];
  startTime: DateTimeInput;
};

export type NewMember = {
  about: Scalars['String'];
  arrivedAtTech?: InputMaybe<Scalars['Int']>;
  conflicts: Scalars['String'];
  dietaryRestrictions: Scalars['String'];
  email: Scalars['String'];
  enrollment: Enrollment;
  firstName: Scalars['String'];
  gatewayDrug: Scalars['String'];
  hometown: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  major: Scalars['String'];
  minor: Scalars['String'];
  onCampus: Scalars['Boolean'];
  passHash: Scalars['String'];
  passengers: Scalars['Int'];
  phoneNumber: Scalars['String'];
  picture: Scalars['String'];
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
  endDate: Scalars['DateScalar'];
  gigRequirement: Scalars['Int'];
  name: Scalars['String'];
  startDate: Scalars['DateScalar'];
};

export type NewSong = {
  info?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NewSongLink = {
  content?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type NewUniform = {
  color?: InputMaybe<Scalars['UniformColor']>;
  description: Scalars['String'];
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
  description: Scalars['String'];
  endTime?: Maybe<DateTime>;
  id: Scalars['Int'];
  invite: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  startTime: DateTime;
  summary: Scalars['String'];
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
  endDate: Scalars['DateScalar'];
  /** How many volunteer gigs are required for the semester (default: 5) */
  gigRequirement: Scalars['Int'];
  /** The name of the semester */
  name: Scalars['String'];
  /** When the semester starts */
  startDate: Scalars['DateScalar'];
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
  info: Scalars['String'];
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
  /** The type of this link (e.g. MIDI) */
  type: Scalars['String'];
  /** The URL this link points to */
  url: Scalars['String'];
};

export type SongLinkSection = {
  __typename?: 'SongLinkSection';
  links: Array<SongLink>;
  name: Scalars['String'];
};

export type SongLinkUpdate = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export enum SongMode {
  Major = 'MAJOR',
  Minor = 'MINOR'
}

export type SongUpdate = {
  current: Scalars['Boolean'];
  info: Scalars['String'];
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
  description: Scalars['String'];
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

export type ConfirmForEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ConfirmForEventMutation = { __typename?: 'MutationRoot', confirmForEvent: { __typename?: 'Attendance', confirmed: boolean } };

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

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = { __typename?: 'MutationRoot', deleteEvent: number };

export type DeleteMeetingMinutesMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMeetingMinutesMutation = { __typename?: 'MutationRoot', deleteMeetingMinutes: { __typename?: 'Minutes', id: number } };

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

export type DismissGigRequestMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DismissGigRequestMutation = { __typename?: 'MutationRoot', dismissGigRequest: { __typename?: 'GigRequest', id: number } };

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

export type RegisterMemberMutationVariables = Exact<{
  newMember: NewMember;
}>;


export type RegisterMemberMutation = { __typename?: 'MutationRoot', registerMember: { __typename?: 'Member', email: string } };

export type RemoveOfficershipMutationVariables = Exact<{
  role: Scalars['String'];
  email: Scalars['String'];
}>;


export type RemoveOfficershipMutation = { __typename?: 'MutationRoot', removeOfficership: boolean };

export type ReopenGigRequestMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReopenGigRequestMutation = { __typename?: 'MutationRoot', reopenGigRequest: { __typename?: 'GigRequest', id: number } };

export type RequestAbsenceMutationVariables = Exact<{
  eventId: Scalars['Int'];
  reason: Scalars['String'];
}>;


export type RequestAbsenceMutation = { __typename?: 'MutationRoot', submitAbsenceRequest: { __typename?: 'AbsenceRequest', reason: string } };

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

export type RespondToAbsenceRequestMutationVariables = Exact<{
  eventId: Scalars['Int'];
  email: Scalars['String'];
  approved: Scalars['Boolean'];
}>;


export type RespondToAbsenceRequestMutation = { __typename?: 'MutationRoot', respondToAbsenceRequest: { __typename?: 'AbsenceRequest', reason: string } };

export type RsvpForEventMutationVariables = Exact<{
  id: Scalars['Int'];
  attending: Scalars['Boolean'];
}>;


export type RsvpForEventMutation = { __typename?: 'MutationRoot', rsvpForEvent: { __typename?: 'Attendance', shouldAttend: boolean } };

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

export type UpdateCarpoolsMutationVariables = Exact<{
  eventId: Scalars['Int'];
  carpools: Array<UpdatedCarpool> | UpdatedCarpool;
}>;


export type UpdateCarpoolsMutation = { __typename?: 'MutationRoot', updateCarpools: Array<{ __typename?: 'Carpool', id: number }> };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Int'];
  newEvent: NewEvent;
}>;


export type UpdateEventMutation = { __typename?: 'MutationRoot', updateEvent: { __typename?: 'Event', id: number } };

export type UpdateFeeMutationVariables = Exact<{
  name: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type UpdateFeeMutation = { __typename?: 'MutationRoot', updateFeeAmount: { __typename?: 'Fee', name: string } };

export type UpdateMeetingMinutesMutationVariables = Exact<{
  id: Scalars['Int'];
  update: UpdatedMeetingMinutes;
}>;


export type UpdateMeetingMinutesMutation = { __typename?: 'MutationRoot', updateMeetingMinutes: { __typename?: 'Minutes', id: number } };

export type UpdateMemberMutationVariables = Exact<{
  email: Scalars['String'];
  update: MemberUpdate;
}>;


export type UpdateMemberMutation = { __typename?: 'MutationRoot', updateMember: { __typename?: 'Member', email: string } };

export type UpdateSemesterMutationVariables = Exact<{
  name: Scalars['String'];
  update: NewSemester;
}>;


export type UpdateSemesterMutation = { __typename?: 'MutationRoot', updateSemester: { __typename?: 'Semester', name: string } };

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

export type AllAbsenceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAbsenceRequestsQuery = { __typename?: 'QueryRoot', absenceRequests: Array<{ __typename?: 'AbsenceRequest', reason: string, state: AbsenceRequestStatus, time: { __typename?: 'DateTime', date: string, time: string }, event: { __typename?: 'Event', id: number, name: string, location: string, callTime: { __typename?: 'DateTime', date: string, time: string } }, member: { __typename?: 'Member', email: string, fullName: string } }> };

export type AllDocumentLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDocumentLinksQuery = { __typename?: 'QueryRoot', links: Array<{ __typename?: 'DocumentLink', name: string, url: string }> };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'QueryRoot', events: Array<{ __typename?: 'Event', id: number, name: string, type: string, callTime: { __typename?: 'DateTime', date: string, time: string }, releaseTime?: { __typename?: 'DateTime', date: string, time: string } | null, userAttendance?: { __typename?: 'Attendance', shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number } | null }> };

export type AllFeesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeesQuery = { __typename?: 'QueryRoot', fees: Array<{ __typename?: 'Fee', name: string, description: string, amount: number }> };

export type AllGigRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGigRequestsQuery = { __typename?: 'QueryRoot', gigRequests: Array<{ __typename?: 'GigRequest', id: number, name: string, organization: string, contactName: string, contactPhone: string, contactEmail: string, location: string, comments: string, status: GigRequestStatus, time: { __typename?: 'DateTime', date: string, time: string }, startTime: { __typename?: 'DateTime', date: string, time: string }, event?: { __typename?: 'Event', id: number, name: string, semester: string } | null }> };

export type AllMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMembersQuery = { __typename?: 'QueryRoot', members: Array<{ __typename?: 'Member', email: string, phoneNumber: string, fullName: string, location: string, semester?: { __typename?: 'ActiveSemester', section: string } | null }> };

export type AllMinutesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMinutesQuery = { __typename?: 'QueryRoot', allMeetingMinutes: Array<{ __typename?: 'Minutes', id: number, name: string, date: string }> };

export type AllRolePermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRolePermissionsQuery = { __typename?: 'QueryRoot', currentPermissions: Array<{ __typename?: 'RolePermission', id: number, role: string, permission: string, eventType?: string | null }> };

export type AllSemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSemestersQuery = { __typename?: 'QueryRoot', semesters: Array<{ __typename?: 'Semester', name: string }> };

export type AllSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSongsQuery = { __typename?: 'QueryRoot', songs: Array<{ __typename?: 'Song', id: number, title: string, current: boolean }> };

export type AllUniformsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUniformsQuery = { __typename?: 'QueryRoot', uniforms: Array<{ __typename?: 'Uniform', id: number, name: string, color?: string | null, description: string }> };

export type ConfirmSemesterFormQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfirmSemesterFormQuery = { __typename?: 'QueryRoot', user?: { __typename?: 'Member', location: string, onCampus: boolean, dietaryRestrictions: string, conflicts: string, previousSemester?: { __typename?: 'ActiveSemester', enrollment: Enrollment, section: string } | null } | null };

export type CurrentOfficersQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOfficersQuery = { __typename?: 'QueryRoot', officers: Array<{ __typename?: 'MemberRole', role: string, member: { __typename?: 'Member', email: string, fullName: string } }>, members: Array<{ __typename?: 'Member', email: string, fullName: string }> };

export type EditCarpoolContextQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type EditCarpoolContextQuery = { __typename?: 'QueryRoot', members: Array<{ __typename?: 'Member', email: string, fullName: string, location: string, passengers: number }>, event: { __typename?: 'Event', name: string, carpools: Array<{ __typename?: 'Carpool', driver: { __typename?: 'Member', email: string, fullName: string, location: string, passengers: number }, passengers: Array<{ __typename?: 'Member', email: string, fullName: string, location: string, passengers: number }> }> } };

export type FullEventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullEventQuery = { __typename?: 'QueryRoot', event: { __typename?: 'Event', id: number, name: string, semester: string, type: string, points: number, comments: string, location: string, gigCount: boolean, defaultAttend: boolean, callTime: { __typename?: 'DateTime', date: string, time: string }, releaseTime?: { __typename?: 'DateTime', date: string, time: string } | null, gig?: { __typename?: 'Gig', public: boolean, summary: string, description: string, contactName: string, contactEmail: string, contactPhone: string, price?: number | null, performanceTime: { __typename?: 'DateTime', date: string, time: string }, uniform: { __typename?: 'Uniform', id: number, name: string, description: string, color?: string | null } } | null, userAttendance?: { __typename?: 'Attendance', shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number, rsvpIssue?: string | null, approvedAbsence: boolean, denyCredit: boolean, absenceRequest?: { __typename?: 'AbsenceRequest', state: AbsenceRequestStatus } | null } | null, allAttendance: Array<{ __typename?: 'Attendance', didAttend: boolean, shouldAttend: boolean, confirmed: boolean, minutesLate: number, member: { __typename?: 'Member', fullName: string, email: string, semester?: { __typename?: 'ActiveSemester', section: string } | null } }>, carpools: Array<{ __typename?: 'Carpool', driver: { __typename?: 'Member', email: string, fullName: string, location: string, passengers: number }, passengers: Array<{ __typename?: 'Member', email: string, fullName: string, location: string, passengers: number }> }>, setlist: Array<{ __typename?: 'Song', id: number, title: string, key?: Pitch | null, mode?: SongMode | null, startingPitch?: Pitch | null }> } };

export type FullMemberQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type FullMemberQuery = { __typename?: 'QueryRoot', member: { __typename?: 'Member', email: string, firstName: string, preferredName?: string | null, lastName: string, phoneNumber: string, picture: string, passengers: number, location: string, onCampus: boolean, about: string, major: string, minor: string, hometown: string, arrivedAtTech?: number | null, gatewayDrug: string, conflicts: string, dietaryRestrictions: string, fullName: string, semester?: { __typename?: 'ActiveSemester', enrollment: Enrollment, section: string } | null, positions: Array<{ __typename?: 'Role', name: string }>, semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section: string, grades: { __typename?: 'Grades', grade: number } }>, transactions: Array<{ __typename?: 'ClubTransaction', id: number, amount: number, description: string, semester?: string | null, type: string, resolved: boolean, time: { __typename?: 'DateTime', date: string, time: string } }>, grades: { __typename?: 'Grades', grade: number, eventsWithChanges: Array<{ __typename?: 'EventWithGradeChange', event: { __typename?: 'Event', id: number, name: string, type: string, callTime: { __typename?: 'DateTime', date: string, time: string }, attendance?: { __typename?: 'Attendance', didAttend: boolean, shouldAttend: boolean, confirmed: boolean, minutesLate: number } | null }, change: { __typename?: 'GradeChange', reason: string, change: number, partialScore: number } }> } } };

export type FullMinutesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullMinutesQuery = { __typename?: 'QueryRoot', meetingMinutes: { __typename?: 'Minutes', id: number, name: string, date: string, public?: string | null, private?: string | null } };

export type FullSongQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FullSongQuery = { __typename?: 'QueryRoot', song: { __typename?: 'Song', id: number, title: string, info: string, current: boolean, key?: Pitch | null, startingPitch?: Pitch | null, mode?: SongMode | null, linkSections: Array<{ __typename?: 'SongLinkSection', name: string, links: Array<{ __typename?: 'SongLink', id: number, name: string, type: string, url: string }> }> } };

export type GigRequestForNewEventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GigRequestForNewEventQuery = { __typename?: 'QueryRoot', gigRequest: { __typename?: 'GigRequest', id: number, name: string, organization: string, contactName: string, contactPhone: string, contactEmail: string, location: string, comments: string, status: GigRequestStatus, time: { __typename?: 'DateTime', date: string, time: string }, startTime: { __typename?: 'DateTime', date: string, time: string } } };

export type MemberSemestersQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type MemberSemestersQuery = { __typename?: 'QueryRoot', member: { __typename?: 'Member', semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section: string, grades: { __typename?: 'Grades', grade: number } }> } };

export type SiteContextQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteContextQuery = { __typename?: 'QueryRoot', currentSemester: { __typename?: 'Semester', name: string, startDate: string, endDate: string, gigRequirement: number }, user?: { __typename?: 'Member', email: string, firstName: string, preferredName?: string | null, lastName: string, fullName: string, phoneNumber: string, picture: string, passengers: number, location: string, onCampus: boolean, about: string, major: string, minor: string, hometown: string, arrivedAtTech?: number | null, gatewayDrug: string, conflicts: string, dietaryRestrictions: string, semester?: { __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section: string } | null, positions: Array<{ __typename?: 'Role', name: string }>, permissions: Array<{ __typename?: 'MemberPermission', name: string, eventType?: string | null }>, semesters: Array<{ __typename?: 'ActiveSemester', semester: string, enrollment: Enrollment, section: string }>, grades: { __typename?: 'Grades', grade: number, volunteerGigsAttended: Array<{ __typename?: 'Event', id: number, name: string, callTime: { __typename?: 'DateTime', date: string, time: string }, releaseTime?: { __typename?: 'DateTime', date: string, time: string } | null }>, eventsWithChanges: Array<{ __typename?: 'EventWithGradeChange', event: { __typename?: 'Event', id: number, name: string, callTime: { __typename?: 'DateTime', date: string, time: string }, releaseTime?: { __typename?: 'DateTime', date: string, time: string } | null }, change: { __typename?: 'GradeChange', change: number, partialScore: number, reason: string } }> }, transactions: Array<{ __typename?: 'ClubTransaction', id: number, amount: number, description: string, semester?: string | null, type: string, resolved: boolean, time: { __typename?: 'DateTime', date: string, time: string } }> } | null, static: { __typename?: 'StaticData', sections: Array<{ __typename?: 'SectionType', name: string }>, permissions: Array<{ __typename?: 'Permission', name: string, description?: string | null, type: PermissionType }>, roles: Array<{ __typename?: 'Role', name: string, rank: number, maxQuantity: number }>, mediaTypes: Array<{ __typename?: 'MediaType', name: string, order: number, storage: StorageType }>, eventTypes: Array<{ __typename?: 'EventType', name: string, weight: number }>, transactionTypes: Array<{ __typename?: 'TransactionType', name: string }> } };

export type TransactionsForSemesterQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsForSemesterQuery = { __typename?: 'QueryRoot', transactions: Array<{ __typename?: 'ClubTransaction', id: number, amount: number, description: string, semester?: string | null, type: string, resolved: boolean, member: { __typename?: 'Member', email: string, fullName: string }, time: { __typename?: 'DateTime', date: string, time: string } }> };


export const AddOfficershipDocument = gql`
    mutation AddOfficership($role: String!, $email: String!) {
  addOfficership(role: $role, email: $email)
}
    `;
export const AddTransactionBatchDocument = gql`
    mutation AddTransactionBatch($batch: TransactionBatch!) {
  addBatchOfTransactions(batch: $batch) {
    id
  }
}
    `;
export const ChargeDuesDocument = gql`
    mutation ChargeDues {
  chargeDues {
    id
  }
}
    `;
export const ChargeLateDuesDocument = gql`
    mutation ChargeLateDues {
  chargeLateDues {
    id
  }
}
    `;
export const ConfirmForEventDocument = gql`
    mutation ConfirmForEvent($id: Int!) {
  confirmForEvent(id: $id) {
    confirmed
  }
}
    `;
export const CreateDocumentLinkDocument = gql`
    mutation CreateDocumentLink($name: String!, $url: String!) {
  createLink(name: $name, url: $url) {
    name
    url
  }
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($newEvent: NewEvent!, $gigRequestId: Int) {
  createEvent(newEvent: $newEvent, gigRequestId: $gigRequestId) {
    id
  }
}
    `;
export const CreateMinutesDocument = gql`
    mutation CreateMinutes($name: String!) {
  createMeetingMinutes(name: $name) {
    id
  }
}
    `;
export const CreateSemesterDocument = gql`
    mutation CreateSemester($newSemester: NewSemester!) {
  createSemester(newSemester: $newSemester) {
    name
  }
}
    `;
export const CreateSongDocument = gql`
    mutation CreateSong($title: String!) {
  createSong(newSong: {title: $title}) {
    id
  }
}
    `;
export const CreateSongLinkDocument = gql`
    mutation CreateSongLink($songId: Int!, $newLink: NewSongLink!) {
  createSongLink(songId: $songId, newLink: $newLink) {
    id
  }
}
    `;
export const CreateUniformDocument = gql`
    mutation CreateUniform($newUniform: NewUniform!) {
  createUniform(newUniform: $newUniform) {
    id
  }
}
    `;
export const DeleteDocumentLinkDocument = gql`
    mutation DeleteDocumentLink($name: String!) {
  deleteLink(name: $name) {
    name
    url
  }
}
    `;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Int!) {
  deleteEvent(id: $id)
}
    `;
export const DeleteMeetingMinutesDocument = gql`
    mutation DeleteMeetingMinutes($id: Int!) {
  deleteMeetingMinutes(id: $id) {
    id
  }
}
    `;
export const DeleteMemberDocument = gql`
    mutation DeleteMember($email: String!) {
  deleteMember(email: $email)
}
    `;
export const DeleteSongDocument = gql`
    mutation DeleteSong($id: Int!) {
  deleteSong(id: $id) {
    id
  }
}
    `;
export const DeleteSongLinkDocument = gql`
    mutation DeleteSongLink($id: Int!) {
  deleteSongLink(id: $id) {
    id
  }
}
    `;
export const DeleteUniformDocument = gql`
    mutation DeleteUniform($id: Int!) {
  deleteUniform(id: $id) {
    id
  }
}
    `;
export const DisableRolePermissionDocument = gql`
    mutation DisableRolePermission($rolePermission: NewRolePermission!) {
  removePermissionFromRole(rolePermission: $rolePermission)
}
    `;
export const DismissGigRequestDocument = gql`
    mutation DismissGigRequest($id: Int!) {
  dismissGigRequest(id: $id) {
    id
  }
}
    `;
export const EnableRolePermissionDocument = gql`
    mutation EnableRolePermission($rolePermission: NewRolePermission!) {
  addPermissionToRole(rolePermission: $rolePermission)
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $passHash: String!) {
  login(email: $email, passHash: $passHash)
}
    `;
export const LoginAsDocument = gql`
    mutation LoginAs($email: String!) {
  loginAs(email: $email)
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const RegisterForSemesterDocument = gql`
    mutation RegisterForSemester($newSemester: RegisterForSemesterForm!) {
  registerForSemester(newSemester: $newSemester) {
    email
  }
}
    `;
export const RegisterMemberDocument = gql`
    mutation RegisterMember($newMember: NewMember!) {
  registerMember(newMember: $newMember) {
    email
  }
}
    `;
export const RemoveOfficershipDocument = gql`
    mutation RemoveOfficership($role: String!, $email: String!) {
  removeOfficership(role: $role, email: $email)
}
    `;
export const ReopenGigRequestDocument = gql`
    mutation ReopenGigRequest($id: Int!) {
  reopenGigRequest(id: $id) {
    id
  }
}
    `;
export const RequestAbsenceDocument = gql`
    mutation RequestAbsence($eventId: Int!, $reason: String!) {
  submitAbsenceRequest(eventId: $eventId, reason: $reason) {
    reason
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $passHash: String!) {
  resetPassword(token: $token, passHash: $passHash)
}
    `;
export const ResolveTransactionDocument = gql`
    mutation ResolveTransaction($id: Int!, $resolved: Boolean!) {
  resolveTransaction(id: $id, resolved: $resolved) {
    id
  }
}
    `;
export const RespondToAbsenceRequestDocument = gql`
    mutation RespondToAbsenceRequest($eventId: Int!, $email: String!, $approved: Boolean!) {
  respondToAbsenceRequest(eventId: $eventId, email: $email, approved: $approved) {
    reason
  }
}
    `;
export const RsvpForEventDocument = gql`
    mutation RsvpForEvent($id: Int!, $attending: Boolean!) {
  rsvpForEvent(id: $id, attending: $attending) {
    shouldAttend
  }
}
    `;
export const SetCurrentSemesterDocument = gql`
    mutation SetCurrentSemester($name: String!) {
  setCurrentSemester(name: $name) {
    name
  }
}
    `;
export const UpdateAttendanceDocument = gql`
    mutation UpdateAttendance($eventId: Int!, $member: String!, $update: AttendanceUpdate!) {
  updateAttendance(eventId: $eventId, email: $member, update: $update) {
    shouldAttend
    didAttend
    confirmed
    minutesLate
  }
}
    `;
export const UpdateCarpoolsDocument = gql`
    mutation UpdateCarpools($eventId: Int!, $carpools: [UpdatedCarpool!]!) {
  updateCarpools(eventId: $eventId, carpools: $carpools) {
    id
  }
}
    `;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: Int!, $newEvent: NewEvent!) {
  updateEvent(id: $id, newEvent: $newEvent) {
    id
  }
}
    `;
export const UpdateFeeDocument = gql`
    mutation UpdateFee($name: String!, $amount: Int!) {
  updateFeeAmount(name: $name, amount: $amount) {
    name
  }
}
    `;
export const UpdateMeetingMinutesDocument = gql`
    mutation UpdateMeetingMinutes($id: Int!, $update: UpdatedMeetingMinutes!) {
  updateMeetingMinutes(id: $id, update: $update) {
    id
  }
}
    `;
export const UpdateMemberDocument = gql`
    mutation UpdateMember($email: String!, $update: MemberUpdate!) {
  updateMember(email: $email, newMember: $update) {
    email
  }
}
    `;
export const UpdateSemesterDocument = gql`
    mutation UpdateSemester($name: String!, $update: NewSemester!) {
  updateSemester(name: $name, update: $update) {
    name
  }
}
    `;
export const UpdateSongDocument = gql`
    mutation UpdateSong($id: Int!, $update: SongUpdate!) {
  updateSong(id: $id, update: $update) {
    id
  }
}
    `;
export const UpdateUniformDocument = gql`
    mutation UpdateUniform($id: Int!, $update: NewUniform!) {
  updateUniform(id: $id, update: $update) {
    id
  }
}
    `;
export const AllAbsenceRequestsDocument = gql`
    query AllAbsenceRequests {
  absenceRequests {
    time {
      date
      time
    }
    reason
    state
    event {
      id
      name
      location
      callTime {
        date
        time
      }
    }
    member {
      email
      fullName
    }
  }
}
    `;
export const AllDocumentLinksDocument = gql`
    query AllDocumentLinks {
  links {
    name
    url
  }
}
    `;
export const AllEventsDocument = gql`
    query AllEvents {
  events {
    id
    name
    type
    callTime {
      date
      time
    }
    releaseTime {
      date
      time
    }
    userAttendance {
      shouldAttend
      didAttend
      confirmed
      minutesLate
    }
  }
}
    `;
export const AllFeesDocument = gql`
    query AllFees {
  fees {
    name
    description
    amount
  }
}
    `;
export const AllGigRequestsDocument = gql`
    query AllGigRequests {
  gigRequests {
    id
    time {
      date
      time
    }
    name
    organization
    contactName
    contactPhone
    contactEmail
    startTime {
      date
      time
    }
    location
    comments
    status
    event {
      id
      name
      semester
    }
  }
}
    `;
export const AllMembersDocument = gql`
    query AllMembers {
  members {
    email
    phoneNumber
    fullName
    location
    semester {
      section
    }
  }
}
    `;
export const AllMinutesDocument = gql`
    query AllMinutes {
  allMeetingMinutes {
    id
    name
    date
  }
}
    `;
export const AllRolePermissionsDocument = gql`
    query AllRolePermissions {
  currentPermissions {
    id
    role
    permission
    eventType
  }
}
    `;
export const AllSemestersDocument = gql`
    query AllSemesters {
  semesters {
    name
  }
}
    `;
export const AllSongsDocument = gql`
    query AllSongs {
  songs {
    id
    title
    current
  }
}
    `;
export const AllUniformsDocument = gql`
    query AllUniforms {
  uniforms {
    id
    name
    color
    description
  }
}
    `;
export const ConfirmSemesterFormDocument = gql`
    query ConfirmSemesterForm {
  user {
    location
    onCampus
    previousSemester {
      enrollment
      section
    }
    dietaryRestrictions
    conflicts
  }
}
    `;
export const CurrentOfficersDocument = gql`
    query CurrentOfficers {
  officers {
    role
    member {
      email
      fullName
    }
  }
  members {
    email
    fullName
  }
}
    `;
export const EditCarpoolContextDocument = gql`
    query EditCarpoolContext($eventId: Int!) {
  members {
    email
    fullName
    location
    passengers
  }
  event(id: $eventId) {
    name
    carpools {
      driver {
        email
        fullName
        location
        passengers
      }
      passengers {
        email
        fullName
        location
        passengers
      }
    }
  }
}
    `;
export const FullEventDocument = gql`
    query FullEvent($id: Int!) {
  event(id: $id) {
    id
    name
    semester
    type
    callTime {
      date
      time
    }
    releaseTime {
      date
      time
    }
    points
    comments
    location
    gigCount
    defaultAttend
    gig {
      public
      summary
      description
      contactName
      contactEmail
      contactPhone
      price
      performanceTime {
        date
        time
      }
      uniform {
        id
        name
        description
        color
      }
    }
    userAttendance {
      shouldAttend
      didAttend
      confirmed
      minutesLate
      rsvpIssue
      approvedAbsence
      denyCredit
      absenceRequest {
        state
      }
    }
    allAttendance(emptyIfNotPermitted: true) {
      member {
        fullName
        email
        semester {
          section
        }
      }
      didAttend
      shouldAttend
      confirmed
      minutesLate
    }
    carpools {
      driver {
        email
        fullName
        location
        passengers
      }
      passengers {
        email
        fullName
        location
        passengers
      }
    }
    setlist {
      id
      title
      key
      mode
      startingPitch
    }
  }
}
    `;
export const FullMemberDocument = gql`
    query FullMember($email: String!) {
  member(email: $email) {
    email
    firstName
    preferredName
    lastName
    phoneNumber
    picture
    passengers
    location
    onCampus
    about
    major
    minor
    hometown
    arrivedAtTech
    gatewayDrug
    conflicts
    dietaryRestrictions
    fullName
    semester {
      enrollment
      section
    }
    positions {
      name
    }
    semesters {
      semester
      enrollment
      section
      grades {
        grade
      }
    }
    transactions {
      id
      time {
        date
        time
      }
      amount
      description
      semester
      type
      resolved
    }
    grades {
      grade
      eventsWithChanges {
        event {
          id
          name
          type
          callTime {
            date
            time
          }
          attendance(member: $email) {
            didAttend
            shouldAttend
            confirmed
            minutesLate
          }
        }
        change {
          reason
          change
          partialScore
        }
      }
    }
  }
}
    `;
export const FullMinutesDocument = gql`
    query FullMinutes($id: Int!) {
  meetingMinutes(id: $id) {
    id
    name
    date
    public
    private
  }
}
    `;
export const FullSongDocument = gql`
    query FullSong($id: Int!) {
  song(id: $id) {
    id
    title
    info
    current
    key
    startingPitch
    mode
    linkSections {
      name
      links {
        id
        name
        type
        url
      }
    }
  }
}
    `;
export const GigRequestForNewEventDocument = gql`
    query GigRequestForNewEvent($id: Int!) {
  gigRequest(id: $id) {
    id
    time {
      date
      time
    }
    name
    organization
    contactName
    contactPhone
    contactEmail
    startTime {
      date
      time
    }
    location
    comments
    status
  }
}
    `;
export const MemberSemestersDocument = gql`
    query MemberSemesters($email: String!) {
  member(email: $email) {
    semesters {
      semester
      enrollment
      section
      grades {
        grade
      }
    }
  }
}
    `;
export const SiteContextDocument = gql`
    query SiteContext {
  currentSemester {
    name
    startDate
    endDate
    gigRequirement
  }
  user {
    email
    firstName
    preferredName
    lastName
    fullName
    phoneNumber
    picture
    passengers
    location
    onCampus
    about
    major
    minor
    hometown
    arrivedAtTech
    gatewayDrug
    conflicts
    dietaryRestrictions
    semester {
      semester
      enrollment
      section
    }
    positions {
      name
    }
    permissions {
      name
      eventType
    }
    semesters {
      semester
      enrollment
      section
    }
    grades {
      grade
      volunteerGigsAttended {
        id
        name
        callTime {
          date
          time
        }
        releaseTime {
          date
          time
        }
      }
      eventsWithChanges {
        event {
          id
          name
          callTime {
            date
            time
          }
          releaseTime {
            date
            time
          }
        }
        change {
          change
          partialScore
          reason
        }
      }
    }
    transactions {
      id
      time {
        date
        time
      }
      amount
      description
      semester
      type
      resolved
    }
  }
  static {
    sections {
      name
    }
    permissions {
      name
      description
      type
    }
    roles {
      name
      rank
      maxQuantity
    }
    mediaTypes {
      name
    }
    eventTypes {
      name
      weight
    }
    transactionTypes {
      name
    }
    mediaTypes {
      name
      order
      storage
    }
  }
}
    `;
export const TransactionsForSemesterDocument = gql`
    query TransactionsForSemester {
  transactions {
    id
    member {
      email
      fullName
    }
    time {
      date
      time
    }
    amount
    description
    semester
    type
    resolved
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddOfficership(variables: AddOfficershipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddOfficershipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddOfficershipMutation>(AddOfficershipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddOfficership', 'mutation');
    },
    AddTransactionBatch(variables: AddTransactionBatchMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddTransactionBatchMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddTransactionBatchMutation>(AddTransactionBatchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddTransactionBatch', 'mutation');
    },
    ChargeDues(variables?: ChargeDuesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChargeDuesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChargeDuesMutation>(ChargeDuesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChargeDues', 'mutation');
    },
    ChargeLateDues(variables?: ChargeLateDuesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChargeLateDuesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChargeLateDuesMutation>(ChargeLateDuesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChargeLateDues', 'mutation');
    },
    ConfirmForEvent(variables: ConfirmForEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ConfirmForEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConfirmForEventMutation>(ConfirmForEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ConfirmForEvent', 'mutation');
    },
    CreateDocumentLink(variables: CreateDocumentLinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDocumentLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDocumentLinkMutation>(CreateDocumentLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateDocumentLink', 'mutation');
    },
    CreateEvent(variables: CreateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>(CreateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEvent', 'mutation');
    },
    CreateMinutes(variables: CreateMinutesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMinutesMutation>(CreateMinutesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateMinutes', 'mutation');
    },
    CreateSemester(variables: CreateSemesterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSemesterMutation>(CreateSemesterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateSemester', 'mutation');
    },
    CreateSong(variables: CreateSongMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSongMutation>(CreateSongDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateSong', 'mutation');
    },
    CreateSongLink(variables: CreateSongLinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateSongLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSongLinkMutation>(CreateSongLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateSongLink', 'mutation');
    },
    CreateUniform(variables: CreateUniformMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUniformMutation>(CreateUniformDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUniform', 'mutation');
    },
    DeleteDocumentLink(variables: DeleteDocumentLinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteDocumentLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDocumentLinkMutation>(DeleteDocumentLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteDocumentLink', 'mutation');
    },
    DeleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>(DeleteEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEvent', 'mutation');
    },
    DeleteMeetingMinutes(variables: DeleteMeetingMinutesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMeetingMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMeetingMinutesMutation>(DeleteMeetingMinutesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteMeetingMinutes', 'mutation');
    },
    DeleteMember(variables: DeleteMemberMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMemberMutation>(DeleteMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteMember', 'mutation');
    },
    DeleteSong(variables: DeleteSongMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteSongMutation>(DeleteSongDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteSong', 'mutation');
    },
    DeleteSongLink(variables: DeleteSongLinkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteSongLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteSongLinkMutation>(DeleteSongLinkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteSongLink', 'mutation');
    },
    DeleteUniform(variables: DeleteUniformMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUniformMutation>(DeleteUniformDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUniform', 'mutation');
    },
    DisableRolePermission(variables: DisableRolePermissionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DisableRolePermissionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DisableRolePermissionMutation>(DisableRolePermissionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DisableRolePermission', 'mutation');
    },
    DismissGigRequest(variables: DismissGigRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DismissGigRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DismissGigRequestMutation>(DismissGigRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DismissGigRequest', 'mutation');
    },
    EnableRolePermission(variables: EnableRolePermissionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EnableRolePermissionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EnableRolePermissionMutation>(EnableRolePermissionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EnableRolePermission', 'mutation');
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ForgotPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ForgotPasswordMutation>(ForgotPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ForgotPassword', 'mutation');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation');
    },
    LoginAs(variables: LoginAsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginAsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginAsMutation>(LoginAsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LoginAs', 'mutation');
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Logout', 'mutation');
    },
    RegisterForSemester(variables: RegisterForSemesterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterForSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterForSemesterMutation>(RegisterForSemesterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterForSemester', 'mutation');
    },
    RegisterMember(variables: RegisterMemberMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMemberMutation>(RegisterMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterMember', 'mutation');
    },
    RemoveOfficership(variables: RemoveOfficershipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveOfficershipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveOfficershipMutation>(RemoveOfficershipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveOfficership', 'mutation');
    },
    ReopenGigRequest(variables: ReopenGigRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReopenGigRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReopenGigRequestMutation>(ReopenGigRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReopenGigRequest', 'mutation');
    },
    RequestAbsence(variables: RequestAbsenceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RequestAbsenceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestAbsenceMutation>(RequestAbsenceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RequestAbsence', 'mutation');
    },
    ResetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResetPassword', 'mutation');
    },
    ResolveTransaction(variables: ResolveTransactionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResolveTransactionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResolveTransactionMutation>(ResolveTransactionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResolveTransaction', 'mutation');
    },
    RespondToAbsenceRequest(variables: RespondToAbsenceRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RespondToAbsenceRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RespondToAbsenceRequestMutation>(RespondToAbsenceRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RespondToAbsenceRequest', 'mutation');
    },
    RsvpForEvent(variables: RsvpForEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RsvpForEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RsvpForEventMutation>(RsvpForEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RsvpForEvent', 'mutation');
    },
    SetCurrentSemester(variables: SetCurrentSemesterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetCurrentSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetCurrentSemesterMutation>(SetCurrentSemesterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetCurrentSemester', 'mutation');
    },
    UpdateAttendance(variables: UpdateAttendanceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateAttendanceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAttendanceMutation>(UpdateAttendanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAttendance', 'mutation');
    },
    UpdateCarpools(variables: UpdateCarpoolsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateCarpoolsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCarpoolsMutation>(UpdateCarpoolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateCarpools', 'mutation');
    },
    UpdateEvent(variables: UpdateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>(UpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateEvent', 'mutation');
    },
    UpdateFee(variables: UpdateFeeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateFeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateFeeMutation>(UpdateFeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateFee', 'mutation');
    },
    UpdateMeetingMinutes(variables: UpdateMeetingMinutesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMeetingMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMeetingMinutesMutation>(UpdateMeetingMinutesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateMeetingMinutes', 'mutation');
    },
    UpdateMember(variables: UpdateMemberMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMemberMutation>(UpdateMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateMember', 'mutation');
    },
    UpdateSemester(variables: UpdateSemesterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateSemesterMutation>(UpdateSemesterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateSemester', 'mutation');
    },
    UpdateSong(variables: UpdateSongMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateSongMutation>(UpdateSongDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateSong', 'mutation');
    },
    UpdateUniform(variables: UpdateUniformMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUniformMutation>(UpdateUniformDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUniform', 'mutation');
    },
    AllAbsenceRequests(variables?: AllAbsenceRequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllAbsenceRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllAbsenceRequestsQuery>(AllAbsenceRequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllAbsenceRequests', 'query');
    },
    AllDocumentLinks(variables?: AllDocumentLinksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllDocumentLinksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllDocumentLinksQuery>(AllDocumentLinksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllDocumentLinks', 'query');
    },
    AllEvents(variables?: AllEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllEventsQuery>(AllEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllEvents', 'query');
    },
    AllFees(variables?: AllFeesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllFeesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllFeesQuery>(AllFeesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllFees', 'query');
    },
    AllGigRequests(variables?: AllGigRequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllGigRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllGigRequestsQuery>(AllGigRequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllGigRequests', 'query');
    },
    AllMembers(variables?: AllMembersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllMembersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllMembersQuery>(AllMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllMembers', 'query');
    },
    AllMinutes(variables?: AllMinutesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllMinutesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllMinutesQuery>(AllMinutesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllMinutes', 'query');
    },
    AllRolePermissions(variables?: AllRolePermissionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllRolePermissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllRolePermissionsQuery>(AllRolePermissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllRolePermissions', 'query');
    },
    AllSemesters(variables?: AllSemestersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllSemestersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSemestersQuery>(AllSemestersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllSemesters', 'query');
    },
    AllSongs(variables?: AllSongsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllSongsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSongsQuery>(AllSongsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllSongs', 'query');
    },
    AllUniforms(variables?: AllUniformsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllUniformsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUniformsQuery>(AllUniformsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllUniforms', 'query');
    },
    ConfirmSemesterForm(variables?: ConfirmSemesterFormQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ConfirmSemesterFormQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConfirmSemesterFormQuery>(ConfirmSemesterFormDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ConfirmSemesterForm', 'query');
    },
    CurrentOfficers(variables?: CurrentOfficersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentOfficersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentOfficersQuery>(CurrentOfficersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CurrentOfficers', 'query');
    },
    EditCarpoolContext(variables: EditCarpoolContextQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditCarpoolContextQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditCarpoolContextQuery>(EditCarpoolContextDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditCarpoolContext', 'query');
    },
    FullEvent(variables: FullEventQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FullEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullEventQuery>(FullEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FullEvent', 'query');
    },
    FullMember(variables: FullMemberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FullMemberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullMemberQuery>(FullMemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FullMember', 'query');
    },
    FullMinutes(variables: FullMinutesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FullMinutesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullMinutesQuery>(FullMinutesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FullMinutes', 'query');
    },
    FullSong(variables: FullSongQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FullSongQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullSongQuery>(FullSongDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FullSong', 'query');
    },
    GigRequestForNewEvent(variables: GigRequestForNewEventQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GigRequestForNewEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GigRequestForNewEventQuery>(GigRequestForNewEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GigRequestForNewEvent', 'query');
    },
    MemberSemesters(variables: MemberSemestersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MemberSemestersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MemberSemestersQuery>(MemberSemestersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MemberSemesters', 'query');
    },
    SiteContext(variables?: SiteContextQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SiteContextQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SiteContextQuery>(SiteContextDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SiteContext', 'query');
    },
    TransactionsForSemester(variables?: TransactionsForSemesterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransactionsForSemesterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionsForSemesterQuery>(TransactionsForSemesterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TransactionsForSemester', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;