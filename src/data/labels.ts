import type { CoverFor, CoverageKey, CustomerCategory } from '../types/product';

/*
 * Display order of the coded values. Their labels are translated: see the
 * `labels` section of the message catalogs in src/i18n/messages.
 */

export const CUSTOMER_CATEGORIES: CustomerCategory[] = [
  'informal-sector',
  'self-employed',
  'salaried',
  'boda-boda',
  'market-vendor',
  'small-business',
];

export const COVER_FOR: CoverFor[] = ['individual', 'family'];

export const COVERAGE_KEYS: CoverageKey[] = ['inpatient', 'outpatient', 'maternity', 'dental', 'optical'];

/** Glossary id for coverage areas that have a glossary entry. */
export const coverageGlossaryIds: Partial<Record<CoverageKey, string>> = {
  inpatient: 'inpatient',
  outpatient: 'outpatient',
};
