import { interpolate, messages, type Lang } from "./index.ts";

// Each language is a separate static page (/, /nl/, /fr/), so the language is fixed per page load.
const lang: Lang = (["en", "nl", "fr"] as const).find((l) => l === document.documentElement.lang) ?? "en";

export function useI18n() {
  return { lang, m: messages[lang], interpolate };
}
