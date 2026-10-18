/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from './gql-types';

import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export * from './gql-types'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AddOfficershipMutationVariables = Exact<{
  role: string;
  email: string;
}>;


export type AddOfficershipMutation = { addOfficership: boolean };

export type AddTransactionBatchMutationVariables = Exact<{
  batch: Types.TransactionBatch;
}>;


export type AddTransactionBatchMutation = { addBatchOfTransactions: Array<{ id: number }> };

export type ChargeDuesMutationVariables = Exact<{ [key: string]: never; }>;


export type ChargeDuesMutation = { chargeDues: Array<{ id: number }> };

export type ChargeLateDuesMutationVariables = Exact<{ [key: string]: never; }>;


export type ChargeLateDuesMutation = { chargeLateDues: Array<{ id: number }> };

export type ConfirmForEventMutationVariables = Exact<{
  id: number;
}>;


export type ConfirmForEventMutation = { confirmForEvent: { confirmed: boolean } };

export type CreateDocumentLinkMutationVariables = Exact<{
  name: string;
  url: string;
}>;


export type CreateDocumentLinkMutation = { createLink: { name: string, url: string } };

export type CreateEventMutationVariables = Exact<{
  newEvent: Types.NewEvent;
  gigRequestId?: number | null | undefined;
}>;


export type CreateEventMutation = { createEvent: { id: number } };

export type CreateMinutesMutationVariables = Exact<{
  name: string;
}>;


export type CreateMinutesMutation = { createMeetingMinutes: { id: number } };

export type CreateSemesterMutationVariables = Exact<{
  newSemester: Types.NewSemester;
}>;


export type CreateSemesterMutation = { createSemester: { name: string } };

export type CreateSongMutationVariables = Exact<{
  title: string;
}>;


export type CreateSongMutation = { createSong: { id: number } };

export type CreateSongLinkMutationVariables = Exact<{
  songId: number;
  newLink: Types.NewSongLink;
}>;


export type CreateSongLinkMutation = { createSongLink: { id: number } };

export type CreateUniformMutationVariables = Exact<{
  newUniform: Types.NewUniform;
}>;


export type CreateUniformMutation = { createUniform: { id: number } };

export type DeleteDocumentLinkMutationVariables = Exact<{
  name: string;
}>;


export type DeleteDocumentLinkMutation = { deleteLink: { name: string, url: string } };

export type DeleteEventMutationVariables = Exact<{
  id: number;
}>;


export type DeleteEventMutation = { deleteEvent: number };

export type DeleteMeetingMinutesMutationVariables = Exact<{
  id: number;
}>;


export type DeleteMeetingMinutesMutation = { deleteMeetingMinutes: { id: number } };

export type DeleteMemberMutationVariables = Exact<{
  email: string;
}>;


export type DeleteMemberMutation = { deleteMember: string };

export type DeleteSongMutationVariables = Exact<{
  id: number;
}>;


export type DeleteSongMutation = { deleteSong: { id: number } };

export type DeleteSongLinkMutationVariables = Exact<{
  id: number;
}>;


export type DeleteSongLinkMutation = { deleteSongLink: { id: number } };

export type DeleteUniformMutationVariables = Exact<{
  id: number;
}>;


export type DeleteUniformMutation = { deleteUniform: { id: number } };

export type DisableRolePermissionMutationVariables = Exact<{
  rolePermission: Types.NewRolePermission;
}>;


export type DisableRolePermissionMutation = { removePermissionFromRole: boolean };

export type DismissGigRequestMutationVariables = Exact<{
  id: number;
}>;


export type DismissGigRequestMutation = { dismissGigRequest: { id: number } };

export type EnableRolePermissionMutationVariables = Exact<{
  rolePermission: Types.NewRolePermission;
}>;


export type EnableRolePermissionMutation = { addPermissionToRole: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: string;
}>;


export type ForgotPasswordMutation = { forgotPassword: string };

export type LoginMutationVariables = Exact<{
  email: string;
  passHash: string;
}>;


export type LoginMutation = { login: string };

export type LoginAsMutationVariables = Exact<{
  email: string;
}>;


