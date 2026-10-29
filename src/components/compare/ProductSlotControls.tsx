import { Trash2 } from 'lucide-react';
import { useId } from 'react';
import { products } from '../../data/products';
import { useI18n } from '../../i18n/I18nProvider';
import { useCompare } from '../../state/CompareContext';
import type { InsuranceProduct } from '../../types/product';

/** Replace or remove one product in the comparison. */
export function ProductSlotControls({ product }: { product: InsuranceProduct }) {
  const { ids, replace, remove } = useCompare();
  const { t } = useI18n();
  const selectId = useId();
  const alternatives = products.filter((p) => !ids.includes(p.id));

  return (
    <div className="slot-controls">
      {alternatives.length > 0 && (
        <>
          <label htmlFor={selectId} className="visually-hidden">
            {t('compare.replaceLabel', { name: product.name })}
          </label>
          <select
            id={selectId}
            className="input input--sm"
            value=""
            onChange={(e) => e.target.value && replace(product.id, e.target.value)}
          >
            <option value="">{t('compare.replacePlaceholder')}</option>
            {alternatives.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        type="button"
        className="button button--ghost button--sm"
        onClick={() => remove(product.id)}
        aria-label={t('compare.removeLabel', { name: product.name })}
      >
        <Trash2 size={14} aria-hidden />
        {t('compare.remove')}
      </button>
    </div>
  );
}
