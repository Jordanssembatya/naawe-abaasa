import { ArrowRight, Building2, Users } from 'lucide-react';
import { Link } from 'react-router';
import { coverForLabels, customerCategoryLabels } from '../../data/labels';
import { formatPremium } from '../../lib/format';
import type { InsuranceProduct } from '../../types/product';
import { Term } from '../glossary/Term';
import { CompareToggle } from './CompareToggle';
import { CoverageChips } from './CoverageChips';

export function ProductCard({ product }: { product: InsuranceProduct }) {
  const headingId = `product-${product.id}`;
  return (
    <article className="product-card" aria-labelledby={headingId}>
      {product.coverFor && (
        <p className="product-card__for">
          <Users size={20} aria-hidden />
          {product.coverFor.map((c) => coverForLabels[c]).join(' or ')}
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
            <Term id="premium">Premium</Term>
          </dt>
          <dd>
            {formatPremium(product.premium)}
            {product.premium?.illustrative && <span className="fact-note">Fictional value</span>}
          </dd>
        </div>
        <div>
          <dt>Intended for</dt>
          <dd>
            {product.targetCustomers
              ? product.targetCustomers.map((c) => customerCategoryLabels[c]).join(', ')
              : 'Not specified'}
          </dd>
        </div>
      </dl>

      <div className="product-card__actions">
        <Link to={`/products/${product.id}`} className="button button--primary button--sm">
          View details
          <ArrowRight size={16} aria-hidden />
        </Link>
        <CompareToggle product={product} size="sm" />
      </div>
    </article>
  );
}
