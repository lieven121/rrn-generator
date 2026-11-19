import { femaleFirstNames, lastNames, maleFirstNames } from "../data/names.ts";
import { randomRrn, type Sex } from "./rrn.ts";

export interface FakePerson {
  rrn: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  sex: Sex;
}

const pick = <T>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];

/** "Éloïse", "D'Hondt" -> "eloise.dhondt" */
export function emailLocalPart(firstName: string, lastName: string): string {
  const slug = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  return `${slug(firstName)}.${slug(lastName)}`;
}

export function fakePerson(domain = "example.com"): FakePerson {
  const { rrn, birthDate, sex } = randomRrn();
  const firstName = pick(sex === "M" ? maleFirstNames : femaleFirstNames);
  const lastName = pick(lastNames);
  return { rrn, firstName, lastName, email: `${emailLocalPart(firstName, lastName)}@${domain}`, birthDate, sex };
}

/** Generates `count` persons with unique national numbers and e-mail addresses. */
export function fakePersons(count: number, domain = "example.com"): FakePerson[] {
  const people: FakePerson[] = [];
  const rrns = new Set<string>();
  const emails = new Map<string, number>();
  while (people.length < count) {
    const p = fakePerson(domain);
    if (rrns.has(p.rrn)) continue;
    rrns.add(p.rrn);
    const local = p.email.split("@")[0];
    const seen = emails.get(local) ?? 0;
    emails.set(local, seen + 1);
    if (seen > 0) p.email = `${local}${seen + 1}@${domain}`;
    people.push(p);
  }
  return people;
}

const csvCell = (v: string) => (/[",\n;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

export function toCsv(people: FakePerson[]): string {
  const header = ["rrn", "firstName", "lastName", "email", "birthDate", "sex"];
  const rows = people.map((p) => [p.rrn, p.firstName, p.lastName, p.email, p.birthDate, p.sex].map(csvCell).join(","));
  return [header.join(","), ...rows].join("\n");
}
