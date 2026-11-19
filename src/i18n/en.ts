export default {
  seo: {
    title: "Belgian National Number Generator (RRN) – Free & Valid Test Numbers",
    description:
      "Generate valid Belgian national register numbers (rijksregisternummer / numéro national) by birth date, sex and counter, plus lists of fake test persons with name and e-mail. Free, fast, private.",
    keywords:
      "belgian national number generator, rrn generator, rijksregisternummer generator, numéro de registre national, insz, niss, belgium test data, fake person generator",
  },
  appName: "RRN Generator",
  h1: "Belgian national number generator",
  intro:
    "Create valid Belgian national register numbers (rijksregisternummer) for testing and development. Everything runs in your browser – nothing is sent or stored.",
  sex: { M: "Male", F: "Female" },
  copy: { copy: "Copy", copied: "Copied!" },
  random: {
    title: "Random number",
    desc: "A random, valid national number for an adult.",
    generate: "Generate",
    formatted: "Formatted",
    raw: "Digits only",
  },
  custom: {
    title: "Generate from details",
    desc: "Pick a birth date, sex and daily counter.",
    birthDate: "Birth date",
    sex: "Sex",
    counter: "Counter",
    randomCounter: "Random counter",
    counterHint: "001–997 · odd = male, even = female",
    parityAdjusted: "Counter adjusted to {counter} to match the selected sex.",
    invalidDate: "Enter a valid birth date.",
  },
  persons: {
    title: "Fake persons",
    desc: "A list of fictitious people with a matching national number, name and e-mail address.",
    count: "Number of persons",
    generate: "Generate list",
    copyCsv: "Copy CSV",
    copyJson: "Copy JSON",
    download: "Download CSV",
    cols: { rrn: "National number", name: "Name", email: "E-mail", birthDate: "Birth date", sex: "Sex" },
  },
  validator: {
    title: "Validate a number",
    desc: "Paste a national number to check it and decode its details.",
    placeholder: "e.g. 85.07.30-033.28",
    valid: "Valid national number",
    invalid: "Invalid national number",
    reasons: {
      length: "A national number has 11 digits.",
      checksum: "The check digits do not match.",
      date: "The birth date is not valid.",
      counter: "The counter is not valid.",
    },
    birthDate: "Birth date",
    sex: "Sex",
    counter: "Counter",
    bis: "BIS number",
    unknown: "Unknown",
  },
  about: {
    title: "How a Belgian national number works",
    body: [
      "The national register number has 11 digits in the format YY.MM.DD-CCC.KK. The first six digits are the birth date, followed by a three-digit daily counter and two check digits.",
      "The counter is odd for men and even for women. The check digits are 97 minus the remainder of the first nine digits divided by 97. For people born in 2000 or later, a 2 is placed in front of the nine digits before calculating.",
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "Are these real national numbers?",
      a: "The numbers are mathematically valid but generated at random. They may coincide with an existing number, so only use them as test data and never to identify or impersonate anyone.",
    },
    {
      q: "Is my data sent anywhere?",
      a: "No. All numbers and persons are generated locally in your browser. There is no server, no tracking and no storage.",
    },
    {
      q: "What is the difference between the RRN, INSZ and NISS?",
      a: "For people in the national register they are the same number: rijksregisternummer (RRN) in Dutch, numéro de registre national in French. INSZ/NISS is the social security identification number, which equals the national number or a BIS number for people not in the register.",
    },
    {
      q: "What is a BIS number?",
      a: "A BIS number is given to people who are not in the national register. It has the same structure, but 20 or 40 is added to the birth month.",
    },
  ],
  footer: {
    disclaimer: "Fictitious test data only. Do not use to identify or impersonate real persons.",
  },
};
