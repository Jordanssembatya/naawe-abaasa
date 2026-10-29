import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  FlaskConical,
  Scale,
  Search,
  UserX,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Term } from '../components/glossary/Term';
import { InstallCard } from '../components/layout/InstallCard';
import { ProductCard } from '../components/product/ProductCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { customerCategoryLabels } from '../data/labels';
import { products } from '../data/products';
import type { CustomerCategory } from '../types/product';

const steps = [
  {
    icon: Search,
    title: 'Explore',
    text: 'Browse health insurance products and read what each one covers in plain English. No sign-up needed.',
  },
  {
    icon: Scale,
    title: 'Compare',
    text: 'Put two or three products side by side and see the same details for each, including what is missing.',
  },
  {
    icon: ClipboardCheck,
    title: 'Take the next step',
    text: 'Follow a checklist of questions to ask and documents to prepare before you contact the insurer.',
  },
];

const trustPoints = [
  {
    icon: FlaskConical,
    title: 'Example products only',
    text: 'Every product in this prototype is a fictional example. No real insurer or price is shown.',
  },
  {
    icon: CircleHelp,
    title: 'We never fill in the gaps',
    text: 'If a detail is not in the record, we say so. Missing does not mean unlimited or free of restrictions.',
  },
  {
    icon: UserX,
    title: 'No account, no medical questions',
    text: 'You can browse, compare and use the checklist without signing up or sharing any personal information.',
  },
];

const quickCategories: CustomerCategory[] = ['boda-boda', 'market-vendor', 'informal-sector', 'salaried'];

export function HomePage() {
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
                Search products by name or insurer
              </label>
              <input
                id="hero-search"
                type="search"
                className="hero-search__input"
                placeholder="Product or insurer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="button button--primary hero-search__submit" aria-label="Search">
                <Search size={20} aria-hidden />
              </button>
            </form>

            <div className="hero__quick" aria-label="Browse by who the cover is for">
              <span className="hero__quick-label">Popular:</span>
              {quickCategories.map((c) => (
                <Link key={c} to={`/products?who=${c}`} className="pill pill--link">
                  {customerCategoryLabels[c]}
                </Link>
              ))}
            </div>
          </div>

          <h1 id="hero-title" className="hero__title">
            Understand your health cover before you choose.
          </h1>
          <p className="hero__lead">
            Explore and compare health insurance in plain English. See what is covered, what is not, and what to ask
            before you sign up. No account needed.
          </p>

          <div className="hero__actions">
            <Link to="/products" className="button button--primary button--lg">
              Explore insurance
            </Link>
            <Link to="/compare" className="button button--outline-light button--lg">
              Compare plans
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
          <SectionHeader eyebrow="How it works" title="Three steps to a clearer choice" id="how-title">
            AfyaGuide helps you understand health insurance. It does not sell policies or decide who is eligible.
          </SectionHeader>
          <ol className="steps">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="step">
                <span className="step__icon">
                  <Icon size={26} aria-hidden />
                </span>
                <span className="step__number">Step {index + 1}</span>
                <h3 className="step__title">{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <SectionHeader eyebrow="Demonstration products" title="Explore sample health cover" id="featured-title">
            These fictional products show how different cover can be. Real products must be confirmed with the insurer.
          </SectionHeader>
          <div className="card-grid">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="section__more">
            <Link to="/products" className="text-link">
              See all {products.length} products
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="check-title">
        <div className="container split">
          <div>
            <SectionHeader eyebrow="Before you choose" title="Four things to check in every product" align="start" id="check-title" />
            <ul className="check-list">
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>
                  The <Term id="benefit-limit" />: the most the insurer pays in a year or per visit.
                </span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>
                  Each <Term id="exclusion" />: care the policy will not pay for.
                </span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>
                  The <Term id="waiting-period" />: how long before you can claim.
                </span>
              </li>
              <li>
                <BadgeCheck size={20} aria-hidden />
                <span>
                  Whether it covers <Term id="inpatient" />, <Term id="outpatient" /> or both.
                </span>
              </li>
            </ul>
            <Link to="/glossary" className="text-link">
              Browse the full glossary
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <aside className="feature-card" aria-label="Example">
            <span className="icon-tile">
              <BookOpen size={22} aria-hidden />
            </span>
            <h3 className="feature-card__title">What a benefit limit means in practice</h3>
            <p>
              If a product has an inpatient limit of <strong>UGX 5,000,000 per year</strong> and your hospital bill
              is UGX 6,000,000, the insurer pays up to 5,000,000. You pay the remaining 1,000,000.
            </p>
            <p className="muted">Illustrative example with fictional figures.</p>
          </aside>
        </div>
      </section>

      {/* The band and the closing call to action repeat the tab bar's destinations, so phones skip them. */}
      <section className="band desktop-only" aria-labelledby="band-title">
        <div className="container band__inner">
          <SectionHeader eyebrow="Designed for" title="Find cover that fits how you work" id="band-title" inverted />
          <div className="band__chips">
            {(Object.keys(customerCategoryLabels) as CustomerCategory[]).map((c) => (
              <Link key={c} to={`/products?who=${c}`} className="pill pill--on-dark pill--link">
                {customerCategoryLabels[c]}
              </Link>
            ))}
          </div>
          <Link to="/products" className="button button--primary">
            Explore all products
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="trust-title">
        <div className="container">
          <SectionHeader eyebrow="Trust and transparency" title="Honest about what this prototype can do" id="trust-title" />
          <div className="card-grid">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="feature-card">
                <span className="icon-tile">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="feature-card__title">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="section__more">
            <Link to="/about" className="text-link">
              Read about the data and its limits
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight desktop-only">
        <div className="container">
          <div className="cta-panel">
            <h2 className="cta-panel__title">Ready to compare your options?</h2>
            <p>Pick two or three products and see their cover, limits and exclusions side by side.</p>
            <div className="cta-panel__actions">
              <Link to="/products" className="button button--light button--lg">
                Choose products
              </Link>
              <Link to="/glossary" className="button button--outline-light button--lg">
                Learn the terms
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
