import type { InsuranceProduct } from '../types/product';

const checks: { label: string; isMissing: (p: InsuranceProduct) => boolean }[] = [
  { label: 'Premium (price)', isMissing: (p) => p.premium === null },
  { label: 'Exclusions', isMissing: (p) => p.exclusions === null },
  { label: 'Waiting periods', isMissing: (p) => p.waitingPeriods === null },
  { label: 'Eligibility rules', isMissing: (p) => p.eligibility === null },
  { label: 'Enrolment requirements', isMissing: (p) => p.enrolmentRequirements === null },
  { label: 'Required documents', isMissing: (p) => p.requiredDocuments === null },
  { label: 'Benefit limits', isMissing: (p) => p.benefitLimits === null },
  {
    label: 'Some benefit limit amounts or periods',
    isMissing: (p) => p.benefitLimits?.some((l) => l.amountUgx === null || l.period === null) ?? false,
  },
  {
    label: 'Some coverage areas',
    isMissing: (p) => Object.values(p.coverage).some((area) => area.status === 'not-specified'),
  },
];

/** Labels of the standard fields this product record does not specify. */
export function getMissingFields(product: InsuranceProduct): string[] {
  return checks.filter((c) => c.isMissing(product)).map((c) => c.label);
}
