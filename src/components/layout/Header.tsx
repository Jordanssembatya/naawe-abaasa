import { Menu, Scale, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { useCompare } from '../../state/CompareContext';
import { Logo } from './Logo';

const navItems = [
  { to: '/products', label: 'Products' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About the data' },
];

export function Header() {
  const { ids } = useCompare();
  const { pathname } = useLocation();
  // The menu remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuOpen = openOn === pathname;

  const compareLabel = `Compare${ids.length ? ` (${ids.length})` : ''}`;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
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
          <Link to="/compare" className="icon-button site-header__compare-mobile" aria-label={compareLabel}>
            <Scale size={20} aria-hidden />
            {ids.length > 0 && <span className="count-dot" aria-hidden>{ids.length}</span>}
          </Link>
          <button
            type="button"
            className="icon-button site-header__menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenOn(menuOpen ? null : pathname)}
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Main">
          <div className="container">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="mobile-menu__link">
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/compare" className="mobile-menu__link">
              {compareLabel}
            </NavLink>
            <Link to="/products" className="button button--primary button--block">
              Explore insurance
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
