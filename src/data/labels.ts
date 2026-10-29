import type {
  CoverFor,
  CoverageKey,
  CoverageStatus,
  CustomerCategory,
  LimitPeriod,
  PremiumFrequency,
} from '../types/product';

export const NOT_SPECIFIED = 'Not specified in demonstration data';

export const customerCategoryLabels: Record<CustomerCategory, string> = {
  'informal-sector': 'Informal-sector workers',
  'self-employed': 'Self-employed',
  salaried: 'Salaried workers',
  'boda-boda': 'Boda boda riders',
  'market-vendor': 'Market vendors',
  'small-business': 'Small business owners',
};

export const coverForLabels: Record<CoverFor, string> = {
  individual: 'Individual',
  family: 'Family',
};

export const coverageLabels: Record<CoverageKey, string> = {
  inpatient: 'Inpatient',
  outpatient: 'Outpatient',
  maternity: 'Maternity',
  dental: 'Dental',
  optical: 'Optical',
};

/** Glossary id for coverage areas that have a glossary entry. */
export const coverageGlossaryIds: Partial<Record<CoverageKey, string>> = {
  inpatient: 'inpatient',
  outpatient: 'outpatient',
};

export const coverageStatusLabels: Record<CoverageStatus, string> = {
  covered: 'Covered',
  'not-covered': 'Not covered',
  'optional-add-on': 'Optional add-on',
  'not-specified': 'Not specified',
};

export const limitPeriodLabels: Record<LimitPeriod, string> = {
  'per-year': 'per year',
  'per-admission': 'per admission',
  'per-pregnancy': 'per pregnancy',
  'per-visit': 'per visit',
  'per-night': 'per night',
  lifetime: 'lifetime',
};

export const premiumFrequencyLabels: Record<PremiumFrequency, string> = {
  month: 'per month',
  quarter: 'per quarter',
  year: 'per year',
};
