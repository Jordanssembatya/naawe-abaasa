import { BookOpen, House, LayoutGrid, Scale } from 'lucide-react';
import { NavLink } from 'react-router';
import { useCompare } from '../../state/CompareContext';

const tabs = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/products', label: 'Products', icon: LayoutGrid, end: false },
  { to: '/compare', label: 'Compare', icon: Scale, end: false },
  { to: '/glossary', label: 'Glossary', icon: BookOpen, end: false },
];

/** Bottom tab bar: the app's main navigation on phones and tablets (hidden on desktop). */
export function TabBar() {
  const { ids } = useCompare();

  return (
    <nav className="tab-bar" aria-label="Main">
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
            {label}
            {count > 0 && (
              <>
                {' '}
                <span className="visually-hidden">({count} selected)</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
