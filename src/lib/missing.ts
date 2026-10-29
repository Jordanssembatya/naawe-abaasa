import type { InsuranceProduct } from '../types/product';

export type MissingField =
  | 'premium'
  | 'exclusions'
  | 'waitingPeriods'
  | 'eligibility'
  | 'enrolmentRequirements'
  | 'requiredDocuments'
  | 'benefitLimits'
  | 'limitDetails'
  | 'coverageAreas';

const checks: { field: MissingField; isMissing: (p: InsuranceProduct) => boolean }[] = [
  { field: 'premium', isMissing: (p) => p.premium === null },
  { field: 'exclusions', isMissing: (p) => p.exclusions === null },
  { field: 'waitingPeriods', isMissing: (p) => p.waitingPeriods === null },
  { field: 'eligibility', isMissing: (p) => p.eligibility === null },
  { field: 'enrolmentRequirements', isMissing: (p) => p.enrolmentRequirements === null },
  { field: 'requiredDocuments', isMissing: (p) => p.requiredDocuments === null },
  { field: 'benefitLimits', isMissing: (p) => p.benefitLimits === null },
  {
    field: 'limitDetails',
    isMissing: (p) => p.benefitLimits?.some((l) => l.amountUgx === null || l.period === null) ?? false,
  },
  {
    field: 'coverageAreas',
    isMissing: (p) => Object.values(p.coverage).some((area) => area.status === 'not-specified'),
  },
];

/** The standard fields this product record does not specify. Labels are in `product.missing.fields`. */
export function getMissingFields(product: InsuranceProduct): MissingField[] {
  return checks.filter((c) => c.isMissing(product)).map((c) => c.field);
}
