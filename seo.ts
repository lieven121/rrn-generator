import type { Plugin } from "vite-plus";
import { languages, messages, type Lang } from "./src/i18n/index.ts";

export const SITE_URL = "https://lieven121.github.io/rrn-generator/";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ogLocale: Record<Lang, string> = { en: "en_US", nl: "nl_BE", fr: "fr_BE" };

function headTags(lang: Lang, base: string): string {
  const m = messages[lang];
  const url = SITE_URL + languages.find((l) => l.code === lang)!.path;
  const ogImage = `${SITE_URL}og-image.png`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: m.seo.title,
      url,
      description: m.seo.description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: m.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return [
    `<title>${esc(m.seo.title)}</title>`,
    `<meta name="description" content="${esc(m.seo.description)}" />`,
    `<meta name="keywords" content="${esc(m.seo.keywords)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    ...languages.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${SITE_URL + l.path}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}" />`,
    `<meta name="theme-color" content="#fdda24" />`,
    `<link rel="icon" type="image/svg+xml" href="${base}favicon.svg" />`,
    `<link rel="apple-touch-icon" href="${base}apple-touch-icon.png" />`,
    `<link rel="manifest" href="${base}manifest.webmanifest" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(m.appName)}" />`,
    `<meta property="og:title" content="${esc(m.seo.title)}" />`,
    `<meta property="og:description" content="${esc(m.seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    ...languages
      .filter((l) => l.code !== lang)
      .map((l) => `<meta property="og:locale:alternate" content="${ogLocale[l.code]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.seo.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

/** Crawlable content shown before (or without) JavaScript; replaced when Vue mounts. */
function fallbackContent(lang: Lang): string {
  const m = messages[lang];
  return [
    `<main style="max-width:720px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif">`,
    `<h1>${esc(m.h1)}</h1>`,
    `<p>${esc(m.intro)}</p>`,
    `<h2>${esc(m.about.title)}</h2>`,
    ...m.about.body.map((p) => `<p>${esc(p)}</p>`),
    `<h2>${esc(m.faqTitle)}</h2>`,
    ...m.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`),
    `<noscript><p>JavaScript is required to generate numbers.</p></noscript>`,
    `</main>`,
  ].join("");
}

export function seoPlugin(): Plugin {
  let base = "/";
  return {
    name: "rrn-seo",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(html) {
      const lang = (/<html[^>]*\slang="(\w+)"/.exec(html)?.[1] ?? "en") as Lang;
      return html
        .replace("<!--seo-head-->", headTags(lang, base))
        .replace("<!--seo-fallback-->", fallbackContent(lang));
    },
  };
}
