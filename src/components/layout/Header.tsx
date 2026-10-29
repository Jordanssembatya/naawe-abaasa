import { ChevronLeft, Info, Scale } from 'lucide-react';
import { Link, NavLink, useLocation, useMatches, useNavigate } from 'react-router';
import { appBarFor } from '../../lib/appBar';
import { useCompare } from '../../state/CompareContext';
import { Logo } from './Logo';

const navItems = [
  { to: '/products', label: 'Products' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About the data' },
];

/**
 * Desktop: the site header with its nav. Phones and tablets: an app bar. Tab
 * pages show the logo; pages below a tab show Back and the page title. The
 * tab bar (TabBar) carries the main navigation there.
 */
export function Header() {
  const { ids } = useCompare();
  const location = useLocation();
  const navigate = useNavigate();
  const appBar = appBarFor(useMatches());

  const compareLabel = `Compare${ids.length ? ` (${ids.length})` : ''}`;

  const goBack = () => {
    if (!appBar) return;
    // Opened straight on this page (a shared link, or a reload): there is no
    // in-app page behind it, so go up to its parent instead of leaving the app.
    if (location.key === 'default') navigate(appBar.backTo, { replace: true });
    else navigate(-1);
  };

  return (
    <header className={`site-header${appBar ? ' site-header--sub' : ''}`}>
      <div className="container site-header__inner">
        {appBar && (
          <div className="app-bar__lead">
            <button type="button" className="icon-button app-bar__back" onClick={goBack} aria-label="Back">
              <ChevronLeft size={24} aria-hidden />
            </button>
            <span className="app-bar__title">{appBar.title}</span>
          </div>
        )}

        <Link to="/" className="site-header__brand" aria-label="AfyaGuide Uganda home">
          <Logo />
        </Link>

        <nav className="site-nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="site-nav__link">
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/compare" className="site-nav__link site-nav__compare">
            <Scale size={16} aria-hidden />
            {compareLabel}
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <Link to="/products" className="button button--primary button--sm site-header__cta">
            Explore insurance
          </Link>
          {location.pathname !== '/about' && (
            <Link to="/about" className="icon-button app-bar__about" aria-label="About this prototype">
              <Info size={20} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