export type LoginAsMutation = { loginAs: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: string };

export type RegisterForSemesterMutationVariables = Exact<{
  newSemester: Types.RegisterForSemesterForm;
}>;


export type RegisterForSemesterMutation = { registerForSemester: { email: string } };

export type RegisterMemberMutationVariables = Exact<{
  newMember: Types.NewMember;
}>;


export type RegisterMemberMutation = { registerMember: { email: string } };

export type RemoveOfficershipMutationVariables = Exact<{
  role: string;
  email: string;
}>;


export type RemoveOfficershipMutation = { removeOfficership: boolean };

export type ReopenGigRequestMutationVariables = Exact<{
  id: number;
}>;


export type ReopenGigRequestMutation = { reopenGigRequest: { id: number } };

export type RequestAbsenceMutationVariables = Exact<{
  eventId: number;
  reason: string;
}>;


export type RequestAbsenceMutation = { submitAbsenceRequest: { reason: string } };

export type ResetPasswordMutationVariables = Exact<{
  token: string;
  passHash: string;
}>;


export type ResetPasswordMutation = { resetPassword: string };

export type ResolveTransactionMutationVariables = Exact<{
  id: number;
  resolved: boolean;
}>;


export type ResolveTransactionMutation = { resolveTransaction: { id: number } };

export type RespondToAbsenceRequestMutationVariables = Exact<{
  eventId: number;
  email: string;
  approved: boolean;
}>;


export type RespondToAbsenceRequestMutation = { respondToAbsenceRequest: { reason: string } };

export type RsvpForEventMutationVariables = Exact<{
  id: number;
  attending: boolean;
}>;


export type RsvpForEventMutation = { rsvpForEvent: { shouldAttend: boolean } };

export type SetCurrentSemesterMutationVariables = Exact<{
  name: string;
}>;


export type SetCurrentSemesterMutation = { setCurrentSemester: { name: string } };

export type UpdateAttendanceMutationVariables = Exact<{
  eventId: number;
  member: string;
  update: Types.AttendanceUpdate;
}>;


export type UpdateAttendanceMutation = { updateAttendance: { shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number } };

export type UpdateCarpoolsMutationVariables = Exact<{
  eventId: number;
  carpools: Array<Types.UpdatedCarpool> | Types.UpdatedCarpool;
}>;


export type UpdateCarpoolsMutation = { updateCarpools: Array<{ id: number }> };

export type UpdateDocumentLinkMutationVariables = Exact<{
  name: string;
  url: string;
}>;


export type UpdateDocumentLinkMutation = { updateLink: { name: string, url: string } };

export type UpdateEventMutationVariables = Exact<{
  id: number;
  newEvent: Types.NewEvent;
}>;


export type UpdateEventMutation = { updateEvent: { id: number } };

export type UpdateFeeMutationVariables = Exact<{
  name: string;
  amount: number;
}>;


export type UpdateFeeMutation = { updateFeeAmount: { name: string } };

export type UpdateMeetingMinutesMutationVariables = Exact<{
  id: number;
  update: Types.UpdatedMeetingMinutes;
}>;


export type UpdateMeetingMinutesMutation = { updateMeetingMinutes: { id: number } };

export type UpdateMemberMutationVariables = Exact<{
  email: string;
  update: Types.MemberUpdate;
}>;


export type UpdateMemberMutation = { updateMember: { email: string } };

export type UpdateProfileMutationVariables = Exact<{
  update: Types.MemberUpdate;
}>;


export type UpdateProfileMutation = { updateProfile: { email: string } };

export type UpdateSemesterMutationVariables = Exact<{
  name: string;
  update: Types.NewSemester;
}>;


export type UpdateSemesterMutation = { updateSemester: { name: string } };

export type UpdateSongMutationVariables = Exact<{
  id: number;
  update: Types.SongUpdate;
}>;


export type UpdateSongMutation = { updateSong: { id: number } };

export type UpdateUniformMutationVariables = Exact<{
  id: number;
  update: Types.NewUniform;
}>;


export type UpdateUniformMutation = { updateUniform: { id: number } };

