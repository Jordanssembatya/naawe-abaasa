import { BookOpen, House, LayoutGrid, Scale } from 'lucide-react';
import { NavLink } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';
import type { MessageKey } from '../../i18n/translator';
import { useCompare } from '../../state/CompareContext';

const tabs: { to: string; label: MessageKey; icon: typeof House; end: boolean }[] = [
  { to: '/', label: 'nav.home', icon: House, end: true },
  { to: '/products', label: 'nav.products', icon: LayoutGrid, end: false },
  { to: '/compare', label: 'nav.compare', icon: Scale, end: false },
  { to: '/glossary', label: 'nav.glossary', icon: BookOpen, end: false },
];

/** Bottom tab bar: the app's main navigation on phones and tablets (hidden on desktop). */
export function TabBar() {
  const { ids } = useCompare();
  const { t } = useI18n();

  return (
    <nav className="tab-bar" aria-label={t('nav.main')}>
      {tabs.map(({ to, label, icon: Icon, end }) => {
        const count = to === '/compare' ? ids.length : 0;
        return (
          <NavLink key={to} to={to} end={end} className="tab-bar__link">
            <span className="tab-bar__icon">
              <Icon size={22} aria-hidden />
              {count > 0 && (
                <span className="count-dot" aria-hidden>
                  {count}
                </span>
              )}
            </span>
            <span className="tab-bar__label">{t(label)}</span>
            {count > 0 && (
              <>
                {' '}
                <span className="visually-hidden">{t('nav.selectedCount', { count })}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
