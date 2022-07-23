import { Period, Pitch, SongMode } from 'src/gql-operations'

export const GREASE_TOKEN_NAME = 'grease-token'
export const GREASE_OLD_TOKEN_NAME = 'grease-old-token'
export const API_URL = 'https://api.glubhub.org/'
export const GOLD_COLOR = '#b4a46a'
export const SUBMISSION_STATE_BOX_ID = 'submission-box'
export const SECTION_ORDER = ['Tenor 1', 'Tenor 2', 'Baritone', 'Bass', null]
export const NO_SECTION = 'Homeless'
export const OFFICER_LIST_EMAIL = 'gleeclub_officers@lists.gatech.edu'
export const ATTENDANCE_ISSUE_EMAIL = OFFICER_LIST_EMAIL + 'subject=Attendance%20Issue'

export const ALL_PERIODS = [
  Period.Daily,
  Period.Weekly,
  Period.Biweekly,
  Period.Monthly,
  Period.Yearly,
]
export const ALL_MODES = [SongMode.Major, SongMode.Minor]
export const ALL_PITCHES = [
  Pitch.AFlat,
  Pitch.A,
  Pitch.ASharp,
  Pitch.BFlat,
  Pitch.B,
  Pitch.BSharp,
  Pitch.CFlat,
  Pitch.C,
  Pitch.CSharp,
  Pitch.DFlat,
  Pitch.D,
  Pitch.DSharp,
  Pitch.EFlat,
  Pitch.E,
  Pitch.ESharp,
  Pitch.FFlat,
  Pitch.F,
  Pitch.FSharp,
  Pitch.GFlat,
  Pitch.G,
  Pitch.GSharp,
]