export type AllAbsenceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAbsenceRequestsQuery = { absenceRequests: Array<{ reason: string, state: Types.AbsenceRequestStatus, time: { date: string, time: string }, event: { id: number, name: string, location: string, callTime: { date: string, time: string } }, member: { email: string, fullName: string } }> };

export type AllDocumentLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDocumentLinksQuery = { links: Array<{ name: string, url: string }> };

export type AllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { events: Array<{ id: number, name: string, type: string, callTime: { date: string, time: string }, releaseTime: { date: string, time: string } | null, userAttendance: { shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number } | null }> };

export type AllFeesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeesQuery = { fees: Array<{ name: string, description: string, amount: number }> };

export type AllGigRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGigRequestsQuery = { gigRequests: Array<{ id: number, name: string, organization: string, contactName: string, contactPhone: string, contactEmail: string, location: string, comments: string, status: Types.GigRequestStatus, time: { date: string, time: string }, startTime: { date: string, time: string }, event: { id: number, name: string, semester: string } | null }> };

export type AllMembersQueryVariables = Exact<{
  includeInactive: boolean;
}>;


export type AllMembersQuery = { members: Array<{ email: string, phoneNumber: string, fullName: string, location: string, semester: { section: string } | null }> };

export type AllMinutesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMinutesQuery = { allMeetingMinutes: Array<{ id: number, name: string, date: string }> };

export type AllRolePermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRolePermissionsQuery = { currentPermissions: Array<{ id: number, role: string, permission: string, eventType: string | null }> };

export type AllSemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSemestersQuery = { semesters: Array<{ name: string }> };

export type AllSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSongsQuery = { songs: Array<{ id: number, title: string, current: boolean }> };

export type AllUniformsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUniformsQuery = { uniforms: Array<{ id: number, name: string, color: string | null, description: string }> };

export type ConfirmSemesterFormQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfirmSemesterFormQuery = { user: { location: string, onCampus: boolean, dietaryRestrictions: string, conflicts: string, previousSemester: { enrollment: Types.Enrollment, section: string } | null } | null };

export type CurrentOfficersQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOfficersQuery = { officers: Array<{ role: string, member: { email: string, fullName: string } }>, members: Array<{ email: string, fullName: string }> };

export type EditCarpoolContextQueryVariables = Exact<{
  eventId: number;
}>;


export type EditCarpoolContextQuery = { members: Array<{ __typename: 'Member', email: string, fullName: string, location: string, passengers: number }>, event: { name: string, carpools: Array<{ driver: { __typename: 'Member', email: string, fullName: string, location: string, passengers: number }, passengers: Array<{ __typename: 'Member', email: string, fullName: string, location: string, passengers: number }> }> } };

export type FullEventQueryVariables = Exact<{
  id: number;
}>;


export type FullEventQuery = { event: { id: number, name: string, semester: string, type: string, points: number, comments: string, location: string, gigCount: boolean, defaultAttend: boolean, callTime: { date: string, time: string }, releaseTime: { date: string, time: string } | null, gig: { public: boolean, summary: string, description: string, contactName: string, contactEmail: string, contactPhone: string, price: number | null, performanceTime: { date: string, time: string }, uniform: { id: number, name: string, description: string, color: string | null } } | null, userAttendance: { shouldAttend: boolean, didAttend: boolean, confirmed: boolean, minutesLate: number, rsvpIssue: string | null, approvedAbsence: boolean, denyCredit: boolean, absenceRequest: { state: Types.AbsenceRequestStatus } | null } | null, allAttendance: Array<{ didAttend: boolean, shouldAttend: boolean, confirmed: boolean, minutesLate: number, member: { fullName: string, email: string, semester: { section: string } | null } }>, carpools: Array<{ driver: { __typename: 'Member', email: string, fullName: string, location: string, passengers: number }, passengers: Array<{ __typename: 'Member', email: string, fullName: string, location: string, passengers: number }> }>, setlist: Array<{ id: number, title: string, key: Types.Pitch | null, mode: Types.SongMode | null, startingPitch: Types.Pitch | null }> } };

export type FullMemberQueryVariables = Exact<{
  email: string;
}>;


