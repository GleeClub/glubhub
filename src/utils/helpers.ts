import dayjs from "dayjs";
import type { NewRolePermission } from "gql-operations";
import { HasEventTimes, HasPermissions } from "state/types";

export const formatPhone = (phone: string) =>
  phone.length !== 10
    ? phone
    : `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;

export const permittedTo = (user: HasPermissions, permission: string, eventType?: string): boolean =>
  (user.permissions || []).some(p => p.name === permission && (!eventType || p.eventType === eventType));

export const eventIsOver = (event: HasEventTimes): boolean =>
  dayjs() > (dayjs(event.releaseTime) || dayjs(event.callTime));

export const titleCase = (s: string): string => s[0].toUpperCase() + s.slice(1).toLowerCase();

// export const playPitch = (pitch: Pitch): void => {
//   const synth = new Tone.Synth().toMaster();
//   synth.triggerAttackRelease(Tone.Midi(`${pitchToUnicode(pitch)}4`), "1n");
// };

export const rolePermissionsAreEqual = (
  permission1: NewRolePermission,
  permission2: NewRolePermission
): boolean =>
  permission1.role === permission2.role &&
  permission1.permission === permission2.permission &&
  permission1.eventType === permission2.eventType;

export const roundToTwoDigits = (x: number): number =>
  Math.round(x * 100) / 100.0;

export const fileToBase64 = async (file: File): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = event => resolve((event.target!.result as string).replace(/^data:(.*,)?/, ''));
    reader.readAsDataURL(file);
  });

export const romanNumeral = (n: number): string => {
  const wordNumeralPairs: [string, string][] = [
    ["zero", "0"],
    ["one", "I"],
    ["two", "II"],
    ["three", "III"],
    ["four", "IV"],
    ["five", "V"],
    ["six", "VI"],
    ["seven", "VII"],
    ["eight", "VIII"],
    ["nine", "IX"],
    ["ten", "X"],
    ["eleven", "XI"],
    ["twelve", "XII"],
    ["thirteen", "XIII"],
    ["fourteen", "XIV"],
    ["fifteen", "XV"],
    ["sixteen", "XVI"],
    ["seventeen", "XVII"],
    ["eighteen", "XVIII"],
    ["nineteen", "XIX"],
    ["twenty", "XX"]
  ];

  const pair = wordNumeralPairs[n];
  if (pair) {
    const [word, numeral] = pair;
    return `${word} (${numeral})`;
  } else {
    return `${n}`;
  }
};

export interface ButtonAttributes {
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  inverted?: boolean;
  outlined?: boolean;
  fullwidth?: boolean;
  className?: string;
}

export type ButtonColor = "is-primary" | "is-danger" | "is-info" | "is-gold";

export type ButtonSize = "is-small" | "is-normal" | "is-medium" | "is-large";
