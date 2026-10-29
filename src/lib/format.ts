import { NOT_SPECIFIED, limitPeriodLabels, premiumFrequencyLabels } from '../data/labels';
import type { BenefitLimit, Premium } from '../types/product';

const ugx = new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 });

export function formatUgx(amount: number): string {
  return `UGX ${ugx.format(amount)}`;
}

export function formatPremium(premium: Premium | null): string {
  if (!premium) return NOT_SPECIFIED;
  return `${formatUgx(premium.amountUgx)} ${premiumFrequencyLabels[premium.frequency]}`;
}

export function formatLimitAmount(limit: BenefitLimit): string {
  const amount = limit.amountUgx === null ? 'Amount not specified' : formatUgx(limit.amountUgx);
  const period = limit.period ? limitPeriodLabels[limit.period] : 'period not specified';
  return `${amount}, ${period}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const periodsPerYear: Record<Premium['frequency'], number> = { month: 12, quarter: 4, year: 1 };

/** Premium converted to a yearly figure, for sorting only. */
export function yearlyPremium(premium: Premium | null): number | null {
  return premium ? premium.amountUgx * periodsPerYear[premium.frequency] : null;
}
