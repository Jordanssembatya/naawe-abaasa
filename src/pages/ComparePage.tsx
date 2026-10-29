import { ArrowLeft, Scale } from 'lucide-react';
import { useId, useState } from 'react';
import { Link } from 'react-router';
import { CompareStacked, CompareTable } from '../components/compare/CompareTable';
import { CompareToggle } from '../components/product/CompareToggle';
import { Notice } from '../components/ui/Notice';
import { PageHeader } from '../components/ui/PageHeader';
import { useI18n } from '../i18n/I18nProvider';
import { MAX_COMPARE, useCompare } from '../state/CompareContext';
import { useMediaQuery } from '../state/useMediaQuery';
import type { InsuranceProduct } from '../types/product';

function ProductPicker() {
  const { products } = useI18n();
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
  const { t, tRich, products, getProduct } = useI18n();
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const isWide = useMediaQuery('(min-width: 768px)', true);
  const addId = useId();

  const items = ids.map(getProduct).filter((p): p is InsuranceProduct => Boolean(p));
  const available = products.filter((p) => !ids.includes(p.id));

  return (
    <>
      <PageHeader eyebrow={t('compare.eyebrow')} title={t('compare.title')}>
        {t('compare.lead')}
      </PageHeader>

      <div className="container page-body">
        {items.length < 2 ? (
          <div className="empty-state empty-state--left">
            <span className="icon-tile icon-tile--lg">
              <Scale size={28} aria-hidden />
            </span>
            <h2 className="empty-state__title">{t(items.length === 0 ? 'compare.chooseTwo' : 'compare.chooseOneMore')}</h2>
            <p>
              {tRich('compare.upTo', {
                max: MAX_COMPARE,
                link: <Link to="/products">{t('compare.catalogueLink')}</Link>,
              })}
            </p>
            <ProductPicker />
          </div>
        ) : (
          <>
            <div className="compare-toolbar">
              <Link to="/products" className="button button--ghost button--sm">
                <ArrowLeft size={16} aria-hidden />
                {t('compare.backToCatalogue')}
              </Link>
              <label className="toggle">
                <input type="checkbox" checked={differencesOnly} onChange={(e) => setDifferencesOnly(e.target.checked)} />
                <span>{t('compare.differencesOnly')}</span>
              </label>
              {!isFull && available.length > 0 && (
                <div className="compare-toolbar__add">
                  <label htmlFor={addId} className="visually-hidden">{t('compare.addLabel')}</label>
                  <select id={addId} className="input input--sm" value="" onChange={(e) => e.target.value && add(e.target.value)}>
                    <option value="">{t('compare.addPlaceholder')}</option>
                    {available.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <button type="button" className="button button--ghost button--sm" onClick={clear}>
                {t('compare.clearAll')}
              </button>
            </div>

            <Notice tone="info">{t('compare.notice')}</Notice>

            {isWide ? (
              <CompareTable items={items} differencesOnly={differencesOnly} />
            ) : (
              <CompareStacked items={items} differencesOnly={differencesOnly} />
            )}

            <div className="compare-next">
              <h2 className="subheading">{t('compare.nextSteps')}</h2>
              <ul className="compare-next__list">
                {items.map((p) => (
                  <li key={p.id}>
                    <Link to={`/products/${p.id}/enrol`} className="text-link">
                      {t('compare.guideFor', { name: p.name })}
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
