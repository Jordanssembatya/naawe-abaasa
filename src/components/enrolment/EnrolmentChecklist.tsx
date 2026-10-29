import { Check, RotateCcw } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';
import { buildChecklist } from '../../lib/checklist';
import { useChecklist } from '../../state/useChecklist';
import type { InsuranceProduct } from '../../types/product';

export function EnrolmentChecklist({ product }: { product: InsuranceProduct }) {
  const { t } = useI18n();
  const items = buildChecklist(product, t);
  const { completed, toggle, reset, total } = useChecklist(
    product.id,
    items.map((i) => i.id),
  );
  const percent = Math.round((completed.length / total) * 100);
  const allDone = completed.length === total;

  return (
    <div className="checklist">
      <div className="checklist__progress">
        <div className="checklist__progress-text">
          <span id="checklist-progress-label">{t('enrol.progress', { done: completed.length, total })}</span>
          {completed.length > 0 && (
            <button type="button" className="button button--ghost button--sm" onClick={reset}>
              <RotateCcw size={14} aria-hidden />
              {t('enrol.startAgain')}
            </button>
          )}
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-labelledby="checklist-progress-label"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completed.length}
        >
          <div className="progress__bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ol className="checklist__items">
        {items.map((item, index) => {
          const done = completed.includes(item.id);
          const inputId = `step-${product.id}-${item.id}`;
          return (
            <li key={item.id} className={`checklist__item${done ? ' checklist__item--done' : ''}`}>
              <input
                id={inputId}
                type="checkbox"
                className="checklist__checkbox"
                checked={done}
                onChange={() => toggle(item.id)}
              />
              <label htmlFor={inputId} className="checklist__label">
                <span className="checklist__box" aria-hidden>
                  {done ? <Check size={16} /> : index + 1}
                </span>
                <span>
                  <span className="checklist__title">{item.title}</span>
                  {item.detail && <span className="checklist__detail">{item.detail}</span>}
                  {item.id.startsWith('product-') && <span className="checklist__tag">{t('enrol.forThisProduct')}</span>}
                </span>
              </label>
            </li>
          );
        })}
      </ol>

      <p className="checklist__saved" role="status">
        {allDone ? t('enrol.allDone') : t('enrol.savedNote')}
      </p>
    </div>
  );
}
