import { ArrowRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { getProductById } from '../../data/products';
import { MAX_COMPARE, useCompare } from '../../state/CompareContext';

/** Sticky bar showing the current comparison selection on browsing pages. */
export function CompareTray() {
  const { ids, remove } = useCompare();
  const { pathname } = useLocation();

  if (ids.length === 0 || pathname === '/compare') return null;

  const ready = ids.length >= 2;

  return (
    <aside className="compare-tray" aria-label="Comparison selection">
      <div className="container compare-tray__inner">
        <div className="compare-tray__summary">
          <p className="compare-tray__count">
            {ids.length} of {MAX_COMPARE} selected
          </p>
          <ul className="compare-tray__items">
            {ids.map((id) => (
              <li key={id} className="compare-tray__item">
                <span>{getProductById(id)?.name}</span>
                <button
                  type="button"
                  className="icon-button icon-button--sm"
                  onClick={() => remove(id)}
                  aria-label={`Remove ${getProductById(id)?.name} from comparison`}
                >
                  <X size={14} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {ready ? (
          <Link to="/compare" className="button button--primary">
            Compare now
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : (
          <p className="compare-tray__hint">Add one more product to compare</p>
        )}
      </div>
    </aside>
  );
}
