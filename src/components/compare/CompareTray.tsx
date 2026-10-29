import { ArrowRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { getProductById } from '../../data/products';
import { useI18n } from '../../i18n/I18nProvider';
import { MAX_COMPARE, useCompare } from '../../state/CompareContext';

/** Sticky bar showing the current comparison selection on browsing pages. */
export function CompareTray() {
  const { ids, remove } = useCompare();
  const { t } = useI18n();
  const { pathname } = useLocation();

  if (ids.length === 0 || pathname === '/compare') return null;

  const ready = ids.length >= 2;

  return (
    <aside className="compare-tray" aria-label={t('compare.tray.label')}>
      <div className="container compare-tray__inner">
        <div className="compare-tray__summary">
          <p className="compare-tray__count">{t('compare.tray.count', { count: ids.length, max: MAX_COMPARE })}</p>
          <ul className="compare-tray__items">
            {ids.map((id) => {
              const name = getProductById(id)?.name ?? '';
              return (
                <li key={id} className="compare-tray__item">
                  <span>{name}</span>
                  <button
                    type="button"
                    className="icon-button icon-button--sm"
                    onClick={() => remove(id)}
                    aria-label={t('compare.tray.removeItem', { name })}
                  >
                    <X size={14} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {ready ? (
          <Link to="/compare" className="button button--primary">
            {t('compare.tray.compareNow')}
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : (
          <p className="compare-tray__hint">{t('compare.tray.addOneMore')}</p>
        )}
      </div>
    </aside>
  );
}
