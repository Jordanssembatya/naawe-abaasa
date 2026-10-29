import { Search, X } from 'lucide-react';
import { useId } from 'react';
import { COVER_FOR, CUSTOMER_CATEGORIES } from '../../data/labels';
import { useI18n } from '../../i18n/I18nProvider';
import { SORT_KEYS, type CareFilter, type CatalogueFilters as Filters, type SortKey } from '../../lib/catalogue';
import type { CoverFor, CustomerCategory } from '../../types/product';

interface CatalogueFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  canReset: boolean;
}

const CARE_FILTERS: CareFilter[] = ['inpatient', 'outpatient'];

interface ChipGroupProps<T extends string> {
  legend: string;
  options: T[];
  labelFor: (option: T) => string;
  value: T | null;
  onSelect: (value: T | null) => void;
}

/** Single-choice filter rendered as toggle chips. Choosing the active chip clears it. */
function ChipGroup<T extends string>({ legend, options, labelFor, value, onSelect }: ChipGroupProps<T>) {
  return (
    <fieldset className="chip-group">
      <legend className="chip-group__legend">{legend}</legend>
      <div className="chip-group__chips">
        {options.map((key) => (
          <button
            key={key}
            type="button"
            className="chip"
            aria-pressed={value === key}
            onClick={() => onSelect(value === key ? null : key)}
          >
            {labelFor(key)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function CatalogueFilters({ filters, onChange, onReset, canReset }: CatalogueFiltersProps) {
  const { t } = useI18n();
  const searchId = useId();
  const sortId = useId();
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="filters">
      <div className="filters__row">
        <div className="search-field">
          <label htmlFor={searchId} className="visually-hidden">
            {t('catalogue.searchLabel')}
          </label>
          <Search className="search-field__icon" size={20} aria-hidden />
          <input
            id={searchId}
            type="search"
            className="input search-field__input"
            placeholder={t('catalogue.searchLabel')}
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
          />
        </div>
        <div className="sort-field">
          <label htmlFor={sortId}>{t('catalogue.sortBy')}</label>
          <select
            id={sortId}
            className="input"
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as SortKey })}
          >
            {SORT_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`catalogue.sort.${key}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters__chips">
        <ChipGroup<CoverFor>
          legend={t('catalogue.whoIsCovered')}
          options={COVER_FOR}
          labelFor={(c) => t(`labels.coverFor.${c}`)}
          value={filters.coverFor}
          onSelect={(coverFor) => set({ coverFor })}
        />
        <ChipGroup<CareFilter>
          legend={t('catalogue.typeOfCare')}
          options={CARE_FILTERS}
          labelFor={(c) => t(`catalogue.care.${c}`)}
          value={filters.care}
          onSelect={(care) => set({ care })}
        />
        <ChipGroup<CustomerCategory>
          legend={t('catalogue.designedFor')}
          options={CUSTOMER_CATEGORIES}
          labelFor={(c) => t(`labels.customerCategory.${c}`)}
          value={filters.category}
          onSelect={(category) => set({ category })}
        />
      </div>

      {canReset && (
        <button type="button" className="button button--ghost button--sm" onClick={onReset}>
          <X size={16} aria-hidden />
          {t('catalogue.clearFilters')}
        </button>
      )}
    </div>
  );
}
