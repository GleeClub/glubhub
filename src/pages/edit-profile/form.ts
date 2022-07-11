import type { Member } from "gql-operations";

interface ProfileForm {
  firstName: string;
  preferredName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  location: string;
  onCampus: boolean;
  major: string;
  hometown: string;
  passengers: number;
  enrollment: Enrollment | null;
  section: string | null;
  about: string;
  picture: string;
  arrivedAtTech: number | null;
  gatewayDrug: string;
  conflicts: string;
  dietaryRestrictions: string;
}

const formForUser = (user: Member): ProfileForm => ({
  firstName: user.firstName,
  preferredName: user.preferredName || "",
  lastName: user.lastName,
  email: user.email,
  password: "",
  confirmPassword: "",
  phoneNumber: user.phoneNumber,
  location: user.location,
  onCampus: user.onCampus || false,
  major: user.major || "",
  hometown: user.hometown || "",
  passengers: user.passengers,
  enrollment: user.enrollment,
  section: user.section,
  about: user.about || "",
  picture: user.picture || "",
  arrivedAtTech: user.arrivedAtTech,
  gatewayDrug: user.gatewayDrug || "",
  conflicts: user.conflicts || "",
  dietaryRestrictions: user.dietaryRestrictions || ""
});

const emptyProfileForm = (info: Info | null): ProfileForm => ({
  firstName: "",
  preferredName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  location: "",
  onCampus: true,
  major: "",
  hometown: "",
  passengers: 0,
  enrollment: "Class",
  section: info?.sections[0] || null,
  about: "",
  picture: "",
  arrivedAtTech: new Date().getFullYear(),
  gatewayDrug: "",
  conflicts: "",
  dietaryRestrictions: ""
});

const buildProfileBody = (form: ProfileForm, passHash: string | null) => ({
  email: form.email,
  firstName: form.firstName,
  preferredName: form.preferredName,
  lastName: form.lastName,
  passHash,
  phoneNumber: form.phoneNumber,
  picture: form.picture,
  passengers: form.passengers,
  location: form.location,
  onCampus: form.onCampus,
  about: form.about,
  major: form.major,
  hometown: form.hometown,
  arrivedAtTech: form.arrivedAtTech,
  gatewayDrug: form.gatewayDrug,
  conflicts: form.conflicts,
  dietaryRestrictions: form.dietaryRestrictions,
  section: form.section,
  enrollment: form.enrollment
});
