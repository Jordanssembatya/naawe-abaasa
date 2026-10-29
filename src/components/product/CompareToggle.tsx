import { Check, Plus } from 'lucide-react';
import { useCompare } from '../../state/CompareContext';
import type { InsuranceProduct } from '../../types/product';

interface CompareToggleProps {
  product: InsuranceProduct;
  size?: 'sm' | 'md';
}

export function CompareToggle({ product, size = 'md' }: CompareToggleProps) {
  const { isSelected, isFull, add, remove } = useCompare();
  const selected = isSelected(product.id);

  return (
    <button
      type="button"
      className={`button ${selected ? 'button--selected' : 'button--secondary'}${size === 'sm' ? ' button--sm' : ''}`}
      aria-pressed={selected}
      aria-label={`${selected ? 'Remove' : 'Add'} ${product.name} ${selected ? 'from' : 'to'} comparison`}
      title={!selected && isFull ? 'Comparison is full. Remove a product first.' : undefined}
      onClick={() => (selected ? remove(product.id) : add(product.id))}
    >
      {selected ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
      {selected ? 'In comparison' : 'Compare'}
    </button>
  );
}
