import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { CatalogueFilters } from '../components/catalogue/CatalogueFilters';
import { ProductCard } from '../components/product/ProductCard';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { products } from '../data/products';
import {
  applyFilters,
  filtersFromParams,
  filtersToParams,
  hasActiveFilters,
  type CatalogueFilters as Filters,
} from '../lib/catalogue';

export function CataloguePage() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(params), [params]);
  const results = useMemo(() => applyFilters(products, filters), [filters]);
  const active = hasActiveFilters(filters);

  // Filters live in the URL so Back from a product page restores them.
  const onChange = (next: Filters) => setParams(filtersToParams(next), { replace: true });
  const onReset = () => setParams(filtersToParams({ ...filters, query: '', coverFor: null, care: null, category: null }), { replace: true });

  return (
    <>
      <PageHeader eyebrow="Product catalogue" title="Explore health insurance products">
        Search, filter and open any product to see its cover, limits and exclusions. Add two or three to compare them.
      </PageHeader>

      <div className="container page-body">
        <Notice tone="info" title="All products here are demonstration data">
          They are fictional examples to show how the platform works. They are not real products offered by Ugandan
          insurers.
        </Notice>

        <CatalogueFilters filters={filters} onChange={onChange} onReset={onReset} canReset={active} />

        <p className="results-count" role="status" aria-live="polite">
          {results.length === products.length
            ? `Showing all ${products.length} products`
            : `${results.length} of ${products.length} products match`}
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
            <h2 className="empty-state__title">No products match your search</h2>
            <p>Try a different word, or remove some filters. You can search by product name or insurer.</p>
            <button type="button" className="button button--primary" onClick={onReset}>
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
