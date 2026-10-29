import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '../AppProviders';
import { glossary } from '../data/glossary';
import { products } from '../data/products';
import { routes } from '../routes';
import { LOCALES, LOCALE_STORAGE_KEY, detectLocale, type Locale } from './config';
import { contents } from './content';
import { en } from './messages/en';
import { catalogs, placeholdersOf } from './translator';

type Tree = { [key: string]: string | Tree };

function leaves(tree: Tree, prefix = ''): [string, string][] {
  return Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string' ? [[`${prefix}${key}`, value] as [string, string]] : leaves(value, `${prefix}${key}.`),
  );
}

const englishLeaves = leaves(en as Tree);
const translatedLocales = LOCALES.map((l) => l.code).filter((c): c is Exclude<Locale, 'en'> => c !== 'en');

function renderApp(path: string, locale?: Locale) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <AppProviders locale={locale}>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return router;
}

describe('message catalogs', () => {
  it.each(translatedLocales)('%s has every English key, none empty, with the same placeholders', (code) => {
    const translated = new Map(leaves(catalogs[code] as Tree));
    expect([...translated.keys()].sort()).toEqual(englishLeaves.map(([k]) => k).sort());
    for (const [key, english] of englishLeaves) {
      const value = translated.get(key)!;
      expect(value.trim(), `${code}: ${key} is empty`).not.toBe('');
      expect(placeholdersOf(value), `${code}: ${key} placeholders`).toEqual(placeholdersOf(english));
    }
  });
});

describe('translated content', () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value) ? value.length : value === null ? null : typeof value === 'object' ? 'object' : 'text';

  it.each(translatedLocales)('%s translates every product, item for item', (code) => {
    for (const p of products) {
      const text = contents[code].products[p.id];
      expect(text, `${code}: ${p.id}`).toBeDefined();
      if (!text) continue;
      expect(shape(text.coveredServices)).toEqual(shape(p.coveredServices));
      expect(shape(text.benefitLimits)).toEqual(shape(p.benefitLimits));
      expect(shape(text.exclusions)).toEqual(shape(p.exclusions));
      expect(shape(text.waitingPeriods)).toEqual(shape(p.waitingPeriods));
      expect(shape(text.eligibility)).toEqual(shape(p.eligibility));
      expect(shape(text.enrolmentRequirements)).toEqual(shape(p.enrolmentRequirements));
      expect(shape(text.requiredDocuments)).toEqual(shape(p.requiredDocuments));
      expect(shape(text.enrolmentSteps)).toEqual(shape(p.enrolmentSteps));
      expect(text.premiumBasis === null).toBe(p.premium === null);
      for (const [key, area] of Object.entries(p.coverage)) {
        expect(text.coverage[key as keyof typeof text.coverage] === null, `${code}: ${p.id} ${key}`).toBe(area.summary === null);
      }
      p.benefitLimits?.forEach((limit, i) => expect(Boolean(text.benefitLimits?.[i]?.notes)).toBe(Boolean(limit.notes)));
    }
  });

  it.each(translatedLocales)('%s translates every glossary entry', (code) => {
    for (const entry of glossary) {
      const text = contents[code].glossary[entry.id];
      expect(text, `${code}: ${entry.id}`).toBeDefined();
      expect(Boolean(text?.example)).toBe(Boolean(entry.example));
    }
  });
});

describe('language detection', () => {
  it('picks the first supported browser language and falls back to English', () => {
    expect(detectLocale(['fr-FR', 'sw-KE', 'en'])).toBe('sw');
    expect(detectLocale(['nyn'])).toBe('nyn');
    expect(detectLocale(['fr', 'de'])).toBe('en');
  });
});

