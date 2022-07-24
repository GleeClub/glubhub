import {
  Enrollment,
  MemberUpdate,
  SectionType,
  SiteContextQuery,
} from 'src/gql-operations'

export function buildProfileForm(siteContext: SiteContextQuery): MemberUpdate {
  if (siteContext.user) {
    return formForUser(siteContext.user)
  } else {
    return emptyProfileForm(siteContext.static.sections)
  }
}

export const formForUser = (
  user: Exclude<SiteContextQuery['user'], null | undefined>
): MemberUpdate => ({
  firstName: user.firstName,
  preferredName: user.preferredName,
  lastName: user.lastName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  location: user.location,
  onCampus: user.onCampus,
  major: user.major,
  minor: user.minor,
  hometown: user.hometown,
  passengers: user.passengers,
  about: user.about,
  picture: user.picture,
  arrivedAtTech: user.arrivedAtTech,
  gatewayDrug: user.gatewayDrug,
  conflicts: user.conflicts,
  dietaryRestrictions: user.dietaryRestrictions,
  enrollment: user.semester?.enrollment || null,
  section: user.semester?.section || null,
})

export const emptyProfileForm = (sections: SectionType[]): MemberUpdate => ({
  firstName: '',
  preferredName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  location: '',
  onCampus: true,
  major: '',
  minor: '',
  hometown: '',
  passengers: 0,
  enrollment: Enrollment.Class,
  section: sections[0]?.name || null,
  about: '',
  picture: '',
  arrivedAtTech: new Date().getFullYear(),
  gatewayDrug: '',
  conflicts: '',
  dietaryRestrictions: '',
})
