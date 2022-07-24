import {
  Enrollment,
  Period,
  Pitch,
  SiteContextQuery,
  SongMode,
  Uniform,
} from 'src/gql-operations'
import { titleCase } from 'src/utils/helpers'
import { pitchFromUnicode, pitchToUnicode } from './pitch'

export interface FormInputType<T> {
  toString: (t: T) => string
  fromString: (s: string) => T
  textType: TextInputType
}

export type TextInputType =
  | 'text'
  | 'number'
  | 'tel'
  | 'email'
  | 'password'
  | 'date'
  | 'time'

export const stringType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'text',
}

export const dateType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'date',
}

export const timeType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'time',
}

export const emailType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'email',
}

export const passwordType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'password',
}

export const phoneType: FormInputType<string> = {
  toString: (x) => x,
  fromString: (x) => x,
  textType: 'tel',
}

export const numberType: FormInputType<number | null> = {
  toString: (x) => (x ? `${x}` : ''),
  fromString: (x) => (isNaN(parseInt(x)) ? null : parseInt(x)),
  textType: 'number',
}

export const sectionType = (
  context: SiteContextQuery
): FormInputType<string | null> => ({
  toString: (x) => x || 'No Section',
  fromString: (x) =>
    context.static.sections.find((s) => s.name === x)?.name || null,
  textType: 'text',
})

export const uniformType = (
  uniforms: Uniform[]
): FormInputType<Uniform | null> => ({
  toString: (u) => u?.name || '(no uniform)',
  fromString: (u) => uniforms.find((uniform) => uniform.name === u) || null,
  textType: 'text',
})

export interface SimpleMember {
  email: string
  fullName: string
}

export const memberType = (
  members: SimpleMember[]
): FormInputType<SimpleMember | null> => ({
  toString: (member) => (member ? member.fullName : '(nobody)'),
  fromString: (name) => members.find((m) => m.fullName === name) || null,
  textType: 'text',
})

export const enrollmentType: FormInputType<Enrollment | null> = {
  toString: (x) => x || 'Inactive',
  fromString: (x) =>
    x === 'Class' || x === 'Club' ? (x.toUpperCase() as Enrollment) : null,
  textType: 'text',
}

export const semesterType = (
  semesterNames: string[]
): FormInputType<string | null> => ({
  toString: (x) => x || '(no semester)',
  fromString: (x) => semesterNames.find((s) => s === x) || null,
  textType: 'text',
})

export const pitchType: FormInputType<Pitch | null> = {
  toString: (p) => (p ? pitchToUnicode(p) : '?'),
  fromString: pitchFromUnicode,
  textType: 'text',
}

export const songModeType: FormInputType<SongMode | null> = {
  toString: (sm) => (sm ? titleCase(sm) : '(no mode)'),
  fromString: (sm) =>
    ['Major', 'Minor'].includes(sm) ? (sm.toUpperCase() as SongMode) : null,
  textType: 'text',
}

export const periodType: FormInputType<Period | null> = {
  toString: (x) => (x ? titleCase(x) : 'No'),
  fromString: (x) => (x === 'No' ? null : (x.toUpperCase() as Period)),
  textType: 'text',
}
