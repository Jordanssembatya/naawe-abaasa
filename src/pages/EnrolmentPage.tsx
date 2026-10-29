import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { EnrolmentChecklist } from '../components/enrolment/EnrolmentChecklist';
import { ContactRouteCard } from '../components/product/ContactRouteCard';
import { InfoList } from '../components/product/InfoList';
import { Notice } from '../components/ui/Notice';
import { getProductById } from '../data/products';
import { NotFoundPage } from './NotFoundPage';

export function EnrolmentPage() {
  const { productId = '' } = useParams();
  const product = getProductById(productId);
  if (!product) return <NotFoundPage what="product" />;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link to={`/products/${product.id}`} className="back-link">
            <ArrowLeft size={16} aria-hidden />
            Back to {product.name}
          </Link>
          <p className="eyebrow">Enrolment guide</p>
          <h1 className="page-header__title">Getting ready to enrol in {product.name}</h1>
          <div className="page-header__meta">
            <span>{product.insurer}</span>
          </div>
        </div>
      </div>

      <div className="container page-body enrol-layout">
        <div className="enrol-main">
          <Notice tone="warning" title="This is guidance, not an application">
            AfyaGuide cannot enrol you, confirm eligibility or take payments. Use this checklist to prepare, then apply
            through the insurer&rsquo;s official channel. Never share medical or ID documents through unofficial
            channels.
          </Notice>
          {/* key resets checklist state when moving between products */}
          <EnrolmentChecklist key={product.id} product={product} />
        </div>

        <aside className="enrol-aside">
          <section className="side-card" aria-labelledby="docs-title">
            <h2 id="docs-title" className="side-card__title">Documents to prepare</h2>
            <InfoList items={product.requiredDocuments} missingHint="Ask the insurer which documents they need." />
          </section>
          <section className="side-card" aria-labelledby="reqs-title">
            <h2 id="reqs-title" className="side-card__title">Enrolment requirements</h2>
            <InfoList items={product.enrolmentRequirements} />
          </section>
          <section className="side-card side-card--emphasis" aria-labelledby="next-title">
            <h2 id="next-title" className="side-card__title">Next step: contact the insurer</h2>
            <ContactRouteCard route={product.contactRoute} />
          </section>
        </aside>
      </div>
    </>
  );
}
