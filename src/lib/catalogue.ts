import { customerCategoryLabels } from '../data/labels';
import type { CoverFor, CustomerCategory, InsuranceProduct } from '../types/product';
import { yearlyPremium } from './format';

export type CareFilter = 'inpatient' | 'outpatient';
export type SortKey = 'name' | 'premium-low' | 'inpatient-limit-high';

export interface CatalogueFilters {
  query: string;
  coverFor: CoverFor | null;
  care: CareFilter | null;
  category: CustomerCategory | null;
  sort: SortKey;
}

export const sortLabels: Record<SortKey, string> = {
  name: 'Name (A to Z)',
  'premium-low': 'Lowest yearly premium',
  'inpatient-limit-high': 'Highest inpatient limit',
};

const sortKeys = Object.keys(sortLabels) as SortKey[];
const categories = Object.keys(customerCategoryLabels) as CustomerCategory[];

function oneOf<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

export function filtersFromParams(params: URLSearchParams): CatalogueFilters {
  return {
    query: params.get('q') ?? '',
    coverFor: oneOf(params.get('for'), ['individual', 'family'] as const),
    care: oneOf(params.get('care'), ['inpatient', 'outpatient'] as const),
    category: oneOf(params.get('who'), categories),
    sort: oneOf(params.get('sort'), sortKeys) ?? 'name',
  };
}

export function filtersToParams(filters: CatalogueFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set('q', filters.query);
  if (filters.coverFor) params.set('for', filters.coverFor);
  if (filters.care) params.set('care', filters.care);
  if (filters.category) params.set('who', filters.category);
  if (filters.sort !== 'name') params.set('sort', filters.sort);
  return params;
}

export function hasActiveFilters(filters: CatalogueFilters): boolean {
  return Boolean(filters.query.trim() || filters.coverFor || filters.care || filters.category);
}

function matchesQuery(product: InsuranceProduct, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [product.name, product.insurer, product.tagline].some((text) => text.toLowerCase().includes(q));
}

function inpatientLimit(product: InsuranceProduct): number | null {
  const limit = product.benefitLimits?.find((l) => l.label.toLowerCase().includes('inpatient'));
  return limit?.amountUgx ?? null;
}

/** Sorts numbers with unknown values always last, regardless of direction. */
function compareKnown(a: number | null, b: number | null, direction: 1 | -1): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return (a - b) * direction;
}

export function applyFilters(products: InsuranceProduct[], filters: CatalogueFilters): InsuranceProduct[] {
  const filtered = products.filter(
    (p) =>
      matchesQuery(p, filters.query) &&
      (!filters.coverFor || (p.coverFor?.includes(filters.coverFor) ?? false)) &&
      (!filters.care || p.coverage[filters.care].status === 'covered') &&
      (!filters.category || (p.targetCustomers?.includes(filters.category) ?? false)),
  );

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case 'premium-low':
        return compareKnown(yearlyPremium(a.premium), yearlyPremium(b.premium), 1) || a.name.localeCompare(b.name);
      case 'inpatient-limit-high':
        return compareKnown(inpatientLimit(a), inpatientLimit(b), -1) || a.name.localeCompare(b.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });
}
