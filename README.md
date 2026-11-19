# Belgian National Number (RRN) Generator

Generate valid Belgian national register numbers (rijksregisternummer / numéro de registre national) and lists of fake test persons. Runs fully in the browser, available in English, Dutch and French.

Live: https://lieven121.github.io/rrn-generator/

## Features

- Random valid national number
- Generate from birth date, sex and daily counter (odd = male, even = female)
- Fake persons list (national number, name, `firstname.lastname@example.com`), copy as CSV/JSON or download CSV
- Validator / decoder (incl. BIS numbers)
- SEO: per-language static pages (`/`, `/nl/`, `/fr/`) with hreflang, canonical, Open Graph, JSON-LD (WebApplication + FAQPage), sitemap and robots.txt

## Development

Built with [Vite+](https://viteplus.dev) + Vue 3 + TypeScript.

```sh
npm install
npm run dev      # vp dev
npm test         # vp test
npm run lint     # vp lint
npm run build    # type-check + vp build -> dist/
npm run preview  # http://localhost:4173/rrn-generator/
```

## Structure

- `src/lib/rrn.ts` – algorithm: `YYMMDD` + counter `CCC` + check `97 - (N mod 97)` (N prefixed with `2` for births from 2000)
- `src/lib/fakePerson.ts`, `src/data/names.ts` – fake persons
- `src/i18n/` – EN/NL/FR texts (also used for the SEO tags)
- `seo.ts` – Vite plugin that injects localized `<head>` tags and crawlable fallback content into `index.html`, `nl/index.html`, `fr/index.html`

## Deploy to GitHub Pages

1. Push to the `main` branch of `github.com/lieven121/rrn-generator`.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. `.github/workflows/deploy.yml` tests, builds and deploys on every push.
4. Add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://lieven121.github.io/rrn-generator/sitemap.xml`.

If you rename the repo, update `base` in `vite.config.ts`, `SITE_URL` in `seo.ts`, and the URLs in `public/` (robots, sitemap, manifest, 404).

## Disclaimer

Generated numbers are mathematically valid but random. Use as test data only.
