import type { CoverageKey } from '../../types/product';

/**
 * The translatable text of one product record. Arrays line up item by item
 * with the English record in data/products.ts, and `null` stays `null`.
 * Product names are brand names and stay in English.
 */
export interface ProductText {
  insurer: string;
  tagline: string;
  coverageSummary: string;
  coverage: Record<CoverageKey, string | null>;
  coveredServices: string[] | null;
  benefitLimits: { label: string; notes?: string }[] | null;
  exclusions: string[] | null;
  waitingPeriods: { appliesTo: string; duration: string }[] | null;
  eligibility: string[] | null;
  premiumBasis: string | null;
  enrolmentRequirements: string[] | null;
  requiredDocuments: string[] | null;
  enrolmentSteps: string[] | null;
  /** Translation of the unverified contact route's note. */
  contactNote: string | null;
  sourceNotes: string;
}

export interface GlossaryText {
  term: string;
  short: string;
  detail: string;
  example?: string;
}

export interface LocaleContent {
  products: Record<string, ProductText>;
  glossary: Record<string, GlossaryText>;
}
