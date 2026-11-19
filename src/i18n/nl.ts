import type { Messages } from "./index.ts";

export default {
  seo: {
    title: "Rijksregisternummer generator – Gratis geldige testnummers (RRN)",
    description:
      "Genereer geldige Belgische rijksregisternummers op basis van geboortedatum, geslacht en volgnummer, en lijsten van fictieve testpersonen met naam en e-mail. Gratis, snel en privé.",
    keywords:
      "rijksregisternummer generator, rijksregisternummer genereren, insz generator, rrn generator, belgisch rijksregisternummer, testdata, fictieve persoon generator",
  },
  appName: "RRN Generator",
  h1: "Rijksregisternummer generator",
  intro:
    "Maak geldige Belgische rijksregisternummers voor testen en ontwikkeling. Alles draait in je browser – er wordt niets verzonden of opgeslagen.",
  sex: { M: "Man", F: "Vrouw" },
  copy: { copy: "Kopiëren", copied: "Gekopieerd!" },
  random: {
    title: "Willekeurig nummer",
    desc: "Een willekeurig, geldig rijksregisternummer van een volwassene.",
    generate: "Genereer",
    formatted: "Opgemaakt",
    raw: "Enkel cijfers",
  },
  custom: {
    title: "Genereer op basis van gegevens",
    desc: "Kies een geboortedatum, geslacht en volgnummer.",
    birthDate: "Geboortedatum",
    sex: "Geslacht",
    counter: "Volgnummer",
    randomCounter: "Willekeurig volgnummer",
    counterHint: "001–997 · oneven = man, even = vrouw",
    parityAdjusted: "Volgnummer aangepast naar {counter} volgens het gekozen geslacht.",
    invalidDate: "Geef een geldige geboortedatum in.",
  },
  persons: {
    title: "Fictieve personen",
    desc: "Een lijst van fictieve personen met bijhorend rijksregisternummer, naam en e-mailadres.",
    count: "Aantal personen",
    generate: "Genereer lijst",
    copyCsv: "Kopieer CSV",
    copyJson: "Kopieer JSON",
    download: "Download CSV",
    cols: { rrn: "Rijksregisternummer", name: "Naam", email: "E-mail", birthDate: "Geboortedatum", sex: "Geslacht" },
  },
  validator: {
    title: "Nummer controleren",
    desc: "Plak een rijksregisternummer om het te controleren en te ontleden.",
    placeholder: "bv. 85.07.30-033.28",
    valid: "Geldig rijksregisternummer",
    invalid: "Ongeldig rijksregisternummer",
    reasons: {
      length: "Een rijksregisternummer heeft 11 cijfers.",
      checksum: "De controlegetallen kloppen niet.",
      date: "De geboortedatum is ongeldig.",
      counter: "Het volgnummer is ongeldig.",
    },
    birthDate: "Geboortedatum",
    sex: "Geslacht",
    counter: "Volgnummer",
    bis: "BIS-nummer",
    unknown: "Onbekend",
  },
  about: {
    title: "Hoe werkt een rijksregisternummer?",
    body: [
      "Het rijksregisternummer bestaat uit 11 cijfers in het formaat JJ.MM.DD-VVV.CC. De eerste zes cijfers vormen de geboortedatum, gevolgd door een volgnummer van drie cijfers en twee controlecijfers.",
      "Het volgnummer is oneven voor mannen en even voor vrouwen. Het controlegetal is 97 min de rest van de deling van de eerste negen cijfers door 97. Voor personen geboren vanaf 2000 wordt een 2 voor de negen cijfers geplaatst vóór de berekening.",
    ],
  },
  faqTitle: "Veelgestelde vragen",
  faq: [
    {
      q: "Zijn dit echte rijksregisternummers?",
      a: "De nummers zijn wiskundig geldig maar willekeurig gegenereerd. Ze kunnen samenvallen met een bestaand nummer; gebruik ze dus enkel als testdata en nooit om iemand te identificeren of je voor iemand uit te geven.",
    },
    {
      q: "Worden mijn gegevens ergens naartoe gestuurd?",
      a: "Nee. Alle nummers en personen worden lokaal in je browser gegenereerd. Er is geen server, geen tracking en geen opslag.",
    },
    {
      q: "Wat is het verschil tussen rijksregisternummer, INSZ en NISS?",
      a: "Voor personen in het rijksregister is het hetzelfde nummer. Het INSZ (NISS in het Frans) is het identificatienummer van de sociale zekerheid: het rijksregisternummer, of een BIS-nummer voor wie niet in het rijksregister staat.",
    },
    {
      q: "Wat is een BIS-nummer?",
      a: "Een BIS-nummer wordt toegekend aan personen die niet in het rijksregister staan. Het heeft dezelfde structuur, maar bij de geboortemaand wordt 20 of 40 opgeteld.",
    },
  ],
  footer: {
    disclaimer: "Enkel fictieve testdata. Niet gebruiken om echte personen te identificeren of na te bootsen.",
  },
} satisfies Messages;
