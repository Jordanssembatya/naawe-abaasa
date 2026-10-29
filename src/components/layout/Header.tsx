import { ChevronLeft, Info, Scale } from 'lucide-react';
import { Link, NavLink, useLocation, useMatches, useNavigate } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/translator';
import { appBarFor } from '../../lib/appBar';
import { useCompare } from '../../state/CompareContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

const navItems: { to: string; label: MessageKey }[] = [
  { to: '/products', label: 'nav.products' },
  { to: '/glossary', label: 'nav.glossary' },
  { to: '/about', label: 'nav.aboutData' },
];

/**
 * Desktop: the site header with its nav. Phones and tablets: an app bar. Tab
 * pages show the logo; pages below a tab show Back and the page title. The
 * tab bar (TabBar) carries the main navigation there.
 */
export function Header() {
  const { ids } = useCompare();
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const appBar = appBarFor(useMatches());

  const compareLabel = ids.length ? t('nav.compareCount', { count: ids.length }) : t('nav.compare');

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
            <button type="button" className="icon-button app-bar__back" onClick={goBack} aria-label={t('common.back')}>
              <ChevronLeft size={24} aria-hidden />
            </button>
            <span className="app-bar__title">{t(appBar.title)}</span>
          </div>
        )}

        <Link to="/" className="site-header__brand" aria-label={t('brand.home')}>
          <Logo />
        </Link>

        <nav className="site-nav" aria-label={t('nav.main')}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="site-nav__link">
              {t(item.label)}
            </NavLink>
          ))}
          <NavLink to="/compare" className="site-nav__link site-nav__compare">
            <Scale size={16} aria-hidden />
            {compareLabel}
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <Link to="/products" className="button button--primary button--sm site-header__cta">
            {t('nav.exploreInsurance')}
          </Link>
          {location.pathname !== '/about' && (
            <Link to="/about" className="icon-button app-bar__about" aria-label={t('nav.aboutPrototype')}>
              <Info size={20} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
