import { Search, X } from 'lucide-react';
import { useId } from 'react';
import { coverForLabels, customerCategoryLabels } from '../../data/labels';
import { sortLabels, type CareFilter, type CatalogueFilters as Filters, type SortKey } from '../../lib/catalogue';
import type { CoverFor, CustomerCategory } from '../../types/product';

interface CatalogueFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  canReset: boolean;
}

const careLabels: Record<CareFilter, string> = {
  inpatient: 'Includes inpatient',
  outpatient: 'Includes outpatient',
};

interface ChipGroupProps<T extends string> {
  legend: string;
  options: Record<T, string>;
  value: T | null;
  onSelect: (value: T | null) => void;
}

/** Single-choice filter rendered as toggle chips. Choosing the active chip clears it. */
function ChipGroup<T extends string>({ legend, options, value, onSelect }: ChipGroupProps<T>) {
  return (
    <fieldset className="chip-group">
      <legend className="chip-group__legend">{legend}</legend>
      <div className="chip-group__chips">
        {(Object.keys(options) as T[]).map((key) => (
          <button
            key={key}
            type="button"
            className="chip"
            aria-pressed={value === key}
            onClick={() => onSelect(value === key ? null : key)}
          >
            {options[key]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function CatalogueFilters({ filters, onChange, onReset, canReset }: CatalogueFiltersProps) {
  const searchId = useId();
  const sortId = useId();
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="filters">
      <div className="filters__row">
        <div className="search-field">
          <label htmlFor={searchId} className="visually-hidden">
            Search by product or insurer
          </label>
          <Search className="search-field__icon" size={20} aria-hidden />
          <input
            id={searchId}
            type="search"
            className="input search-field__input"
            placeholder="Search by product or insurer"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
          />
        </div>
        <div className="sort-field">
          <label htmlFor={sortId}>Sort by</label>
          <select
            id={sortId}
            className="input"
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as SortKey })}
          >
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {sortLabels[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters__chips">
        <ChipGroup<CoverFor> legend="Who is covered" options={coverForLabels} value={filters.coverFor} onSelect={(coverFor) => set({ coverFor })} />
        <ChipGroup<CareFilter> legend="Type of care" options={careLabels} value={filters.care} onSelect={(care) => set({ care })} />
        <ChipGroup<CustomerCategory>
          legend="Designed for"
          options={customerCategoryLabels}
          value={filters.category}
          onSelect={(category) => set({ category })}
        />
      </div>

      {canReset && (
        <button type="button" className="button button--ghost button--sm" onClick={onReset}>
          <X size={16} aria-hidden />
          Clear search and filters
        </button>
      )}
    </div>
  );
}
