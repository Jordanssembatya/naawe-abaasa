import { CUSTOMER_CATEGORIES } from '../data/labels';
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

/** Sort options in display order. Labels are in `catalogue.sort`. */
export const SORT_KEYS: SortKey[] = ['name', 'premium-low', 'inpatient-limit-high'];

function oneOf<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

export function filtersFromParams(params: URLSearchParams): CatalogueFilters {
  return {
    query: params.get('q') ?? '',
    coverFor: oneOf(params.get('for'), ['individual', 'family'] as const),
    care: oneOf(params.get('care'), ['inpatient', 'outpatient'] as const),
    category: oneOf(params.get('who'), CUSTOMER_CATEGORIES),
    sort: oneOf(params.get('sort'), SORT_KEYS) ?? 'name',
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

/** The text a search matches against. Pages pass one that adds the translated text. */
export type SearchText = (product: InsuranceProduct) => string[];

const englishSearchText: SearchText = (p) => [p.name, p.insurer, p.tagline];

function matchesQuery(product: InsuranceProduct, query: string, searchText: SearchText): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return searchText(product).some((text) => text.toLowerCase().includes(q));
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

/** Filters and sorts the English records (sorting relies on their labels); translate the results for display. */
export function applyFilters(
  products: InsuranceProduct[],
  filters: CatalogueFilters,
  searchText: SearchText = englishSearchText,
): InsuranceProduct[] {
  const filtered = products.filter(
    (p) =>
      matchesQuery(p, filters.query, searchText) &&
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
