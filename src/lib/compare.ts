import {
  NOT_SPECIFIED,
  coverForLabels,
  coverageStatusLabels,
  customerCategoryLabels,
} from '../data/labels';
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

function list(values: string[] | null, tone: CellTone = 'neutral'): CompareCell {
  if (values === null) return missing;
  if (values.length === 0) return { lines: ['None listed'], missing: false, tone };
  return { lines: values, missing: false, tone };
}

function coverageCell(key: CoverageKey) {
  return (product: InsuranceProduct): CompareCell => {
    const area = product.coverage[key];
    if (area.status === 'not-specified') return missing;
    const tone: CellTone =
      area.status === 'covered' ? 'positive' : area.status === 'not-covered' ? 'negative' : 'caution';
    const lines = [coverageStatusLabels[area.status]];
    if (area.summary) lines.push(area.summary);
    return { lines, missing: false, tone, hasStatus: true };
  };
}

export const compareRows: CompareRow[] = [
  { id: 'insurer', label: 'Insurer', getCell: (p) => ({ lines: [p.insurer], missing: false, tone: 'neutral' }) },
  {
    id: 'customers',
    label: 'Intended for',
    getCell: (p) => list(p.targetCustomers?.map((c) => customerCategoryLabels[c]) ?? null),
  },
  {
    id: 'cover-for',
    label: 'Who is covered',
    glossaryId: 'dependants',
    getCell: (p) => list(p.coverFor?.map((c) => coverForLabels[c]) ?? null),
  },
  { id: 'inpatient', label: 'Inpatient cover', glossaryId: 'inpatient', getCell: coverageCell('inpatient') },
  { id: 'outpatient', label: 'Outpatient cover', glossaryId: 'outpatient', getCell: coverageCell('outpatient') },
  { id: 'maternity', label: 'Maternity', getCell: coverageCell('maternity') },
  { id: 'dental', label: 'Dental', getCell: coverageCell('dental') },
  { id: 'optical', label: 'Optical', getCell: coverageCell('optical') },
  {
    id: 'limits',
    label: 'Benefit limits',
    glossaryId: 'benefit-limit',
    restriction: true,
    getCell: (p) => list(p.benefitLimits?.map((l) => `${l.label}: ${formatLimitAmount(l)}`) ?? null),
  },
  {
    id: 'premium',
    label: 'Premium',
    glossaryId: 'premium',
    getCell: (p) =>
      p.premium
        ? {
            lines: [
              formatPremium(p.premium),
              p.premium.basis,
              ...(p.premium.illustrative ? ['Fictional demonstration value'] : []),
            ],
            missing: false,
            tone: 'neutral',
            hasStatus: true,
          }
        : missing,
  },
  {
    id: 'waiting',
    label: 'Waiting periods',
    glossaryId: 'waiting-period',
    restriction: true,
    getCell: (p) => list(p.waitingPeriods?.map((w) => `${w.appliesTo}: ${w.duration}`) ?? null, 'caution'),
  },
  {
    id: 'exclusions',
    label: 'Exclusions',
    glossaryId: 'exclusion',
    restriction: true,
    getCell: (p) => list(p.exclusions, 'caution'),
  },
  { id: 'eligibility', label: 'Eligibility', getCell: (p) => list(p.eligibility) },
  { id: 'requirements', label: 'Enrolment requirements', getCell: (p) => list(p.enrolmentRequirements) },
  {
    id: 'contact',
    label: 'Contact and next steps',
    glossaryId: 'intermediary',
    getCell: (p) =>
      p.contactRoute.status === 'verified'
        ? { lines: p.contactRoute.channels.map((c) => `${c.label}: ${c.value}`), missing: false, tone: 'neutral' }
        : { lines: ['Contact route not verified. See the enrolment guide.'], missing: false, tone: 'caution' },
  },
];

/** True when the products do not all share the same value for a row. */
export function rowDiffers(row: CompareRow, items: InsuranceProduct[]): boolean {
  const keys = items.map((p) => {
    const cell = row.getCell(p);
    return cell.missing ? '__missing__' : cell.lines.join('\n');
  });
  return new Set(keys).size > 1;
}

export function cellText(cell: CompareCell): string {
  return cell.missing ? NOT_SPECIFIED : cell.lines.join('; ');
}
