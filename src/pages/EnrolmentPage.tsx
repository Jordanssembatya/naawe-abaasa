import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { EnrolmentChecklist } from '../components/enrolment/EnrolmentChecklist';
import { ContactRouteCard } from '../components/product/ContactRouteCard';
import { InfoList } from '../components/product/InfoList';
import { Notice } from '../components/ui/Notice';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

export function EnrolmentPage() {
  const { productId = '' } = useParams();
  const { t, getProduct } = useI18n();
  const product = getProduct(productId);
  if (!product) return <NotFoundPage what="product" />;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Link to={`/products/${product.id}`} className="back-link">
            <ArrowLeft size={16} aria-hidden />
            {t('enrol.backTo', { name: product.name })}
          </Link>
          <p className="eyebrow">{t('enrol.eyebrow')}</p>
          <h1 className="page-header__title">{t('enrol.title', { name: product.name })}</h1>
          <div className="page-header__meta">
            <span>{product.insurer}</span>
          </div>
        </div>
      </div>

      <div className="container page-body enrol-layout">
        <div className="enrol-main">
          <Notice tone="warning" title={t('enrol.noticeTitle')}>
            {t('enrol.noticeText')}
          </Notice>
          {/* key resets checklist state when moving between products */}
          <EnrolmentChecklist key={product.id} product={product} />
        </div>

        <aside className="enrol-aside">
          <section className="side-card" aria-labelledby="docs-title">
            <h2 id="docs-title" className="side-card__title">{t('enrol.documents')}</h2>
            <InfoList items={product.requiredDocuments} missingHint={t('product.documentsHint')} />
          </section>
          <section className="side-card" aria-labelledby="reqs-title">
            <h2 id="reqs-title" className="side-card__title">{t('enrol.requirements')}</h2>
            <InfoList items={product.enrolmentRequirements} />
          </section>
          <section className="side-card side-card--emphasis" aria-labelledby="next-title">
            <h2 id="next-title" className="side-card__title">{t('enrol.nextStep')}</h2>
            <ContactRouteCard route={product.contactRoute} />
          </section>
        </aside>
      </div>
    </>
  );
}
