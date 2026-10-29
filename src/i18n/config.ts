/**
 * Supported languages. To add one: add it here, add a message catalog in
 * `messages/` and a content file in `content/`, then register both in
 * `translator.ts` and `content/index.ts`. TypeScript and the i18n tests flag
 * anything missing.
 */
export const LOCALES = [
  { code: 'en', name: 'English', short: 'EN', htmlLang: 'en-UG', dateLocale: 'en-GB' },
  { code: 'lg', name: 'Luganda', short: 'LG', htmlLang: 'lg', dateLocale: 'lg' },
  { code: 'sw', name: 'Kiswahili', short: 'SW', htmlLang: 'sw', dateLocale: 'sw' },
  { code: 'nyn', name: 'Runyankore', short: 'NYN', htmlLang: 'nyn', dateLocale: 'nyn' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];
export type LocaleInfo = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Read by the boot loader script in index.html too; keep the two in sync. */
export const LOCALE_STORAGE_KEY = 'insurguide.language';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && LOCALES.some((l) => l.code === value);
}

export function localeInfo(locale: Locale): LocaleInfo {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/** First supported language from the browser's preferences, e.g. "sw-KE" → "sw". */
export function detectLocale(languages: readonly string[]): Locale {
  for (const tag of languages) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
