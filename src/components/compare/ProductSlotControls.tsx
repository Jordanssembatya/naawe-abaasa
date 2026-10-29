import { Trash2 } from 'lucide-react';
import { useId } from 'react';
import { products } from '../../data/products';
import { useCompare } from '../../state/CompareContext';
import type { InsuranceProduct } from '../../types/product';

/** Replace or remove one product in the comparison. */
export function ProductSlotControls({ product }: { product: InsuranceProduct }) {
  const { ids, replace, remove } = useCompare();
  const selectId = useId();
  const alternatives = products.filter((p) => !ids.includes(p.id));

  return (
    <div className="slot-controls">
      {alternatives.length > 0 && (
        <>
          <label htmlFor={selectId} className="visually-hidden">
            Replace {product.name} with another product
          </label>
          <select
            id={selectId}
            className="input input--sm"
            value=""
            onChange={(e) => e.target.value && replace(product.id, e.target.value)}
          >
            <option value="">Replace with…</option>
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
        aria-label={`Remove ${product.name}`}
      >
        <Trash2 size={14} aria-hidden />
        Remove
      </button>
    </div>
  );
}
