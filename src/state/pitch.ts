import { Pitch } from 'gql-operations'

export const pitchToUnicode = (pitch: Pitch): string => {
  switch (pitch) {
    case Pitch.AFlat:
      return 'A♭'
    case Pitch.A:
      return 'A'
    case Pitch.ASharp:
      return 'A♯'
    case Pitch.BFlat:
      return 'B♭'
    case Pitch.B:
      return 'B'
    case Pitch.BSharp:
      return 'B♯'
    case Pitch.CFlat:
      return 'C♭'
    case Pitch.C:
      return 'C'
    case Pitch.CSharp:
      return 'C♯'
    case Pitch.DFlat:
      return 'D♭'
    case Pitch.D:
      return 'D'
    case Pitch.DSharp:
      return 'D♯'
    case Pitch.EFlat:
      return 'E♭'
    case Pitch.E:
      return 'E'
    case Pitch.ESharp:
      return 'E♯'
    case Pitch.FFlat:
      return 'F♭'
    case Pitch.F:
      return 'F'
    case Pitch.FSharp:
      return 'F♯'
    case Pitch.GFlat:
      return 'G♭'
    case Pitch.G:
      return 'G'
    case Pitch.GSharp:
      return 'G♯'
    default:
      throw new Error()
  }
}

export const pitchFromUnicode = (unicode: string): Pitch | null => {
  switch (unicode) {
    case 'A♭':
      return Pitch.AFlat
    case 'A':
      return Pitch.A
    case 'A♯':
      return Pitch.ASharp
    case 'B♭':
      return Pitch.BFlat
    case 'B':
      return Pitch.B
    case 'B♯':
      return Pitch.BSharp
    case 'C♭':
      return Pitch.CFlat
    case 'C':
      return Pitch.C
    case 'C♯':
      return Pitch.CSharp
    case 'D♭':
      return Pitch.DFlat
    case 'D':
      return Pitch.D
    case 'D♯':
      return Pitch.DSharp
    case 'E♭':
      return Pitch.EFlat
    case 'E':
      return Pitch.E
    case 'E♯':
      return Pitch.ESharp
    case 'F♭':
      return Pitch.FFlat
    case 'F':
      return Pitch.F
    case 'F♯':
      return Pitch.FSharp
    case 'G♭':
      return Pitch.GFlat
    case 'G':
      return Pitch.G
    case 'G♯':
      return Pitch.GSharp
    default:
      return null
  }
}

export const halfStepsAboveA = (pitch: Pitch): number => {
  switch (pitch) {
    case Pitch.AFlat:
      return 11
    case Pitch.A:
      return 0
    case Pitch.ASharp:
      return 1
    case Pitch.BFlat:
      return 1
    case Pitch.B:
      return 2
    case Pitch.BSharp:
      return 3
    case Pitch.CFlat:
      return 2
    case Pitch.C:
      return 3
    case Pitch.CSharp:
      return 4
    case Pitch.DFlat:
      return 4
    case Pitch.D:
      return 5
    case Pitch.DSharp:
      return 6
    case Pitch.EFlat:
      return 6
    case Pitch.E:
      return 7
    case Pitch.ESharp:
      return 8
    case Pitch.FFlat:
      return 7
    case Pitch.F:
      return 8
    case Pitch.FSharp:
      return 9
    case Pitch.GFlat:
      return 9
    case Pitch.G:
      return 10
    case Pitch.GSharp:
      return 11
  }
}