describe('language switcher', () => {
  it('switches the interface, updates <html lang> and the title, and remembers the choice', async () => {
    const user = userEvent.setup();
    renderApp('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Understand your health cover before you choose.');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Language' }), 'sw');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Elewa bima yako ya afya kabla ya kuchagua.');
    expect(document.documentElement.lang).toBe('sw');
    expect(document.title).toBe('InsurGuide — Elewa bima yako ya afya');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"sw"');

    // A later visit starts in the saved language.
    cleanup();
    renderApp('/products');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chunguza bima za afya');
    expect(screen.getByRole('combobox', { name: 'Lugha' })).toHaveValue('sw');
  });

  it('keeps the language when navigating between pages', async () => {
    const user = userEvent.setup();
    renderApp('/', 'lg');
    await user.click(screen.getAllByRole('link', { name: 'Ebigambo' })[0]!);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ebigambo bya yinsuwa mu Luganda olwangu');
  });

  it('translates product content and still searches in English', async () => {
    renderApp('/products?q=boda', 'nyn');
    expect(screen.getByText('Inshuwarensi 1 aha 4 nizikwatagana')).toBeInTheDocument();
    expect(screen.getByText(/Inshuwarensi y’irwariro y’omuhendo muke/)).toBeInTheDocument();
  });
});

/*
 * Untranslated-text check: render every page in each language and make sure
 * no English UI string or English product/glossary text is left on screen.
 */
const pages = [
  '/',
  '/products',
  '/products/boda-inpatient-basic',
  '/products/salaried-comprehensive',
  '/products/vendor-outpatient-plus/enrol',
  '/compare',
  '/glossary',
  '/about',
  '/no-such-page',
];

/** English fragments long enough to be unambiguous (placeholders split them up). */
function englishFragments(code: Locale): string[] {
  const translated = new Map(leaves(catalogs[code] as Tree));
  const ui = englishLeaves
    .filter(([key, english]) => translated.get(key) !== english)
    .flatMap(([, english]) => english.split(/\{\w+\}/))
    .map((s) => s.trim())
    .filter((s) => s.length >= 12);
  const content = products.flatMap((p) => [
    p.tagline,
    p.coverageSummary,
    ...(p.coveredServices ?? []),
    ...(p.exclusions ?? []),
    ...(p.enrolmentSteps ?? []),
  ]);
  const terms = glossary.map((g) => g.short);
  return [...new Set([...ui, ...content, ...terms])];
}

it('the untranslated-text check catches English when it is on screen', () => {
  renderApp('/products/boda-inpatient-basic', 'en');
  const text = document.body.textContent ?? '';
  expect(englishFragments('sw').filter((f) => text.includes(f)).length).toBeGreaterThan(20);
});

/** Short English strings ("Back", "Remove"…) that must not be a whole text node or attribute. */
function englishExact(code: Locale): Set<string> {
  const translatedValues = new Set(leaves(catalogs[code] as Tree).map(([, v]) => v.trim()));
  return new Set(
    englishLeaves.map(([, v]) => v.trim()).filter((v) => !v.includes('{') && !translatedValues.has(v)),
  );
}

function textNodes(): string[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const out: string[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const value = node.textContent?.trim();
    if (value) out.push(value);
  }
  return out;
}

describe.each(translatedLocales)('no English left in %s', (code) => {
  const fragments = englishFragments(code);
  const exact = englishExact(code);
  it.each(pages)('%s', (path) => {
    // Seed a comparison so the compare table and tray render too.
    window.localStorage.setItem('afyaguide.compare', JSON.stringify(['boda-inpatient-basic', 'family-starter']));
    renderApp(path, code);
    // Visible text plus what screen readers announce and inputs show.
    const attributes = [...document.querySelectorAll('[aria-label], [placeholder], [title]')].flatMap((el) =>
      ['aria-label', 'placeholder', 'title'].map((name) => el.getAttribute(name) ?? ''),
    );
    const text = [document.body.textContent ?? '', ...attributes].join('\n');
    const leftovers = [
      ...fragments.filter((f) => text.includes(f)),
      ...[...textNodes(), ...attributes].filter((value) => exact.has(value.trim())),
    ];
    expect(leftovers).toEqual([]);
  });
});
