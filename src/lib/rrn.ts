/**
 * Belgian national register number (rijksregisternummer / numéro de registre national).
 *
 * Structure: YY.MM.DD-CCC.KK
 *  - YYMMDD: birth date
 *  - CCC:    daily counter 001–997, odd for men, even for women
 *  - KK:     check digits = 97 - (N mod 97), where N is YYMMDDCCC,
 *            prefixed with "2" for people born in 2000 or later.
 */

export type Sex = "M" | "F";

export const MIN_COUNTER = 1;
export const MAX_COUNTER = 997;

export interface RrnInput {
  /** ISO date, YYYY-MM-DD */
  birthDate: string;
  counter: number;
}

export interface RrnInfo {
  valid: boolean;
  reason?: "length" | "checksum" | "date" | "counter";
  raw: string;
  formatted: string;
  birthDate?: string;
  sex?: Sex;
  counter?: number;
  /** BIS number (foreigners not in the national register); month is offset by 20 or 40 */
  isBis?: boolean;
}

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

export function checkDigits(base9: string, bornAfter2000: boolean): string {
  const n = Number((bornAfter2000 ? "2" : "") + base9);
  return pad(97 - (n % 97));
}

export function sexFromCounter(counter: number): Sex {
  return counter % 2 === 1 ? "M" : "F";
}

export function counterMatchesSex(counter: number, sex: Sex): boolean {
  return sexFromCounter(counter) === sex;
}

/** Nudge a counter to the nearest valid value for the given sex. */
export function adjustCounterToSex(counter: number, sex: Sex): number {
  let c = Math.min(MAX_COUNTER, Math.max(MIN_COUNTER, Math.round(counter) || MIN_COUNTER));
  if (!counterMatchesSex(c, sex)) c = c + 1 > MAX_COUNTER ? c - 1 : c + 1;
  return c;
}

export function isValidIsoDate(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d;
}

/** Returns the 11-digit national number (no separators). */
export function generateRrn({ birthDate, counter }: RrnInput): string {
  if (!isValidIsoDate(birthDate)) throw new Error(`Invalid birth date: ${birthDate}`);
  if (!Number.isInteger(counter) || counter < MIN_COUNTER || counter > MAX_COUNTER) {
    throw new Error(`Counter must be between ${MIN_COUNTER} and ${MAX_COUNTER}`);
  }
  const [y, m, d] = birthDate.split("-");
  const base9 = y.slice(2) + m + d + pad(counter, 3);
  return base9 + checkDigits(base9, Number(y) >= 2000);
}

export function formatRrn(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 11) return raw;
  return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4, 6)}-${d.slice(6, 9)}.${d.slice(9)}`;
}

export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function randomCounter(sex: Sex): number {
  // odd 1..997 for men, even 2..996 for women
  return sex === "M" ? randomInt(0, 498) * 2 + 1 : randomInt(1, 498) * 2;
}

export function randomSex(): Sex {
  return Math.random() < 0.5 ? "M" : "F";
}

export function toIsoDate(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Random ISO birth date between minAge and maxAge years old (relative to today). */
export function randomBirthDate(minAge = 18, maxAge = 85): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const start = Date.UTC(y - maxAge, now.getUTCMonth(), now.getUTCDate());
  const end = Date.UTC(y - minAge, now.getUTCMonth(), now.getUTCDate());
  return toIsoDate(new Date(randomInt(start, end)));
}

export interface RandomRrn {
  rrn: string;
  birthDate: string;
  sex: Sex;
  counter: number;
}

export function randomRrn(opts: { sex?: Sex; minAge?: number; maxAge?: number } = {}): RandomRrn {
  const sex = opts.sex ?? randomSex();
  const birthDate = randomBirthDate(opts.minAge, opts.maxAge);
  const counter = randomCounter(sex);
  return { rrn: generateRrn({ birthDate, counter }), birthDate, sex, counter };
}

/** Validate and decode a national number (separators are ignored). */
export function validateRrn(input: string): RrnInfo {
  const raw = input.replace(/\D/g, "");
  const result: RrnInfo = { valid: false, raw, formatted: formatRrn(raw) };
  if (raw.length !== 11) return { ...result, reason: "length" };

  const base9 = raw.slice(0, 9);
  const kk = raw.slice(9);
  let century: number;
  if (checkDigits(base9, false) === kk) century = 1900;
  else if (checkDigits(base9, true) === kk) century = 2000;
  else return { ...result, reason: "checksum" };

  const counter = Number(raw.slice(6, 9));
  if (counter < MIN_COUNTER || counter > 998) return { ...result, reason: "counter" };

  let month = Number(raw.slice(2, 4));
  const day = Number(raw.slice(4, 6));
  let isBis = false;
  let sexKnown = true;
  if (month > 40) {
    month -= 40;
    isBis = true;
  } else if (month > 20) {
    month -= 20;
    isBis = true;
    sexKnown = false;
  }

  let birthDate: string | undefined;
  // Month or day "00" means the (exact) birth date is unknown, which is allowed.
  if (month !== 0 && day !== 0) {
    birthDate = `${century + Number(raw.slice(0, 2))}-${pad(month)}-${pad(day)}`;
    if (!isValidIsoDate(birthDate)) return { ...result, reason: "date" };
  } else if (month > 12) {
    return { ...result, reason: "date" };
  }

  return {
    ...result,
    valid: true,
    birthDate,
    counter,
    sex: sexKnown ? sexFromCounter(counter) : undefined,
    isBis,
  };
}
