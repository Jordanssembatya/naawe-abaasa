import { describe, expect, it } from 'vitest';
import { getProductById, products } from '../data/products';
import type { InsuranceProduct } from '../types/product';
import { applyFilters, filtersFromParams, filtersToParams, type CatalogueFilters } from './catalogue';
import { buildChecklist } from './checklist';
import { cellText, compareRows, rowDiffers } from './compare';
import { formatPremium, formatUgx } from './format';
import { getMissingFields } from './missing';

const base: CatalogueFilters = { query: '', coverFor: null, care: null, category: null, sort: 'name' };
const product = (id: string): InsuranceProduct => {
  const p = getProductById(id);
  if (!p) throw new Error(`missing fixture ${id}`);
  return p;
};

describe('sample data', () => {
  it('labels every product as demo data and never invents a contact route', () => {
    expect(products.length).toBeGreaterThanOrEqual(3);
    for (const p of products) {
      expect(p.dataStatus).toBe('demo');
      expect(p.contactRoute.status).toBe('unverified');
      expect(p.premium?.illustrative ?? true).toBe(true);
    }
  });

  it('has unique ids', () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });
});

describe('catalogue filtering', () => {
  it('searches by product name and insurer, case-insensitively', () => {
    expect(applyFilters(products, { ...base, query: 'boda' }).map((p) => p.id)).toEqual(['boda-inpatient-basic']);
    expect(applyFilters(products, { ...base, query: 'demo insurer c' }).map((p) => p.id)).toEqual(['vendor-outpatient-plus']);
  });

  it('returns nothing for an unmatched search', () => {
    expect(applyFilters(products, { ...base, query: 'zzz-no-match' })).toEqual([]);
  });

  it('filters by family cover and outpatient care', () => {
    const ids = applyFilters(products, { ...base, coverFor: 'family', care: 'outpatient' }).map((p) => p.id);
    expect(ids.sort()).toEqual(['family-starter', 'vendor-outpatient-plus']);
  });

  it('sorts by yearly premium with unknown prices last', () => {
    const ids = applyFilters(products, { ...base, sort: 'premium-low' }).map((p) => p.id);
    // 12,000 x 12 < 25,000 x 12 < 1,800,000; salaried has no premium.
    expect(ids).toEqual(['vendor-outpatient-plus', 'boda-inpatient-basic', 'family-starter', 'salaried-comprehensive']);
  });

  it('round-trips filters through URL params and ignores invalid values', () => {
    const filters: CatalogueFilters = { query: 'vendor', coverFor: 'family', care: 'inpatient', category: 'market-vendor', sort: 'premium-low' };
    expect(filtersFromParams(filtersToParams(filters))).toEqual(filters);
    expect(filtersFromParams(new URLSearchParams('for=everyone&sort=bogus'))).toEqual(base);
  });
});

describe('comparison', () => {
  it('shows "Not specified" for missing values instead of guessing', () => {
    const premiumRow = compareRows.find((r) => r.id === 'premium');
    const exclusionsRow = compareRows.find((r) => r.id === 'exclusions');
    const salaried = product('salaried-comprehensive');
    expect(cellText(premiumRow!.getCell(salaried))).toBe('Not specified in demonstration data');
    expect(exclusionsRow!.getCell(salaried).missing).toBe(true);
  });

  it('flags rows that differ between products', () => {
    const insurer = compareRows.find((r) => r.id === 'insurer')!;
    const contact = compareRows.find((r) => r.id === 'contact')!;
    const items = [product('boda-inpatient-basic'), product('family-starter')];
    expect(rowDiffers(insurer, items)).toBe(true);
    expect(rowDiffers(contact, items)).toBe(false);
  });

  it('compares the same fields for every product', () => {
    for (const p of products) {
      expect(compareRows.map((r) => r.getCell(p))).toHaveLength(compareRows.length);
    }
  });
});

describe('missing fields', () => {
  it('lists every unspecified field of an incomplete record', () => {
    expect(getMissingFields(product('salaried-comprehensive'))).toEqual(
      expect.arrayContaining(['Premium (price)', 'Exclusions', 'Eligibility rules', 'Some benefit limit amounts or periods']),
    );
  });

  it('reports a missing coverage area and missing waiting periods', () => {
    expect(getMissingFields(product('vendor-outpatient-plus'))).toEqual(
      expect.arrayContaining(['Waiting periods', 'Some coverage areas', 'Required documents']),
    );
  });
});

describe('checklist and formatting', () => {
  it('inserts product-specific steps before the application form step', () => {
    const items = buildChecklist(product('boda-inpatient-basic'));
    const productStep = items.findIndex((i) => i.id === 'product-0');
    const formStep = items.findIndex((i) => i.id === 'get-form');
    expect(productStep).toBeGreaterThan(-1);
    expect(productStep).toBe(formStep - 1);
  });

  it('builds the standard checklist when a product has no extra steps', () => {
    expect(buildChecklist(product('salaried-comprehensive'))).toHaveLength(7);
  });

  it('formats Uganda shillings and missing premiums', () => {
    expect(formatUgx(5_000_000)).toBe('UGX 5,000,000');
    expect(formatPremium(null)).toBe('Not specified in demonstration data');
  });
});
