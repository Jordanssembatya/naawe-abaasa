import { coverageLabels, coverageStatusLabels } from '../../data/labels';
import type { CoverageKey, InsuranceProduct } from '../../types/product';
import { coverageStatusIcons } from './coverageStatusIcons';

const keys = Object.keys(coverageLabels) as CoverageKey[];

/** Compact row of coverage areas with their status, for product cards. */
export function CoverageChips({ product }: { product: InsuranceProduct }) {
  return (
    <ul className="coverage-chips" aria-label="Cover at a glance">
      {keys.map((key) => {
        const status = product.coverage[key].status;
        const Icon = coverageStatusIcons[status];
        return (
          <li key={key} className={`coverage-chip coverage-chip--${status}`}>
            <Icon size={14} aria-hidden />
            {coverageLabels[key]}
            <span className="visually-hidden">: {coverageStatusLabels[status]}</span>
          </li>
        );
      })}
    </ul>
  );
}
