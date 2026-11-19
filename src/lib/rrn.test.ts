import { describe, expect, it } from "vite-plus/test";
import { emailLocalPart, fakePersons, toCsv } from "./fakePerson.ts";
import {
  adjustCounterToSex,
  formatRrn,
  generateRrn,
  randomRrn,
  sexFromCounter,
  validateRrn,
} from "./rrn.ts";

describe("generateRrn", () => {
  it("computes check digits for people born before 2000", () => {
    // 850730033 mod 97 = 69 -> 97 - 69 = 28
    expect(generateRrn({ birthDate: "1985-07-30", counter: 33 })).toBe("85073003328");
  });

  it("prefixes 2 for people born in 2000 or later", () => {
    // 2170101001 mod 97 = 26 -> 71
    expect(generateRrn({ birthDate: "2017-01-01", counter: 1 })).toBe("17010100171");
  });

  it("uses 97 when the remainder is 0", () => {
    // find a base whose remainder is 0 and check it yields 97, not 00
    for (let c = 1; c <= 997; c++) {
      const base = Number(`900101${String(c).padStart(3, "0")}`);
      if (base % 97 === 0) {
        expect(generateRrn({ birthDate: "1990-01-01", counter: c }).slice(9)).toBe("97");
        return;
      }
    }
    throw new Error("no zero-remainder counter found");
  });

  it("rejects invalid input", () => {
    expect(() => generateRrn({ birthDate: "1990-02-30", counter: 1 })).toThrow();
    expect(() => generateRrn({ birthDate: "1990-01-01", counter: 0 })).toThrow();
    expect(() => generateRrn({ birthDate: "1990-01-01", counter: 998 })).toThrow();
  });
});

describe("sex / counter", () => {
  it("odd is male, even is female", () => {
    expect(sexFromCounter(1)).toBe("M");
    expect(sexFromCounter(2)).toBe("F");
  });

  it("adjusts counters to the requested sex", () => {
    expect(adjustCounterToSex(2, "M")).toBe(3);
    expect(adjustCounterToSex(997, "F")).toBe(996);
    expect(adjustCounterToSex(0, "F")).toBe(2);
  });

  it("random numbers are valid and match the requested sex", () => {
    for (let i = 0; i < 500; i++) {
      const r = randomRrn({ sex: i % 2 ? "M" : "F" });
      const info = validateRrn(r.rrn);
      expect(info.valid).toBe(true);
      expect(info.birthDate).toBe(r.birthDate);
      expect(info.sex).toBe(r.sex);
    }
  });
});

describe("validateRrn / formatRrn", () => {
  it("formats", () => {
    expect(formatRrn("85073003328")).toBe("85.07.30-033.28");
  });

  it("decodes valid numbers with separators", () => {
    expect(validateRrn("85.07.30-033.28")).toMatchObject({
      valid: true,
      birthDate: "1985-07-30",
      sex: "M",
      counter: 33,
    });
    expect(validateRrn("17010100171").birthDate).toBe("2017-01-01");
  });

  it("rejects bad checksums and lengths", () => {
    expect(validateRrn("85073003329")).toMatchObject({ valid: false, reason: "checksum" });
    expect(validateRrn("123")).toMatchObject({ valid: false, reason: "length" });
  });

  it("recognises BIS numbers", () => {
    const base = "854730033"; // month 07 + 40
    const kk = String(97 - (Number(base) % 97)).padStart(2, "0");
    expect(validateRrn(base + kk)).toMatchObject({ valid: true, isBis: true, birthDate: "1985-07-30", sex: "M" });
  });
});

describe("fake persons", () => {
  it("builds e-mail addresses without accents or punctuation", () => {
    expect(emailLocalPart("Éloïse", "D'Hondt")).toBe("eloise.dhondt");
    expect(emailLocalPart("Pieter", "Van den Broeck")).toBe("pieter.vandenbroeck");
  });

  it("generates unique, consistent persons", () => {
    const people = fakePersons(200);
    expect(new Set(people.map((p) => p.rrn)).size).toBe(200);
    expect(new Set(people.map((p) => p.email)).size).toBe(200);
    for (const p of people) expect(validateRrn(p.rrn).sex).toBe(p.sex);
    expect(toCsv(people).split("\n")).toHaveLength(201);
  });
});
