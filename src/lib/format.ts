import type { Translate } from '../i18n/translator';
import type { BenefitLimit, Premium } from '../types/product';

const ugx = new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 });

export function formatUgx(amount: number): string {
  return `UGX ${ugx.format(amount)}`;
}

export function formatPremium(premium: Premium | null, t: Translate): string {
  if (!premium) return t('common.notSpecifiedData');
  return `${formatUgx(premium.amountUgx)} ${t(`labels.premiumFrequency.${premium.frequency}`)}`;
}

export function formatLimitAmount(limit: BenefitLimit, t: Translate): string {
  const amount = limit.amountUgx === null ? t('common.amountNotSpecified') : formatUgx(limit.amountUgx);
  const period = limit.period ? t(`labels.limitPeriod.${limit.period}`) : t('common.periodNotSpecified');
  return `${amount}, ${period}`;
}

const periodsPerYear: Record<Premium['frequency'], number> = { month: 12, quarter: 4, year: 1 };

/** Premium converted to a yearly figure, for sorting only. */
export function yearlyPremium(premium: Premium | null): number | null {
  return premium ? premium.amountUgx * periodsPerYear[premium.frequency] : null;
}
