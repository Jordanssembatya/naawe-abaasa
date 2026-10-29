import type { MessageKey, Translate } from '../i18n/translator';
import type { CoverageKey, InsuranceProduct } from '../types/product';
import { formatLimitAmount, formatPremium } from './format';

export type CellTone = 'positive' | 'negative' | 'caution' | 'neutral';

export interface CompareCell {
  /** One or more lines of text. Empty when the value is missing. */
  lines: string[];
  missing: boolean;
  tone: CellTone;
  /** When true, the first line is the headline value (e.g. a status or price) and the rest are details. */
  hasStatus?: boolean;
}

export interface CompareRow {
  id: string;
  label: string;
  glossaryId?: string;
  /** Rows describing restrictions are visually flagged. */
  restriction?: boolean;
  getCell: (product: InsuranceProduct) => CompareCell;
}

const missing: CompareCell = { lines: [], missing: true, tone: 'neutral' };

/**
 * The comparison rows, with labels and cell text in the language of `t`.
 * Pass products already translated into that language.
 */
export function getCompareRows(t: Translate): CompareRow[] {
  const list = (values: string[] | null, tone: CellTone = 'neutral'): CompareCell => {
    if (values === null) return missing;
    if (values.length === 0) return { lines: [t('common.noneListed')], missing: false, tone };
    return { lines: values, missing: false, tone };
  };

  const coverageCell =
    (key: CoverageKey) =>
    (product: InsuranceProduct): CompareCell => {
      const area = product.coverage[key];
      if (area.status === 'not-specified') return missing;
      const tone: CellTone =
        area.status === 'covered' ? 'positive' : area.status === 'not-covered' ? 'negative' : 'caution';
      const lines = [t(`labels.coverageStatus.${area.status}`)];
      if (area.summary) lines.push(area.summary);
      return { lines, missing: false, tone, hasStatus: true };
    };

  const row = (id: string, label: MessageKey, rest: Omit<CompareRow, 'id' | 'label'>): CompareRow => ({ id, label: t(label), ...rest });

  return [
    row('insurer', 'compare.rows.insurer', { getCell: (p) => ({ lines: [p.insurer], missing: false, tone: 'neutral' }) }),
    row('customers', 'compare.rows.customers', {
      getCell: (p) => list(p.targetCustomers?.map((c) => t(`labels.customerCategory.${c}`)) ?? null),
    }),
    row('cover-for', 'compare.rows.coverFor', {
      glossaryId: 'dependants',
      getCell: (p) => list(p.coverFor?.map((c) => t(`labels.coverFor.${c}`)) ?? null),
    }),
    row('inpatient', 'compare.rows.inpatient', { glossaryId: 'inpatient', getCell: coverageCell('inpatient') }),
    row('outpatient', 'compare.rows.outpatient', { glossaryId: 'outpatient', getCell: coverageCell('outpatient') }),
    row('maternity', 'compare.rows.maternity', { getCell: coverageCell('maternity') }),
    row('dental', 'compare.rows.dental', { getCell: coverageCell('dental') }),
    row('optical', 'compare.rows.optical', { getCell: coverageCell('optical') }),
    row('limits', 'compare.rows.limits', {
      glossaryId: 'benefit-limit',
      restriction: true,
      getCell: (p) => list(p.benefitLimits?.map((l) => `${l.label}: ${formatLimitAmount(l, t)}`) ?? null),
    }),
    row('premium', 'compare.rows.premium', {
      glossaryId: 'premium',
      getCell: (p) =>
        p.premium
          ? {
              lines: [
                formatPremium(p.premium, t),
                p.premium.basis,
                ...(p.premium.illustrative ? [t('common.fictionalDemoValue')] : []),
              ],
              missing: false,
              tone: 'neutral',
              hasStatus: true,
            }
          : missing,
    }),
    row('waiting', 'compare.rows.waiting', {
      glossaryId: 'waiting-period',
      restriction: true,
      getCell: (p) => list(p.waitingPeriods?.map((w) => `${w.appliesTo}: ${w.duration}`) ?? null, 'caution'),
    }),
    row('exclusions', 'compare.rows.exclusions', {
      glossaryId: 'exclusion',
      restriction: true,
      getCell: (p) => list(p.exclusions, 'caution'),
    }),
    row('eligibility', 'compare.rows.eligibility', { getCell: (p) => list(p.eligibility) }),
    row('requirements', 'compare.rows.requirements', { getCell: (p) => list(p.enrolmentRequirements) }),
    row('contact', 'compare.rows.contact', {
      glossaryId: 'intermediary',
      getCell: (p) =>
        p.contactRoute.status === 'verified'
          ? { lines: p.contactRoute.channels.map((c) => `${c.label}: ${c.value}`), missing: false, tone: 'neutral' }
          : { lines: [t('compare.contactUnverified')], missing: false, tone: 'caution' },
    }),
  ];
}

/** True when the products do not all share the same value for a row. */
export function rowDiffers(row: CompareRow, items: InsuranceProduct[]): boolean {
  const keys = items.map((p) => {
    const cell = row.getCell(p);
    return cell.missing ? '__missing__' : cell.lines.join('\n');
  });
  return new Set(keys).size > 1;
}

export function cellText(cell: CompareCell, t: Translate): string {
  return cell.missing ? t('common.notSpecifiedData') : cell.lines.join('; ');
}
