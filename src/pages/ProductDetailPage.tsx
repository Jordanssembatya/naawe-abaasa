import {
  ArrowLeft,
  ArrowRight,
  Ban,
  Building2,
  CircleCheck,
  ClipboardCheck,
  Clock,
  FileText,
  ListChecks,
  ShieldAlert,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { Term } from '../components/glossary/Term';
import { BenefitLimitsTable } from '../components/product/BenefitLimitsTable';
import { CompareToggle } from '../components/product/CompareToggle';
import { ContactRouteCard } from '../components/product/ContactRouteCard';
import { coverageStatusIcons } from '../components/product/coverageStatusIcons';
import { InfoList } from '../components/product/InfoList';
import { MissingInfoNotice } from '../components/product/MissingInfoNotice';
import { NotSpecified } from '../components/ui/NotSpecified';
import { Notice } from '../components/ui/Notice';
import { COVERAGE_KEYS, coverageGlossaryIds } from '../data/labels';
import { getProductById } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import { formatPremium } from '../lib/format';
import type { InsuranceProduct } from '../types/product';
import { NotFoundPage } from './NotFoundPage';

interface DetailSectionProps {
  id: string;
  title: ReactNode;
  icon: LucideIcon;
  tone?: 'default' | 'warning';
  children: ReactNode;
}

function DetailSection({ id, title, icon: Icon, tone = 'default', children }: DetailSectionProps) {
  return (
    <section className={`detail-section detail-section--${tone}`} aria-labelledby={id}>
      <h2 id={id} className="detail-section__title">
        <span className={`icon-tile icon-tile--sm${tone === 'warning' ? ' icon-tile--warning' : ''}`}>
          <Icon size={18} aria-hidden />
        </span>
        <span>{title}</span>
      </h2>
      <div className="detail-section__body">{children}</div>
    </section>
  );
}

/** Glossary terms worth explaining for this product. Checks the English record. */
function termsFor(product: InsuranceProduct): string[] {
  const ids = ['premium', 'benefit-limit', 'exclusion', 'waiting-period', 'inpatient', 'outpatient', 'pre-existing-condition'];
  if (product.benefitLimits?.some((l) => l.label.toLowerCase().includes('co-payment'))) ids.push('co-payment');
  if (product.coverFor?.includes('family')) ids.push('dependants', 'principal-member');
  return ids;
}

export function ProductDetailPage() {
  const { productId = '' } = useParams();
  const { t, tRich, getProduct, getGlossaryEntry, formatDate } = useI18n();
  const source = getProductById(productId);
  const product = getProduct(productId);
  if (!source || !product) return <NotFoundPage what="product" />;

  return (
    <>
      <div className="page-header page-header--product">
        <div className="container">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} aria-hidden />
            {t('product.allProducts')}
          </Link>
          <div className="product-hero">
            <div>
              <h1 className="page-header__title">{product.name}</h1>
              <p className="product-hero__insurer">
                <Building2 size={16} aria-hidden />
                {product.insurer}
              </p>
              <p className="page-header__lead">{product.tagline}</p>
            </div>
            <div className="product-hero__actions">
              <Link to={`/products/${product.id}/enrol`} className="button button--primary">
                <ClipboardCheck size={16} aria-hidden />
                {t('product.enrolmentGuide')}
              </Link>
              <CompareToggle product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="container page-body detail-layout">
        <div className="detail-main">
          <MissingInfoNotice product={product} />

          <DetailSection id="summary" title={t('product.coverageSummary')} icon={ShieldAlert}>
            <p className="lead-text">{product.coverageSummary}</p>
            <ul className="coverage-grid">
              {COVERAGE_KEYS.map((key) => {
                const area = product.coverage[key];
                const Icon = coverageStatusIcons[area.status];
                const glossaryId = coverageGlossaryIds[key];
                const label = t(`labels.coverage.${key}`);
                return (
                  <li key={key} className={`coverage-tile coverage-tile--${area.status}`}>
                    <span className="coverage-tile__head">
                      <Icon size={18} aria-hidden />
                      <span className="coverage-tile__name">{glossaryId ? <Term id={glossaryId}>{label}</Term> : label}</span>
                    </span>
                    <span className="coverage-tile__status">{t(`labels.coverageStatus.${area.status}`)}</span>
                    {area.summary && <span className="coverage-tile__summary">{area.summary}</span>}
                  </li>
                );
              })}
            </ul>
          </DetailSection>

          <DetailSection id="services" title={t('product.coveredServices')} icon={CircleCheck}>
            <InfoList items={product.coveredServices} icon={<CircleCheck size={18} />} />
          </DetailSection>

          <DetailSection id="limits" title={<Term id="benefit-limit">{t('product.benefitLimits')}</Term>} icon={Wallet} tone="warning">
            <p className="muted">
              {t('product.limitsNote')}
              {product.dataStatus === 'demo' && ` ${t('product.limitsDemoNote')}`}
            </p>
            <BenefitLimitsTable limits={product.benefitLimits} />
          </DetailSection>

          <DetailSection
            id="exclusions"
            title={tRich('product.exclusionsTitle', { term: <Term id="exclusion">{t('product.exclusions')}</Term> })}
            icon={Ban}
            tone="warning"
          >
            <InfoList items={product.exclusions} icon={<Ban size={18} />} variant="warning" missingHint={t('product.exclusionsHint')} />
          </DetailSection>

          <DetailSection id="waiting" title={<Term id="waiting-period">{t('product.waitingPeriods')}</Term>} icon={Clock}>
            {product.waitingPeriods === null ? (
              <NotSpecified hint={t('product.waitingHint')} />
            ) : (
              <dl className="kv-list">
                {product.waitingPeriods.map((w) => (
                  <div key={w.appliesTo} className="kv-list__row">
                    <dt>{w.appliesTo}</dt>
                    <dd>{w.duration}</dd>
                  </div>
                ))}
              </dl>
            )}
          </DetailSection>

          <DetailSection id="eligibility" title={t('product.eligibility')} icon={ListChecks}>
            <InfoList items={product.eligibility} missingHint={t('product.eligibilityHint')} />
          </DetailSection>

          <DetailSection
            id="premium"
            title={tRich('product.premiumTitle', { term: <Term id="premium">{t('product.premium')}</Term> })}
            icon={Wallet}
          >
            {product.premium ? (
              <div className="premium-display">
                <p className="premium-display__amount">{formatPremium(product.premium, t)}</p>
                <p className="muted">{product.premium.basis}</p>
                {product.premium.illustrative && <p className="fact-note">{t('product.premiumFictional')}</p>}
              </div>
            ) : (
              <NotSpecified hint={t('product.premiumHint')} />
            )}
          </DetailSection>

          <DetailSection id="enrolment" title={t('product.enrolmentTitle')} icon={FileText}>
            <h3 className="subheading">{t('product.requirements')}</h3>
            <InfoList items={product.enrolmentRequirements} />
            <h3 className="subheading">{t('product.documentsYouMayNeed')}</h3>
            <InfoList items={product.requiredDocuments} missingHint={t('product.documentsHint')} />
          </DetailSection>

          <DetailSection id="steps" title={t('product.stepsTitle')} icon={ClipboardCheck}>
            <p>{t('product.stepsText')}</p>
            <Link to={`/products/${product.id}/enrol`} className="button button--primary">
              {t('product.openGuide')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </DetailSection>

          <DetailSection
            id="contact"
            title={tRich('product.contactTitle', { term: <Term id="intermediary">{t('product.intermediary')}</Term> })}
            icon={Building2}
          >
            <ContactRouteCard route={product.contactRoute} />
          </DetailSection>

          <DetailSection id="meaning" title={t('product.meaningTitle')} icon={FileText}>
            <dl className="definition-list">
              {termsFor(source).map((id) => {
                const entry = getGlossaryEntry(id);
                return entry ? (
                  <div key={id} className="definition-list__row">
                    <dt>{entry.term}</dt>
                    <dd>{entry.short}</dd>
                  </div>
                ) : null;
              })}
            </dl>
            <p className="muted">
              {t('product.meaningNote')} <Link to="/glossary">{t('product.openGlossary')}</Link>
            </p>
          </DetailSection>
        </div>

        <aside className="detail-aside" aria-label={t('product.atAGlanceLabel')}>
          <div className="summary-card">
            <h2 className="summary-card__title">{t('product.atAGlance')}</h2>
            <dl className="summary-card__facts">
              <div>
                <dt>{t('product.premium')}</dt>
                <dd>{formatPremium(product.premium, t)}</dd>
              </div>
              <div>
                <dt>{t('product.whoIsCovered')}</dt>
                <dd>
                  {product.coverFor
                    ? product.coverFor.map((c) => t(`labels.coverFor.${c}`)).join(t('common.or'))
                    : t('common.notSpecified')}
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
              <div>
                <dt>{t('product.lastVerified')}</dt>
                <dd>{product.lastVerifiedAt ? formatDate(product.lastVerifiedAt) : t('product.neverVerified')}</dd>
              </div>
            </dl>
            <div className="summary-card__actions">
              <Link to={`/products/${product.id}/enrol`} className="button button--primary button--block">
                {t('product.enrolmentGuide')}
              </Link>
              <Link to="/compare" className="button button--secondary button--block">
                {t('product.goToComparison')}
              </Link>
            </div>
          </div>
          <Notice tone="info" title={t('product.source')}>
            {product.sourceNotes}
          </Notice>
        </aside>
      </div>
    </>
  );
}
