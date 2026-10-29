import { COVERAGE_KEYS } from '../../data/labels';
import { useI18n } from '../../i18n/I18nProvider';
import type { InsuranceProduct } from '../../types/product';
import { coverageStatusIcons } from './coverageStatusIcons';

/** Compact row of coverage areas with their status, for product cards. */
export function CoverageChips({ product }: { product: InsuranceProduct }) {
  const { t } = useI18n();
  return (
    <ul className="coverage-chips" aria-label={t('product.coverAtAGlance')}>
      {COVERAGE_KEYS.map((key) => {
        const status = product.coverage[key].status;
        const Icon = coverageStatusIcons[status];
        return (
          <li key={key} className={`coverage-chip coverage-chip--${status}`}>
            <Icon size={14} aria-hidden />
            {t(`labels.coverage.${key}`)}
            <span className="visually-hidden">: {t(`labels.coverageStatus.${status}`)}</span>
          </li>
        );
      })}
    </ul>
  );
}
