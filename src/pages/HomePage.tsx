import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  FlaskConical,
  Scale,
  Search,
  TrendingUp,
  UserX,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Term } from '../components/glossary/Term';
import { InstallCard } from '../components/layout/InstallCard';
import { ProductCard } from '../components/product/ProductCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CUSTOMER_CATEGORIES } from '../data/labels';
import { useI18n } from '../i18n/I18nProvider';
import type { MessageKey } from '../i18n/translator';
import type { CustomerCategory } from '../types/product';

const steps: { icon: typeof Search; title: MessageKey; text: MessageKey }[] = [
  { icon: Search, title: 'home.steps.explore.title', text: 'home.steps.explore.text' },
  { icon: Scale, title: 'home.steps.compare.title', text: 'home.steps.compare.text' },
  { icon: ClipboardCheck, title: 'home.steps.next.title', text: 'home.steps.next.text' },
];

const trustPoints: { icon: typeof Search; title: MessageKey; text: MessageKey }[] = [
  { icon: FlaskConical, title: 'home.trust.examples.title', text: 'home.trust.examples.text' },
  { icon: CircleHelp, title: 'home.trust.gaps.title', text: 'home.trust.gaps.text' },
  { icon: UserX, title: 'home.trust.privacy.title', text: 'home.trust.privacy.text' },
];

const quickCategories: CustomerCategory[] = ['boda-boda', 'market-vendor', 'informal-sector', 'salaried'];

export function HomePage() {
  const { t, tRich, products } = useI18n();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__toolbar">
            <form className="hero-search" role="search" onSubmit={onSearch}>
              <label htmlFor="hero-search" className="visually-hidden">
                {t('home.searchLabel')}
              </label>
              <input
                id="hero-search"
                type="search"
                className="hero-search__input"
                placeholder={t('home.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="button button--primary hero-search__submit" aria-label={t('home.searchButton')}>
                <Search size={20} aria-hidden />
              </button>
            </form>

            <div className="hero__quick" aria-label={t('home.quickLabel')}>
              <span className="hero__quick-label">
                <TrendingUp size={18} aria-hidden />
                {t('home.popular')}
              </span>
              {quickCategories.map((c) => (
                <Link key={c} to={`/products?who=${c}`} className="pill pill--link">
                  {t(`labels.customerCategory.${c}`)}
                </Link>
              ))}
            </div>
          </div>

          <h1 id="hero-title" className="hero__title">
            {t('home.title')}
          </h1>
          <p className="hero__lead">{t('home.lead')}</p>

          <div className="hero__actions">
            <Link to="/products" className="button button--primary button--lg">
              {t('home.exploreInsurance')}
            </Link>
            <Link to="/compare" className="button button--outline-light button--lg">
              {t('home.comparePlans')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <InstallCard />
      </div>

      <section className="section section--muted" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader eyebrow={t('home.howEyebrow')} title={t('home.howTitle')} id="how-title">
            {t('home.howLead')}
          </SectionHeader>
          <ol className="steps">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="step">
                <span className="step__icon">
                  <Icon size={26} aria-hidden />
                </span>
                <span className="step__number">{t('home.stepNumber', { number: index + 1 })}</span>
                <h3 className="step__title">{t(title)}</h3>
                <p>{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <SectionHeader eyebrow={t('home.featuredEyebrow')} title={t('home.featuredTitle')} id="featured-title">
            {t('home.featuredLead')}
          </SectionHeader>
          <div className="card-grid">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="section__more">
            <Link to="/products" className="text-link">
              {t('home.seeAll', { count: products.length })}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="check-title">
        <div className="container split">
          <div>
            <SectionHeader eyebrow={t('home.checkEyebrow')} title={t('home.checkTitle')} align="start" id="check-title" />
            <ul className="check-list">
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>{tRich('home.checkLimit', { term: <Term id="benefit-limit" /> })}</span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>{tRich('home.checkExclusion', { term: <Term id="exclusion" /> })}</span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>{tRich('home.checkWaiting', { term: <Term id="waiting-period" /> })}</span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>
                  {tRich('home.checkCare', { inpatient: <Term id="inpatient" />, outpatient: <Term id="outpatient" /> })}
                </span>
              </li>
            </ul>
            <Link to="/glossary" className="text-link">
              {t('home.browseGlossary')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <aside className="feature-card" aria-label={t('home.exampleLabel')}>
            <span className="icon-tile">
              <BookOpen size={22} aria-hidden />
            </span>
            <h3 className="feature-card__title">{t('home.exampleTitle')}</h3>
            <p>{tRich('home.exampleText', { limit: <strong>{t('home.exampleLimit')}</strong> })}</p>
            <p className="muted">{t('home.exampleNote')}</p>
          </aside>
        </div>
      </section>

      {/* The band and the closing call to action repeat the tab bar's destinations, so phones skip them. */}
      <section className="band desktop-only" aria-labelledby="band-title">
        <div className="container band__inner">
          <SectionHeader eyebrow={t('home.bandEyebrow')} title={t('home.bandTitle')} id="band-title" inverted />
          <div className="band__chips">
            {CUSTOMER_CATEGORIES.map((c) => (
              <Link key={c} to={`/products?who=${c}`} className="pill pill--on-dark pill--link">
                {t(`labels.customerCategory.${c}`)}
              </Link>
            ))}
          </div>
          <Link to="/products" className="button button--primary">
            {t('home.exploreAll')}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <div className="container">
          <SectionHeader eyebrow={t('home.trustEyebrow')} title={t('home.trustTitle')} id="trust-title" />
          <div className="card-grid">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature-card">
                <span className="icon-tile">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="feature-card__title">{t(title)}</h3>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
          <div className="section__more">
            <Link to="/about" className="text-link">
              {t('home.readAboutData')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight desktop-only">
        <div className="container">
          <div className="cta-panel">
            <h2 className="cta-panel__title">{t('home.ctaTitle')}</h2>
            <p>{t('home.ctaText')}</p>
            <div className="cta-panel__actions">
              <Link to="/products" className="button button--light button--lg">
                {t('home.chooseProducts')}
              </Link>
              <Link to="/glossary" className="button button--outline-light button--lg">
                {t('home.learnTerms')}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
