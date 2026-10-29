import { Check, Plus } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';
import { useCompare } from '../../state/CompareContext';
import type { InsuranceProduct } from '../../types/product';

interface CompareToggleProps {
  product: InsuranceProduct;
  size?: 'sm' | 'md';
}

export function CompareToggle({ product, size = 'md' }: CompareToggleProps) {
  const { isSelected, isFull, add, remove } = useCompare();
  const { t } = useI18n();
  const selected = isSelected(product.id);

  return (
    <button
      type="button"
      className={`button ${selected ? 'button--selected' : 'button--secondary'}${size === 'sm' ? ' button--sm' : ''}`}
      aria-pressed={selected}
      aria-label={t(selected ? 'product.toggle.remove' : 'product.toggle.add', { name: product.name })}
      title={!selected && isFull ? t('product.toggle.full') : undefined}
      onClick={() => (selected ? remove(product.id) : add(product.id))}
    >
      {selected ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
      {selected ? t('product.toggle.inComparison') : t('product.toggle.compare')}
    </button>
  );
}