export type FullMemberQuery = { member: { email: string, firstName: string, preferredName: string | null, lastName: string, phoneNumber: string, picture: string, passengers: number, location: string, onCampus: boolean, about: string, major: string, minor: string, hometown: string, arrivedAtTech: number | null, gatewayDrug: string, conflicts: string, dietaryRestrictions: string, fullName: string, semester: { enrollment: Types.Enrollment, section: string } | null, positions: Array<{ name: string }>, semesters: Array<{ semester: string, enrollment: Types.Enrollment, section: string, grades: { grade: number } }>, transactions: Array<{ id: number, amount: number, description: string, semester: string | null, type: string, resolved: boolean, time: { date: string, time: string } }>, grades: { grade: number, eventsWithChanges: Array<{ event: { id: number, name: string, type: string, callTime: { date: string, time: string }, attendance: { didAttend: boolean, shouldAttend: boolean, confirmed: boolean, minutesLate: number } | null }, change: { reason: string, change: number, partialScore: number } }> } } };

export type FullMinutesQueryVariables = Exact<{
  id: number;
}>;


export type FullMinutesQuery = { meetingMinutes: { id: number, name: string, date: string, public: string | null, private: string | null } };

export type FullSongQueryVariables = Exact<{
  id: number;
}>;


export type FullSongQuery = { song: { id: number, title: string, info: string, current: boolean, key: Types.Pitch | null, startingPitch: Types.Pitch | null, mode: Types.SongMode | null, linkSections: Array<{ name: string, links: Array<{ id: number, name: string, type: string, url: string }> }> } };

export type GigRequestForNewEventQueryVariables = Exact<{
  id: number;
}>;


export type GigRequestForNewEventQuery = { gigRequest: { id: number, name: string, organization: string, contactName: string, contactPhone: string, contactEmail: string, location: string, comments: string, status: Types.GigRequestStatus, time: { date: string, time: string }, startTime: { date: string, time: string } } };

export type MemberSemestersQueryVariables = Exact<{
  email: string;
}>;


export type MemberSemestersQuery = { member: { semesters: Array<{ semester: string, enrollment: Types.Enrollment, section: string, grades: { grade: number } }> } };

export type SiteContextQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteContextQuery = { currentSemester: { name: string, startDate: string, endDate: string, gigRequirement: number }, user: { email: string, firstName: string, preferredName: string | null, lastName: string, fullName: string, phoneNumber: string, picture: string, passengers: number, location: string, onCampus: boolean, about: string, major: string, minor: string, hometown: string, arrivedAtTech: number | null, gatewayDrug: string, conflicts: string, dietaryRestrictions: string, semester: { semester: string, enrollment: Types.Enrollment, section: string } | null, positions: Array<{ name: string }>, permissions: Array<{ name: string, eventType: string | null }>, semesters: Array<{ semester: string, enrollment: Types.Enrollment, section: string }>, grades: { grade: number, volunteerGigsAttended: Array<{ id: number, name: string, callTime: { date: string, time: string }, releaseTime: { date: string, time: string } | null }>, eventsWithChanges: Array<{ event: { id: number, name: string, callTime: { date: string, time: string }, releaseTime: { date: string, time: string } | null }, change: { change: number, partialScore: number, reason: string } }> }, transactions: Array<{ id: number, amount: number, description: string, semester: string | null, type: string, resolved: boolean, time: { date: string, time: string } }> } | null, static: { sections: Array<{ name: string }>, permissions: Array<{ name: string, description: string | null, type: Types.PermissionType }>, roles: Array<{ name: string, rank: number, maxQuantity: number }>, mediaTypes: Array<{ name: string, order: number, storage: Types.StorageType }>, eventTypes: Array<{ name: string, weight: number }>, transactionTypes: Array<{ name: string }> } };

