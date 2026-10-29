import { ArrowRight, Building2, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';
import { formatPremium } from '../../lib/format';
import type { InsuranceProduct } from '../../types/product';
import { Term } from '../glossary/Term';
import { CompareToggle } from './CompareToggle';
import { CoverageChips } from './CoverageChips';

/** Pass the product already translated (useI18n().products / getProduct). */
export function ProductCard({ product }: { product: InsuranceProduct }) {
  const { t } = useI18n();
  const headingId = `product-${product.id}`;
  return (
    <article className="product-card" aria-labelledby={headingId}>
      {product.coverFor && (
        <p className="product-card__for">
          <Users size={20} aria-hidden />
          {product.coverFor.map((c) => t(`labels.coverFor.${c}`)).join(t('common.or'))}
        </p>
      )}

      <h3 id={headingId} className="product-card__name">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="product-card__insurer">
        <Building2 size={14} aria-hidden />
        {product.insurer}
      </p>
      <p className="product-card__tagline">{product.tagline}</p>

      <CoverageChips product={product} />

      <dl className="product-card__facts">
        <div>
          <dt>
            <Term id="premium">{t('product.premium')}</Term>
          </dt>
          <dd>
            {formatPremium(product.premium, t)}
            {product.premium?.illustrative && <span className="fact-note">{t('common.fictionalValue')}</span>}
          </dd>
        </div>
        <div>
          <dt>{t('product.intendedFor')}</dt>
          <dd>
            {product.targetCustomers
              ? product.targetCustomers.map((c) => t(`labels.customerCategory.${c}`)).join(t('common.listSeparator'))
              : t('common.notSpecified')}
          </dd>
        </div>
      </dl>

      <div className="product-card__actions">
        <Link to={`/products/${product.id}`} className="button button--primary button--sm">
          {t('product.viewDetails')}
          <ArrowRight size={16} aria-hidden />
        </Link>
        <CompareToggle product={product} size="sm" />
      </div>
    </article>
  );
}
