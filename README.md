# InsurGuide

A mobile-first prototype that helps people in Uganda discover, understand and compare health insurance in plain English, then prepare to enrol. Built for the Uganda Insurers Association (UIA) Simplified Health Insurance Access challenge.

> **Prototype with demonstration data.** All products, insurers, prices and limits are fictional. The app does not sell insurance, decide eligibility, take payments or collect personal or medical information. It is not affiliated with or endorsed by UIA or any insurer.

## Run it

Requires Node.js 20+ (developed on Node 24).

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck + production build into dist/
npm run preview      # serve the production build
npm run lint
npm test             # unit + integration tests (Vitest, jsdom)
npx playwright install chromium   # first time only
npm run test:e2e     # browser tests at 360/390/768/1280px (builds and serves automatically)
```

## Features

| Area | What works |
| --- | --- |
| Home | Hero with search, quick category links, how-it-works steps, featured products, "four things to check", designed-for band, transparency section, call-to-action panel |
| Catalogue (`/products`) | Search by name or insurer; filters for individual/family, inpatient/outpatient, customer category; sort by name, yearly premium, inpatient limit (unknown values sort last); empty state; filters kept in the URL so Back restores them |
| Product details (`/products/:id`) | All 16 required sections: demo label, insurer, target customers, coverage summary, covered services, benefit limits table, exclusions, waiting periods, eligibility, premium, requirements and documents, enrolment steps, contact route, "What this means", missing-information warning, source notes |
| Comparison (`/compare`) | 2–3 products, the same 15 fields for each; "Differs" tags and a "show differences only" toggle; restriction rows highlighted; add, remove and replace controls; sticky first column on tablet/desktop; field-by-field stacked layout under 768px; missing values shown as "Not specified in demonstration data" |
| Glossary (`/glossary`) | 12 searchable plain-language terms with examples and related links; the same definitions open as accessible popovers wherever terms appear |
| Enrolment guide (`/products/:id/enrol`) | Standard 7-step checklist plus product-specific steps; ticks saved in this browser only; progress bar; documents and requirements; contact next step |
| About (`/about`) | Purpose, demo vs verified data, terms can change, how to verify, no affiliation |
| Feedback | Toast messages for adding, removing and replacing comparison products; a comparison tray on browsing pages |
| Errors | Not-found page for unknown routes and products; route error boundary |
| Mobile app (PWA) | Installable from the browser: "Install app" card on Home (Chrome/Edge), Share → Add to Home Screen steps on iPhone/iPad. Opens full-screen with its own icon, with Products, Compare and Glossary shortcuts on a long press. Works offline after the first visit (the whole app and its data are cached by a service worker), with an "offline" notice |
| App-style UI (under 1024px) | Bottom tab bar (Home, Products, Compare with a count, Glossary); app bar with Back and the page title on inner pages (Back goes up to the parent page when opened from a link); compact home screen; safe-area spacing for notched phones. Desktop keeps the website layout |
| Languages | English, Luganda, Kiswahili and Runyankore, chosen from the globe selector in the header. The choice is saved on the device; the first visit follows the browser language. Interface, product records, glossary, notifications and page title are all translated; glossary terms also show the English word used in policy documents |

## Architecture

React 19 + TypeScript (strict) + Vite, React Router, Lucide icons, self-hosted Inter and Playfair Display fonts. No backend: product data is local and typed.

```
src/
  types/product.ts      Data model. null = "not specified" (never "none" or "unlimited")
  data/                 products.ts (demo records), glossary.ts, labels.ts (English source data)
  i18n/                 config.ts (languages), messages/<lang>.ts (UI text),
                        content/<lang>.ts (product and glossary translations), I18nProvider
  lib/                  Pure logic: catalogue filters/sort, comparison rows, checklist,
                        missing-field detection, formatting, safe localStorage
  state/                CompareContext (selection, max 3, persisted), ToastContext,
                        useChecklist, useMediaQuery
  components/           layout/, ui/, glossary/Term, product/, catalogue/, compare/, enrolment/
  pages/                One component per route
  routes.tsx            Route table (shared by the app and tests)
  styles/global.css     Design tokens (CSS variables) and component styles
