import { useI18n } from '../../i18n/I18nProvider';
import { getMissingFields } from '../../lib/missing';
import type { InsuranceProduct } from '../../types/product';
import { Notice } from '../ui/Notice';

export function MissingInfoNotice({ product }: { product: InsuranceProduct }) {
  const { t } = useI18n();
  const missing = getMissingFields(product);
  if (missing.length === 0) {
    return (
      <Notice tone="info" title={t('product.missing.allFilledTitle')}>
        {t('product.missing.allFilledText')}
      </Notice>
    );
  }
  const title =
    missing.length === 1 ? t('product.missing.titleOne') : t('product.missing.titleOther', { count: missing.length });
  return (
    <Notice tone="warning" title={title}>
      <p>{t('product.missing.intro')}</p>
      <ul className="bullet-list">
        {missing.map((field) => (
          <li key={field}>{t(`product.missing.fields.${field}`)}</li>
        ))}
      </ul>
    </Notice>
  );
}
