import type { GlossaryEntry } from '../../data/glossary';
import type { InsuranceProduct } from '../../types/product';
import type { Locale } from '../config';
import { lgContent } from './lg';
import { nynContent } from './nyn';
import { swContent } from './sw';
import type { LocaleContent } from './types';

/** English content lives in data/products.ts and data/glossary.ts; these overlay it. */
export const contents: Record<Exclude<Locale, 'en'>, LocaleContent> = {
  lg: lgContent,
  sw: swContent,
  nyn: nynContent,
};

const pick = <T,>(translated: T[] | null | undefined, index: number, fallback: T): T => translated?.[index] ?? fallback;

/**
 * The product with its text in the given language. Ids, amounts and statuses
 * are untouched, so filtering and sorting can keep using the English record.
 */
export function localizeProduct(product: InsuranceProduct, locale: Locale): InsuranceProduct {
  if (locale === 'en') return product;
  const text = contents[locale].products[product.id];
  if (!text) return product;

  return {
    ...product,
    insurer: text.insurer,
    tagline: text.tagline,
    coverageSummary: text.coverageSummary,
    coverage: Object.fromEntries(
      Object.entries(product.coverage).map(([key, area]) => [
        key,
        { ...area, summary: area.summary === null ? null : (text.coverage[key as keyof typeof text.coverage] ?? area.summary) },
      ]),
    ) as InsuranceProduct['coverage'],
    coveredServices: product.coveredServices?.map((s, i) => pick(text.coveredServices, i, s)) ?? null,
    benefitLimits:
      product.benefitLimits?.map((limit, i) => {
        const t = text.benefitLimits?.[i];
        return t ? { ...limit, label: t.label, ...(limit.notes ? { notes: t.notes ?? limit.notes } : {}) } : limit;
      }) ?? null,
    exclusions: product.exclusions?.map((s, i) => pick(text.exclusions, i, s)) ?? null,
    waitingPeriods: product.waitingPeriods?.map((w, i) => pick(text.waitingPeriods, i, w)) ?? null,
    eligibility: product.eligibility?.map((s, i) => pick(text.eligibility, i, s)) ?? null,
    premium: product.premium && { ...product.premium, basis: text.premiumBasis ?? product.premium.basis },
    enrolmentRequirements: product.enrolmentRequirements?.map((s, i) => pick(text.enrolmentRequirements, i, s)) ?? null,
    requiredDocuments: product.requiredDocuments?.map((s, i) => pick(text.requiredDocuments, i, s)) ?? null,
    enrolmentSteps: product.enrolmentSteps?.map((s, i) => pick(text.enrolmentSteps, i, s)) ?? null,
    contactRoute:
      product.contactRoute.status === 'unverified'
        ? { ...product.contactRoute, note: text.contactNote ?? product.contactRoute.note }
        : product.contactRoute,
    sourceNotes: text.sourceNotes,
  };
}

export interface LocalizedGlossaryEntry extends GlossaryEntry {
  /** The English term, shown alongside translations because policy documents use it. */
  englishTerm: string;
}

export function localizeGlossaryEntry(entry: GlossaryEntry, locale: Locale): LocalizedGlossaryEntry {
  const text = locale === 'en' ? undefined : contents[locale].glossary[entry.id];
  if (!text) return { ...entry, englishTerm: entry.term };
  return {
    ...entry,
    term: text.term,
    short: text.short,
    detail: text.detail,
    ...(entry.example ? { example: text.example ?? entry.example } : {}),
    englishTerm: entry.term,
  };
}