e2e/                    Playwright tests
```

- **Adding a product** only needs a new record in `src/data/products.ts`; every view reads from the data.
- **Translations.** `src/i18n/messages/en.ts` is the source catalog; every other language must have exactly the same keys (TypeScript fails the build otherwise) and the same `{placeholders}` (checked by `src/i18n/i18n.test.tsx`). Product and glossary text is translated in `src/i18n/content/<lang>.ts`, item by item against the English records, which stay the source for filtering and sorting. The tests also render every page in every language and fail if any English text is left. To add a language: add it to `LOCALES` in `src/i18n/config.ts`, copy `messages/en.ts` and a `content/` file, register both, and add its loading text to the script in `index.html`. The Luganda, Kiswahili and Runyankore text needs review by native speakers before real use.
- **Comparison fields** are defined once in `src/lib/compare.ts` (`getCompareRows`). The table and the mobile view both render from it, so every product is compared on the same fields.
- **Contact routes** are a tagged union. `verified` routes render real `tel:`, `mailto:` and website buttons. `unverified` routes render an explanation and never a link. All demo products are `unverified`.

### Visual design

The colour palette follows the brief: navy `#102B46`, teal `#087E8B`, amber for warnings and exclusions, green for covered items. The layout and component patterns follow the Certi Foods site (certifoodsug.com):

- a sticky header with a pill-style active nav link and a primary button
- a dark hero with a pill label, a serif headline and two buttons
- centred section headers: small uppercase label, Playfair Display heading, muted subtitle
- bordered cards with square icon tiles
- numbered steps with circular icons
- a dark band with pill links
- an inset call-to-action panel
- a light multi-column footer

InsurGuide's own name, logo and content are used throughout. Nothing was copied from that site's branding, images or text.

## Tests and results (run on 29 Oct 2026)

| Command | Result |
| --- | --- |
| `npm run build` (`tsc -b` + `vite build`) | Passed, no type errors |
| `npm run lint` | Passed, 0 problems |
| `npm test` | 23/23 passed: data rules, filtering, sorting, URL round-trip, comparison "not specified" and differences, missing-field detection, checklist, formatting, plus a full journey integration test, empty states, unknown product, glossary search, and the app shell (tab bar, Back in-app and from a direct link, Compare count) |
| `npm run test:e2e` | 7/7 passed in Chromium, including the PWA test: valid manifest, and a never-visited page loading offline |

The browser tests cover:

- **Layout:** no horizontal overflow and no console errors on 7 pages at 360, 390, 768 and 1280px.
- **Mobile journey at 360px:**
  1. Move between tabs with the bottom tab bar.
  2. Find a product with filter chips.
  3. Open its details, including the missing-information warning, exclusions and a limit.
  4. Open a term popover, check it stays on screen, and close it by tapping outside.
  5. Add products to the comparison, and check that the app bar's Back restores the filters.
  6. Check the stacked comparison shows the same fields for both products.
  7. Replace a product, then remove one.
  8. Tick checklist steps and check the ticks persist after a reload.
  9. Check the unverified contact route appears with no `tel:` or `mailto:` links.
- **Keyboard:** a term popover opens with Enter, closes with Escape, and returns focus to the term.

The layout was also checked visually from screenshots at each width.

## Not implemented or incomplete

- **No real product data.** All records are fictional, so the verified-contact path is built and typed but not shown with real data.
- **English only.** There is no Luganda or Swahili yet.
- **PWA only, not a store app.** It installs from the browser; there is no Play Store or App Store build. The service worker runs in `npm run build` / `npm run preview` and on the deployed site, not in `npm run dev`. Installing needs HTTPS (or localhost).
- **No screen-reader audit.** No automated axe check or manual NVDA/TalkBack session has been done. Semantics, labels, focus states and keyboard paths were built in and the keyboard paths tested.
- **Chromium only.** Browser tests ran in Chromium; Firefox and Safari were not tested.

## Assumptions and what needs verification

- The insurer names (Demo Insurer A–D), product names, premiums, limits, waiting periods, eligibility rules and documents are all invented to show different cover structures.
- Before real use, each product must be sourced from the insurer's official documents, with `dataStatus: 'verified'` and `lastVerifiedAt` set, and with `contactRoute` verified.
- Glossary definitions are general plain-language explanations. They should be reviewed by an insurance professional and checked against the regulator's consumer guidance.
- Licensing of agents and brokers by the insurance regulator is mentioned in general terms only. No regulator contact details are shown because none were verified for this prototype.
