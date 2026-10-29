import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { CatalogueFilters } from '../components/catalogue/CatalogueFilters';
import { ProductCard } from '../components/product/ProductCard';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { products } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import {
  applyFilters,
  filtersFromParams,
  filtersToParams,
  hasActiveFilters,
  type CatalogueFilters as Filters,
} from '../lib/catalogue';
import type { InsuranceProduct } from '../types/product';

export function CataloguePage() {
  const { t, getProduct } = useI18n();
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const results = useMemo(() => {
    // Filter the English records, but let the search also match the translated text.
    const translated = (p: InsuranceProduct) => getProduct(p.id) ?? p;
    const matches = applyFilters(products, filters, (p) => {
      const tp = translated(p);
      return [p.name, p.insurer, p.tagline, tp.insurer, tp.tagline];
    });
    return matches.map(translated);
  }, [filters, getProduct]);
  const active = hasActiveFilters(filters);

  // Filters live in the URL so Back from a product page restores them.
  const onChange = (next: Filters) => setParams(filtersToParams(next), { replace: true });
  const onReset = () => setParams(filtersToParams({ ...filters, query: '', coverFor: null, care: null, category: null }), { replace: true });

  return (
    <>
      <PageHeader eyebrow={t('catalogue.eyebrow')} title={t('catalogue.title')}>
        {t('catalogue.lead')}
      </PageHeader>

      <div className="container page-body">
        <Notice tone="info" title={t('catalogue.noticeTitle')}>
          {t('catalogue.noticeText')}
        </Notice>

        <CatalogueFilters filters={filters} onChange={onChange} onReset={onReset} canReset={active} />

        <p className="results-count" role="status" aria-live="polite">
          {results.length === products.length
            ? t('catalogue.showingAll', { count: products.length })
            : t('catalogue.matching', { count: results.length, total: products.length })}
        </p>

        {results.length > 0 ? (
          <div className="card-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="icon-tile icon-tile--lg">
              <SearchX size={28} aria-hidden />
            </span>
            <h2 className="empty-state__title">{t('catalogue.emptyTitle')}</h2>
            <p>{t('catalogue.emptyText')}</p>
            <button type="button" className="button button--primary" onClick={onReset}>
              {t('catalogue.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