export type TransactionsForSemesterQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsForSemesterQuery = { transactions: Array<{ id: number, amount: number, description: string, semester: string | null, type: string, resolved: boolean, member: { email: string, fullName: string }, time: { date: string, time: string } }> };


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
  createSong(newSong: {title: $title, info: ""}) {
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
export const UpdateDocumentLinkDocument = gql`
    mutation UpdateDocumentLink($name: String!, $url: String!) {
  updateLink(name: $name, url: $url) {
    name
    url
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($update: MemberUpdate!) {
  updateProfile(newMember: $update) {
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
    query AllMembers($includeInactive: Boolean!) {
  members(includeInactive: $includeInactive) {
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
  members(includeInactive: true) {
    email
    fullName
  }
}
    `;
export const EditCarpoolContextDocument = gql`
    query EditCarpoolContext($eventId: Int!) {
  members {
    __typename
    email
    fullName
    location
    passengers
  }
  event(id: $eventId) {
    name
    carpools {
      driver {
        __typename
        email
        fullName
        location
        passengers
      }
      passengers {
        __typename
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
        __typename
        email
        fullName
        location
        passengers
      }
      passengers {
        __typename
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddOfficership(variables: AddOfficershipMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AddOfficershipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddOfficershipMutation>({ document: AddOfficershipDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AddOfficership', 'mutation', variables);
    },
    AddTransactionBatch(variables: AddTransactionBatchMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AddTransactionBatchMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddTransactionBatchMutation>({ document: AddTransactionBatchDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AddTransactionBatch', 'mutation', variables);
    },
    ChargeDues(variables?: ChargeDuesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ChargeDuesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChargeDuesMutation>({ document: ChargeDuesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ChargeDues', 'mutation', variables);
    },
    ChargeLateDues(variables?: ChargeLateDuesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ChargeLateDuesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChargeLateDuesMutation>({ document: ChargeLateDuesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ChargeLateDues', 'mutation', variables);
    },
    ConfirmForEvent(variables: ConfirmForEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ConfirmForEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConfirmForEventMutation>({ document: ConfirmForEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ConfirmForEvent', 'mutation', variables);
    },
    CreateDocumentLink(variables: CreateDocumentLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateDocumentLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDocumentLinkMutation>({ document: CreateDocumentLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateDocumentLink', 'mutation', variables);
    },
    CreateEvent(variables: CreateEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>({ document: CreateEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateEvent', 'mutation', variables);
    },
    CreateMinutes(variables: CreateMinutesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMinutesMutation>({ document: CreateMinutesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateMinutes', 'mutation', variables);
    },
    CreateSemester(variables: CreateSemesterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSemesterMutation>({ document: CreateSemesterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSemester', 'mutation', variables);
    },
    CreateSong(variables: CreateSongMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSongMutation>({ document: CreateSongDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSong', 'mutation', variables);
    },
    CreateSongLink(variables: CreateSongLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateSongLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateSongLinkMutation>({ document: CreateSongLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateSongLink', 'mutation', variables);
    },
    CreateUniform(variables: CreateUniformMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUniformMutation>({ document: CreateUniformDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateUniform', 'mutation', variables);
    },
    DeleteDocumentLink(variables: DeleteDocumentLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteDocumentLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDocumentLinkMutation>({ document: DeleteDocumentLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteDocumentLink', 'mutation', variables);
    },
    DeleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>({ document: DeleteEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteEvent', 'mutation', variables);
    },
    DeleteMeetingMinutes(variables: DeleteMeetingMinutesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteMeetingMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMeetingMinutesMutation>({ document: DeleteMeetingMinutesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteMeetingMinutes', 'mutation', variables);
    },
    DeleteMember(variables: DeleteMemberMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMemberMutation>({ document: DeleteMemberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteMember', 'mutation', variables);
    },
    DeleteSong(variables: DeleteSongMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteSongMutation>({ document: DeleteSongDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteSong', 'mutation', variables);
    },
    DeleteSongLink(variables: DeleteSongLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteSongLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteSongLinkMutation>({ document: DeleteSongLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteSongLink', 'mutation', variables);
    },
    DeleteUniform(variables: DeleteUniformMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUniformMutation>({ document: DeleteUniformDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteUniform', 'mutation', variables);
    },
    DisableRolePermission(variables: DisableRolePermissionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DisableRolePermissionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DisableRolePermissionMutation>({ document: DisableRolePermissionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DisableRolePermission', 'mutation', variables);
    },
    DismissGigRequest(variables: DismissGigRequestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DismissGigRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DismissGigRequestMutation>({ document: DismissGigRequestDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DismissGigRequest', 'mutation', variables);
    },
    EnableRolePermission(variables: EnableRolePermissionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EnableRolePermissionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EnableRolePermissionMutation>({ document: EnableRolePermissionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'EnableRolePermission', 'mutation', variables);
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ForgotPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ForgotPasswordMutation>({ document: ForgotPasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ForgotPassword', 'mutation', variables);
    },
    Login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>({ document: LoginDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Login', 'mutation', variables);
    },
    LoginAs(variables: LoginAsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LoginAsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginAsMutation>({ document: LoginAsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LoginAs', 'mutation', variables);
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>({ document: LogoutDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Logout', 'mutation', variables);
    },
    RegisterForSemester(variables: RegisterForSemesterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegisterForSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterForSemesterMutation>({ document: RegisterForSemesterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RegisterForSemester', 'mutation', variables);
    },
    RegisterMember(variables: RegisterMemberMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegisterMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMemberMutation>({ document: RegisterMemberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RegisterMember', 'mutation', variables);
    },
    RemoveOfficership(variables: RemoveOfficershipMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RemoveOfficershipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveOfficershipMutation>({ document: RemoveOfficershipDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RemoveOfficership', 'mutation', variables);
    },
    ReopenGigRequest(variables: ReopenGigRequestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ReopenGigRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReopenGigRequestMutation>({ document: ReopenGigRequestDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ReopenGigRequest', 'mutation', variables);
    },
    RequestAbsence(variables: RequestAbsenceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RequestAbsenceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestAbsenceMutation>({ document: RequestAbsenceDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RequestAbsence', 'mutation', variables);
    },
    ResetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>({ document: ResetPasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResetPassword', 'mutation', variables);
    },
    ResolveTransaction(variables: ResolveTransactionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ResolveTransactionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResolveTransactionMutation>({ document: ResolveTransactionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResolveTransaction', 'mutation', variables);
    },
    RespondToAbsenceRequest(variables: RespondToAbsenceRequestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RespondToAbsenceRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RespondToAbsenceRequestMutation>({ document: RespondToAbsenceRequestDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RespondToAbsenceRequest', 'mutation', variables);
    },
    RsvpForEvent(variables: RsvpForEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RsvpForEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RsvpForEventMutation>({ document: RsvpForEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RsvpForEvent', 'mutation', variables);
    },
    SetCurrentSemester(variables: SetCurrentSemesterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SetCurrentSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetCurrentSemesterMutation>({ document: SetCurrentSemesterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SetCurrentSemester', 'mutation', variables);
    },
    UpdateAttendance(variables: UpdateAttendanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateAttendanceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAttendanceMutation>({ document: UpdateAttendanceDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateAttendance', 'mutation', variables);
    },
    UpdateCarpools(variables: UpdateCarpoolsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateCarpoolsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCarpoolsMutation>({ document: UpdateCarpoolsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateCarpools', 'mutation', variables);
    },
    UpdateDocumentLink(variables: UpdateDocumentLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateDocumentLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDocumentLinkMutation>({ document: UpdateDocumentLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateDocumentLink', 'mutation', variables);
    },
    UpdateEvent(variables: UpdateEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>({ document: UpdateEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateEvent', 'mutation', variables);
    },
    UpdateFee(variables: UpdateFeeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateFeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateFeeMutation>({ document: UpdateFeeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateFee', 'mutation', variables);
    },
    UpdateMeetingMinutes(variables: UpdateMeetingMinutesMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateMeetingMinutesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMeetingMinutesMutation>({ document: UpdateMeetingMinutesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateMeetingMinutes', 'mutation', variables);
    },
    UpdateMember(variables: UpdateMemberMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateMemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMemberMutation>({ document: UpdateMemberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateMember', 'mutation', variables);
    },
    UpdateProfile(variables: UpdateProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>({ document: UpdateProfileDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateProfile', 'mutation', variables);
    },
    UpdateSemester(variables: UpdateSemesterMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateSemesterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateSemesterMutation>({ document: UpdateSemesterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateSemester', 'mutation', variables);
    },
    UpdateSong(variables: UpdateSongMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateSongMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateSongMutation>({ document: UpdateSongDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateSong', 'mutation', variables);
    },
    UpdateUniform(variables: UpdateUniformMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateUniformMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUniformMutation>({ document: UpdateUniformDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateUniform', 'mutation', variables);
    },
    AllAbsenceRequests(variables?: AllAbsenceRequestsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllAbsenceRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllAbsenceRequestsQuery>({ document: AllAbsenceRequestsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllAbsenceRequests', 'query', variables);
    },
    AllDocumentLinks(variables?: AllDocumentLinksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllDocumentLinksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllDocumentLinksQuery>({ document: AllDocumentLinksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllDocumentLinks', 'query', variables);
    },
    AllEvents(variables?: AllEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllEventsQuery>({ document: AllEventsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllEvents', 'query', variables);
    },
    AllFees(variables?: AllFeesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllFeesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllFeesQuery>({ document: AllFeesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllFees', 'query', variables);
    },
    AllGigRequests(variables?: AllGigRequestsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllGigRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllGigRequestsQuery>({ document: AllGigRequestsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllGigRequests', 'query', variables);
    },
    AllMembers(variables: AllMembersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllMembersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllMembersQuery>({ document: AllMembersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllMembers', 'query', variables);
    },
    AllMinutes(variables?: AllMinutesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllMinutesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllMinutesQuery>({ document: AllMinutesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllMinutes', 'query', variables);
    },
    AllRolePermissions(variables?: AllRolePermissionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllRolePermissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllRolePermissionsQuery>({ document: AllRolePermissionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllRolePermissions', 'query', variables);
    },
    AllSemesters(variables?: AllSemestersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllSemestersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSemestersQuery>({ document: AllSemestersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllSemesters', 'query', variables);
    },
    AllSongs(variables?: AllSongsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllSongsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllSongsQuery>({ document: AllSongsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllSongs', 'query', variables);
    },
    AllUniforms(variables?: AllUniformsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllUniformsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUniformsQuery>({ document: AllUniformsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllUniforms', 'query', variables);
    },
    ConfirmSemesterForm(variables?: ConfirmSemesterFormQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ConfirmSemesterFormQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ConfirmSemesterFormQuery>({ document: ConfirmSemesterFormDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ConfirmSemesterForm', 'query', variables);
    },
    CurrentOfficers(variables?: CurrentOfficersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CurrentOfficersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentOfficersQuery>({ document: CurrentOfficersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CurrentOfficers', 'query', variables);
    },
    EditCarpoolContext(variables: EditCarpoolContextQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EditCarpoolContextQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditCarpoolContextQuery>({ document: EditCarpoolContextDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'EditCarpoolContext', 'query', variables);
    },
    FullEvent(variables: FullEventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FullEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullEventQuery>({ document: FullEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FullEvent', 'query', variables);
    },
    FullMember(variables: FullMemberQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FullMemberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullMemberQuery>({ document: FullMemberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FullMember', 'query', variables);
    },
    FullMinutes(variables: FullMinutesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FullMinutesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullMinutesQuery>({ document: FullMinutesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FullMinutes', 'query', variables);
    },
    FullSong(variables: FullSongQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FullSongQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FullSongQuery>({ document: FullSongDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FullSong', 'query', variables);
    },
    GigRequestForNewEvent(variables: GigRequestForNewEventQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GigRequestForNewEventQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GigRequestForNewEventQuery>({ document: GigRequestForNewEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GigRequestForNewEvent', 'query', variables);
    },
    MemberSemesters(variables: MemberSemestersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MemberSemestersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MemberSemestersQuery>({ document: MemberSemestersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MemberSemesters', 'query', variables);
    },
    SiteContext(variables?: SiteContextQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<SiteContextQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SiteContextQuery>({ document: SiteContextDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'SiteContext', 'query', variables);
    },
    TransactionsForSemester(variables?: TransactionsForSemesterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<TransactionsForSemesterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransactionsForSemesterQuery>({ document: TransactionsForSemesterDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TransactionsForSemester', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;