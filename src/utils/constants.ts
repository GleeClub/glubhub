import { DocumentLink, Pitch, Uniform } from "gql-operations";

export const GREASE_TOKEN_NAME = "grease-token";
export const GREASE_OLD_TOKEN_NAME = "grease-old-token";
export const API_URL = "https://gleeclub.gatech.edu/cgi-bin/api/";
export const GOLD_COLOR = "#b4a46a";
export const SUBMISSION_STATE_BOX_ID = "submission-box";
export const SECTION_ORDER = ["Tenor 1", "Tenor 2", "Baritone", "Bass", null];
export const NO_SECTION = "Homeless";

export const ALL_PITCHES: Pitch[] = [
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
  Pitch.GSharp
];

export const emptyUniform: Uniform = { name: "", description: "", color: null, id: 0 };
export const emptyLink: DocumentLink = { name: "", url: "" };
