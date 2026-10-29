import { ArrowLeft, Scale } from 'lucide-react';
import { useId, useState } from 'react';
import { Link } from 'react-router';
import { CompareStacked, CompareTable } from '../components/compare/CompareTable';
import { CompareToggle } from '../components/product/CompareToggle';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { getProductById, products } from '../data/products';
import { MAX_COMPARE, useCompare } from '../state/CompareContext';
import { useMediaQuery } from '../state/useMediaQuery';
import type { InsuranceProduct } from '../types/product';

function ProductPicker() {
  return (
    <ul className="picker">
      {products.map((p) => (
        <li key={p.id} className="picker__item">
          <div>
            <p className="picker__name">{p.name}</p>
            <p className="muted">{p.insurer}</p>
          </div>
          <CompareToggle product={p} size="sm" />
        </li>
      ))}
    </ul>
  );
}

export function ComparePage() {
  const { ids, add, clear, isFull } = useCompare();
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const isWide = useMediaQuery('(min-width: 768px)', true);
  const addId = useId();

  const items = ids.map(getProductById).filter((p): p is InsuranceProduct => Boolean(p));
  const available = products.filter((p) => !ids.includes(p.id));

  return (
    <>
      <PageHeader eyebrow="Compare plans" title="Compare products side by side">
        Every product is shown with the same details. Where a detail is not in the record, we say so instead of guessing.
      </PageHeader>

      <div className="container page-body">
        {items.length < 2 ? (
          <div className="empty-state empty-state--left">
            <span className="icon-tile icon-tile--lg">
              <Scale size={28} aria-hidden />
            </span>
            <h2 className="empty-state__title">
              {items.length === 0 ? 'Choose at least two products to compare' : 'Choose one more product'}
            </h2>
            <p>
              You can compare up to {MAX_COMPARE} products. Add them here or from the{' '}
              <Link to="/products">product catalogue</Link>.
            </p>
            <ProductPicker />
          </div>
        ) : (
          <>
            <div className="compare-toolbar">
              <Link to="/products" className="button button--ghost button--sm">
                <ArrowLeft size={16} aria-hidden />
                Back to catalogue
              </Link>
              <label className="toggle">
                <input type="checkbox" checked={differencesOnly} onChange={(e) => setDifferencesOnly(e.target.checked)} />
                <span>Show differences only</span>
              </label>
              {!isFull && available.length > 0 && (
                <div className="compare-toolbar__add">
                  <label htmlFor={addId} className="visually-hidden">Add a product to the comparison</label>
                  <select id={addId} className="input input--sm" value="" onChange={(e) => e.target.value && add(e.target.value)}>
                    <option value="">Add a product…</option>
                    {available.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <button type="button" className="button button--ghost button--sm" onClick={clear}>
                Clear all
              </button>
            </div>

            <Notice tone="info">
              Rows marked &ldquo;Differs&rdquo; are where the products are not the same. A higher limit or price does
              not make a product the right choice for you. Think about the care you are most likely to need and what
              you can afford to pay regularly.
            </Notice>

            {isWide ? (
              <CompareTable items={items} differencesOnly={differencesOnly} />
            ) : (
              <CompareStacked items={items} differencesOnly={differencesOnly} />
            )}

            <div className="compare-next">
              <h2 className="subheading">Next steps</h2>
              <ul className="compare-next__list">
                {items.map((p) => (
                  <li key={p.id}>
                    <Link to={`/products/${p.id}/enrol`} className="text-link">
                      Enrolment guide for {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}
