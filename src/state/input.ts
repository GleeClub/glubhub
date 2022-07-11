export interface FormInputType<T> {
  toString: (t: T) => string;
  fromString: (s: string) => T;
  textType: TextInputType;
}

export type TextInputType =
  | "text"
  | "number"
  | "tel"
  | "email"
  | "password"
  | "date"
  | "time";

export const stringType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "text"
};

export const dateType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "date"
};

export const timeType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "time"
};

export const emailType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "email"
};

export const passwordType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "password"
};

export const phoneType: FormInputType<string> = {
  toString: x => x,
  fromString: x => x,
  textType: "tel"
};

export const numberType: FormInputType<number | null> = {
  toString: x => (x ? `${x}` : ""),
  fromString: x => (isNaN(parseInt(x)) ? null : parseInt(x)),
  textType: "number"
};

export function sectionType()
): FormInputType<string | null> => ({
  toString: x => x || "No Section",
  fromString: x => (info?.sections || []).find(s => s === x) || null,
  textType: "text"
});

export const uniformType = (
  info: Info | null
): FormInputType<Uniform | null> => ({
  toString: u => u?.name || "(no uniform)",
  fromString: u =>
    (info?.uniforms || []).find(uniform => uniform.name === u) || null,
  textType: "text"
});

export const memberType = (
  members: Member[]
): FormInputType<Member | null> => ({
  toString: member => (member ? fullName(member) : "(nobody)"),
  fromString: name => members.find(m => fullName(m) === name) || null,
  textType: "text"
});

export const enrollmentType: FormInputType<Enrollment | null> = {
  toString: x => x || "Inactive",
  fromString: x => (x === "Class" || x === "Club" ? x : null),
  textType: "text"
};

export const semesterType = (
  semesters: Semester[]
): FormInputType<Semester | null> => ({
  toString: x => x?.name || "(no semester)",
  fromString: x => semesters.find(s => s.name === x) || null,
  textType: "text"
});

export const pitchType: FormInputType<Pitch | null> = {
  toString: p => (p ? pitchToUnicode(p) : "?"),
  fromString: pitchFromUnicode,
  textType: "text"
};

export const songModeType: FormInputType<SongMode | null> = {
  toString: sm => sm || "(no mode)",
  fromString: sm => (["Major", "Minor"].includes(sm) ? (sm as SongMode) : null),
  textType: "text"
};
