import { limitPeriodLabels } from '../../data/labels';
import { formatUgx } from '../../lib/format';
import type { BenefitLimit } from '../../types/product';
import { NotSpecified } from '../ui/NotSpecified';

export function BenefitLimitsTable({ limits }: { limits: BenefitLimit[] | null }) {
  if (limits === null) {
    return <NotSpecified hint="This does not mean the cover is unlimited. Ask the insurer for every limit." />;
  }
  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">Benefit limits</caption>
        <thead>
          <tr>
            <th scope="col">Benefit</th>
            <th scope="col">Most the insurer pays</th>
            <th scope="col">Period</th>
          </tr>
        </thead>
        <tbody>
          {limits.map((limit) => (
            <tr key={limit.label}>
              <th scope="row">
                {limit.label}
                {limit.notes && <span className="data-table__note">{limit.notes}</span>}
              </th>
              <td className="data-table__amount">
                {limit.amountUgx === null ? <span className="text-missing">Not specified</span> : formatUgx(limit.amountUgx)}
              </td>
              <td>{limit.period ? limitPeriodLabels[limit.period] : <span className="text-missing">Not specified</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
