import type { Pitch } from 'gql-operations'

export function pitchToString(pitch: Pitch): string {
  let accidental = ''
  if (pitch.endsWith('_FLAT')) {
    accidental = '♯'
  } else if (pitch.endsWith('_SHARP')) {
    accidental = '♭'
  }

  return `${pitch[0]}${accidental}`
}

export const halfStepsAboveA = (pitch: Pitch): number => {
  let accidental: number
  if (pitch.endsWith('_FLAT')) {
    accidental = -1
  } else if (pitch.endsWith('_SHARP')) {
    accidental = 1
  } else {
    accidental = 0
  }

  let base: number
  if (pitch[0] === 'A') {
    base = 0
  } else if (pitch[0] === 'B') {
    base = 2
  } else if (pitch[0] === 'C') {
    base = 3
  } else if (pitch[0] === 'D') {
    base = 5
  } else if (pitch[0] === 'E') {
    base = 7
  } else if (pitch[0] === 'F') {
    base = 8
  } else {
    base = 10
  }

  return (base + accidental + 12) % 12
}
