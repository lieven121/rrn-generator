import type { Messages } from "./index.ts";

export default {
  seo: {
    title: "Générateur de numéro de registre national belge – Numéros de test valides",
    description:
      "Générez des numéros de registre national belges valides selon la date de naissance, le sexe et le compteur, ainsi que des listes de personnes fictives avec nom et e-mail. Gratuit, rapide et privé.",
    keywords:
      "générateur numéro national, numéro de registre national générateur, niss générateur, numéro national belge, rrn generator, données de test, générateur de personne fictive",
  },
  appName: "RRN Generator",
  h1: "Générateur de numéro de registre national",
  intro:
    "Créez des numéros de registre national belges valides pour vos tests et développements. Tout fonctionne dans votre navigateur – rien n'est envoyé ni enregistré.",
  sex: { M: "Homme", F: "Femme" },
  copy: { copy: "Copier", copied: "Copié !" },
  random: {
    title: "Numéro aléatoire",
    desc: "Un numéro national aléatoire et valide d'une personne adulte.",
    generate: "Générer",
    formatted: "Formaté",
    raw: "Chiffres uniquement",
  },
  custom: {
    title: "Générer à partir de données",
    desc: "Choisissez une date de naissance, un sexe et un compteur.",
    birthDate: "Date de naissance",
    sex: "Sexe",
    counter: "Compteur",
    randomCounter: "Compteur aléatoire",
    counterHint: "001–997 · impair = homme, pair = femme",
    parityAdjusted: "Compteur ajusté à {counter} selon le sexe choisi.",
    invalidDate: "Saisissez une date de naissance valide.",
  },
  persons: {
    title: "Personnes fictives",
    desc: "Une liste de personnes fictives avec numéro national, nom et adresse e-mail correspondants.",
    count: "Nombre de personnes",
    generate: "Générer la liste",
    copyCsv: "Copier CSV",
    copyJson: "Copier JSON",
    download: "Télécharger CSV",
    cols: { rrn: "Numéro national", name: "Nom", email: "E-mail", birthDate: "Date de naissance", sex: "Sexe" },
  },
  validator: {
    title: "Vérifier un numéro",
    desc: "Collez un numéro national pour le vérifier et le décoder.",
    placeholder: "p. ex. 85.07.30-033.28",
    valid: "Numéro national valide",
    invalid: "Numéro national invalide",
    reasons: {
      length: "Un numéro national compte 11 chiffres.",
      checksum: "Les chiffres de contrôle ne correspondent pas.",
      date: "La date de naissance n'est pas valide.",
      counter: "Le compteur n'est pas valide.",
    },
    birthDate: "Date de naissance",
    sex: "Sexe",
    counter: "Compteur",
    bis: "Numéro BIS",
    unknown: "Inconnu",
  },
  about: {
    title: "Comment fonctionne le numéro de registre national ?",
    body: [
      "Le numéro de registre national compte 11 chiffres au format AA.MM.JJ-CCC.KK. Les six premiers chiffres représentent la date de naissance, suivis d'un compteur journalier de trois chiffres et de deux chiffres de contrôle.",
      "Le compteur est impair pour les hommes et pair pour les femmes. Le nombre de contrôle vaut 97 moins le reste de la division des neuf premiers chiffres par 97. Pour les personnes nées à partir de 2000, on place un 2 devant les neuf chiffres avant le calcul.",
    ],
  },
  faqTitle: "Questions fréquentes",
  faq: [
    {
      q: "S'agit-il de vrais numéros nationaux ?",
      a: "Les numéros sont mathématiquement valides mais générés aléatoirement. Ils peuvent correspondre à un numéro existant : utilisez-les uniquement comme données de test, jamais pour identifier ou usurper l'identité de quelqu'un.",
    },
    {
      q: "Mes données sont-elles envoyées quelque part ?",
      a: "Non. Tous les numéros et personnes sont générés localement dans votre navigateur. Pas de serveur, pas de suivi, pas de stockage.",
    },
    {
      q: "Quelle est la différence entre numéro national, NISS et INSZ ?",
      a: "Pour les personnes inscrites au registre national, il s'agit du même numéro. Le NISS (INSZ en néerlandais) est le numéro d'identification de la sécurité sociale : le numéro national, ou un numéro BIS pour les personnes non inscrites.",
    },
    {
      q: "Qu'est-ce qu'un numéro BIS ?",
      a: "Un numéro BIS est attribué aux personnes qui ne sont pas inscrites au registre national. Il a la même structure, mais on ajoute 20 ou 40 au mois de naissance.",
    },
  ],
  footer: {
    disclaimer: "Données de test fictives uniquement. Ne pas utiliser pour identifier ou usurper l'identité de personnes réelles.",
  },
} satisfies Messages;
