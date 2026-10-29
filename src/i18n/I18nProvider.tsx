import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { glossary as sourceGlossary } from '../data/glossary';
import { products as sourceProducts } from '../data/products';
import { readJson, writeJson } from '../lib/storage';
import type { InsuranceProduct } from '../types/product';
import { LOCALE_STORAGE_KEY, detectLocale, isLocale, localeInfo, type Locale } from './config';
import { localizeGlossaryEntry, localizeProduct, type LocalizedGlossaryEntry } from './content';
import { createRichTranslator, createTranslator, type Translate, type TranslateRich } from './translator';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translate;
  tRich: TranslateRich;
  /** Products with their text in the current language. */
  products: InsuranceProduct[];
  getProduct: (id: string) => InsuranceProduct | undefined;
  glossary: LocalizedGlossaryEntry[];
  getGlossaryEntry: (id: string) => LocalizedGlossaryEntry | undefined;
  formatDate: (iso: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function initialLocale(): Locale {
  const saved = readJson<Locale | null>(LOCALE_STORAGE_KEY, null, (v): v is Locale => isLocale(v));
  if (saved) return saved;
  return typeof navigator === 'undefined' ? 'en' : detectLocale(navigator.languages ?? [navigator.language]);
}

export function I18nProvider({ children, locale: forced }: { children: ReactNode; locale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(() => forced ?? initialLocale());

  const setLocale = useCallback((next: Locale) => {
    writeJson(LOCALE_STORAGE_KEY, next);
    setLocaleState(next);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const t = createTranslator(locale);
    const products = sourceProducts.map((p) => localizeProduct(p, locale));
    const glossary = sourceGlossary.map((e) => localizeGlossaryEntry(e, locale));
    const dateFormat = new Intl.DateTimeFormat([localeInfo(locale).dateLocale, 'en-GB'], { day: 'numeric', month: 'long', year: 'numeric' });
    return {
      locale,
      setLocale,
      t,
      tRich: createRichTranslator(t),
      products,
      getProduct: (id) => products.find((p) => p.id === id),
      glossary,
      getGlossaryEntry: (id) => glossary.find((e) => e.id === id),
      formatDate: (iso) => dateFormat.format(new Date(iso)),
    };
  }, [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = localeInfo(locale).htmlLang;
    document.title = value.t('meta.title');
  }, [locale, value]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
