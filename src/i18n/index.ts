import en from "./en.ts";
import fr from "./fr.ts";
import nl from "./nl.ts";

export type Messages = typeof en;
export type Lang = "en" | "nl" | "fr";

export const languages: { code: Lang; label: string; path: string }[] = [
  { code: "en", label: "EN", path: "" },
  { code: "nl", label: "NL", path: "nl/" },
  { code: "fr", label: "FR", path: "fr/" },
];

export const messages: Record<Lang, Messages> = { en, nl, fr };

export function interpolate(text: string, params: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => String(params[k] ?? `{${k}}`));
}
