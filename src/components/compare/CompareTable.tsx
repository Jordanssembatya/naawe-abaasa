import { Link } from 'react-router';
import { compareRows, rowDiffers } from '../../lib/compare';
import type { InsuranceProduct } from '../../types/product';
import { Term } from '../glossary/Term';
import { CompareCellView } from './CompareCellView';
import { ProductSlotControls } from './ProductSlotControls';

interface CompareViewProps {
  items: InsuranceProduct[];
  differencesOnly: boolean;
}

function RowLabel({ label, glossaryId }: { label: string; glossaryId?: string }) {
  return glossaryId ? <Term id={glossaryId}>{label}</Term> : <>{label}</>;
}

/** Side-by-side table for tablet and desktop. The first column stays visible while scrolling. */
export function CompareTable({ items, differencesOnly }: CompareViewProps) {
  const rows = compareRows.filter((row) => !differencesOnly || rowDiffers(row, items));

  return (
    <div className="compare-table-wrap" tabIndex={0} role="region" aria-label="Comparison table, scroll sideways if needed">
      <table className="compare-table">
        <caption className="visually-hidden">Side-by-side comparison of {items.length} products</caption>
        <thead>
          <tr>
            <td className="compare-table__corner">Feature</td>
            {items.map((p) => (
              <th key={p.id} scope="col" className="compare-table__product">
                <Link to={`/products/${p.id}`} className="compare-table__product-name">
                  {p.name}
                </Link>
                <ProductSlotControls product={p} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const differs = rowDiffers(row, items);
            return (
              <tr key={row.id} className={row.restriction ? 'compare-table__row--restriction' : undefined}>
                <th scope="row">
                  <RowLabel label={row.label} glossaryId={row.glossaryId} />
                  {differs && <span className="differs-tag">Differs</span>}
                </th>
                {items.map((p) => (
                  <td key={p.id}>
                    <CompareCellView cell={row.getCell(p)} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Field-by-field stacked layout for small screens, so values never squeeze into narrow columns. */
export function CompareStacked({ items, differencesOnly }: CompareViewProps) {
  const rows = compareRows.filter((row) => !differencesOnly || rowDiffers(row, items));

  return (
    <div className="compare-stacked">
      <ol className="compare-stacked__products" aria-label="Products being compared">
        {items.map((p, index) => (
          <li key={p.id} className="compare-stacked__product">
            <span className="slot-letter" aria-hidden>{String.fromCharCode(65 + index)}</span>
            <div className="compare-stacked__product-body">
              <Link to={`/products/${p.id}`} className="compare-table__product-name">{p.name}</Link>
              <ProductSlotControls product={p} />
            </div>
          </li>
        ))}
      </ol>

      {rows.map((row) => (
        <section key={row.id} className={`compare-field${row.restriction ? ' compare-field--restriction' : ''}`}>
          <h3 className="compare-field__label">
            <RowLabel label={row.label} glossaryId={row.glossaryId} />
            {rowDiffers(row, items) && <span className="differs-tag">Differs</span>}
          </h3>
          <dl className="compare-field__values">
            {items.map((p, index) => (
              <div key={p.id} className="compare-field__value">
                <dt>
                  <span className="slot-letter slot-letter--sm" aria-hidden>{String.fromCharCode(65 + index)}</span>
                  {p.name}
                </dt>
                <dd>
                  <CompareCellView cell={row.getCell(p)} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
