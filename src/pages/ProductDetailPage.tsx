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
import { getGlossaryEntry } from '../data/glossary';
import {
  coverForLabels,
  coverageGlossaryIds,
  coverageLabels,
  coverageStatusLabels,
  customerCategoryLabels,
} from '../data/labels';
import { getProductById } from '../data/products';
import { formatDate, formatPremium } from '../lib/format';
import type { CoverageKey, InsuranceProduct } from '../types/product';
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

/** Glossary terms worth explaining for this product. */
function termsFor(product: InsuranceProduct): string[] {
  const ids = ['premium', 'benefit-limit', 'exclusion', 'waiting-period', 'inpatient', 'outpatient', 'pre-existing-condition'];
  if (product.benefitLimits?.some((l) => l.label.toLowerCase().includes('co-payment'))) ids.push('co-payment');
  if (product.coverFor?.includes('family')) ids.push('dependants', 'principal-member');
  return ids;
}

const coverageKeys = Object.keys(coverageLabels) as CoverageKey[];

export function ProductDetailPage() {
  const { productId = '' } = useParams();
  const product = getProductById(productId);
  if (!product) return <NotFoundPage what="product" />;

  return (
    <>
      <div className="page-header page-header--product">
        <div className="container">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} aria-hidden />
            All products
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
                Enrolment guide
              </Link>
              <CompareToggle product={product} />
            </div>
          </div>
        </div>
      </div>

      <div className="container page-body detail-layout">
        <div className="detail-main">
          <MissingInfoNotice product={product} />

          <DetailSection id="summary" title="Coverage summary" icon={ShieldAlert}>
            <p className="lead-text">{product.coverageSummary}</p>
            <ul className="coverage-grid">
              {coverageKeys.map((key) => {
                const area = product.coverage[key];
                const Icon = coverageStatusIcons[area.status];
                const glossaryId = coverageGlossaryIds[key];
                return (
                  <li key={key} className={`coverage-tile coverage-tile--${area.status}`}>
                    <span className="coverage-tile__head">
                      <Icon size={18} aria-hidden />
                      <span className="coverage-tile__name">
                        {glossaryId ? <Term id={glossaryId}>{coverageLabels[key]}</Term> : coverageLabels[key]}
                      </span>
                    </span>
                    <span className="coverage-tile__status">{coverageStatusLabels[area.status]}</span>
                    {area.summary && <span className="coverage-tile__summary">{area.summary}</span>}
                  </li>
                );
              })}
            </ul>
          </DetailSection>

          <DetailSection id="services" title="Covered services and benefits" icon={CircleCheck}>
            <InfoList items={product.coveredServices} icon={<CircleCheck size={18} />} />
          </DetailSection>

          <DetailSection id="limits" title={<><Term id="benefit-limit">Benefit limits</Term></>} icon={Wallet} tone="warning">
            <p className="muted">
              The most the insurer will pay. Costs above a limit are paid by you.
              {product.dataStatus === 'demo' && ' Amounts are fictional demonstration values.'}
            </p>
            <BenefitLimitsTable limits={product.benefitLimits} />
          </DetailSection>

          <DetailSection id="exclusions" title={<><Term id="exclusion">Exclusions</Term> and restrictions</>} icon={Ban} tone="warning">
            <InfoList
              items={product.exclusions}
              icon={<Ban size={18} />}
              variant="warning"
              missingHint="This does not mean there are no exclusions. Every policy has some. Ask for the full list."
            />
          </DetailSection>

          <DetailSection id="waiting" title={<><Term id="waiting-period">Waiting periods</Term></>} icon={Clock}>
            {product.waitingPeriods === null ? (
              <NotSpecified hint="Ask the insurer when each type of cover starts." />
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

          <DetailSection id="eligibility" title="Eligibility" icon={ListChecks}>
            <InfoList items={product.eligibility} missingHint="Confirm with the insurer whether you qualify." />
          </DetailSection>

          <DetailSection id="premium" title={<><Term id="premium">Premium</Term> (price)</>} icon={Wallet}>
            {product.premium ? (
              <div className="premium-display">
                <p className="premium-display__amount">{formatPremium(product.premium)}</p>
                <p className="muted">{product.premium.basis}</p>
                {product.premium.illustrative && (
                  <p className="fact-note">Fictional demonstration value. Real prices must come from the insurer.</p>
                )}
              </div>
            ) : (
              <NotSpecified hint="Ask the insurer for the current price." />
            )}
          </DetailSection>

          <DetailSection id="enrolment" title="Enrolment requirements and documents" icon={FileText}>
            <h3 className="subheading">Requirements</h3>
            <InfoList items={product.enrolmentRequirements} />
            <h3 className="subheading">Documents you may need</h3>
            <InfoList items={product.requiredDocuments} missingHint="Ask the insurer which documents they need." />
          </DetailSection>

          <DetailSection id="steps" title="Enrolment steps" icon={ClipboardCheck}>
            <p>
              Follow the step-by-step checklist for this product. It covers what to confirm and ask before you sign up.
            </p>
            <Link to={`/products/${product.id}/enrol`} className="button button--primary">
              Open the enrolment guide
              <ArrowRight size={16} aria-hidden />
            </Link>
          </DetailSection>

          <DetailSection id="contact" title={<>Insurer or <Term id="intermediary">authorised intermediary</Term> contact</>} icon={Building2}>
            <ContactRouteCard route={product.contactRoute} />
          </DetailSection>

          <DetailSection id="meaning" title="What this means" icon={FileText}>
            <dl className="definition-list">
              {termsFor(product).map((id) => {
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
              These are general explanations. The insurer&rsquo;s policy wording decides what applies.{' '}
              <Link to="/glossary">Open the glossary</Link>
            </p>
          </DetailSection>
        </div>

        <aside className="detail-aside" aria-label="Product at a glance">
          <div className="summary-card">
            <h2 className="summary-card__title">At a glance</h2>
            <dl className="summary-card__facts">
              <div>
                <dt>Premium</dt>
                <dd>{formatPremium(product.premium)}</dd>
              </div>
              <div>
                <dt>Who is covered</dt>
                <dd>{product.coverFor ? product.coverFor.map((c) => coverForLabels[c]).join(' or ') : 'Not specified'}</dd>
              </div>
              <div>
                <dt>Intended for</dt>
                <dd>
                  {product.targetCustomers
                    ? product.targetCustomers.map((c) => customerCategoryLabels[c]).join(', ')
                    : 'Not specified'}
                </dd>
              </div>
              <div>
                <dt>Last verified</dt>
                <dd>{product.lastVerifiedAt ? formatDate(product.lastVerifiedAt) : 'Never verified'}</dd>
              </div>
            </dl>
            <div className="summary-card__actions">
              <Link to={`/products/${product.id}/enrol`} className="button button--primary button--block">
                Enrolment guide
              </Link>
              <Link to="/compare" className="button button--secondary button--block">
                Go to comparison
              </Link>
            </div>
          </div>
          <Notice tone="info" title="Source">
            {product.sourceNotes}
          </Notice>
        </aside>
      </div>
    </>
  );
}
