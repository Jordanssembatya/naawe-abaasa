import type { CompareCell } from '../../lib/compare';
import { NotSpecified } from '../ui/NotSpecified';

export function CompareCellView({ cell }: { cell: CompareCell }) {
  if (cell.missing) return <NotSpecified />;
  const [first, ...rest] = cell.lines;
  if (cell.lines.length === 1) {
    return <span className={`cell-value cell-value--${cell.tone}`}>{first}</span>;
  }
  // Headline value (coverage status or price) followed by details.
  if (cell.hasStatus) {
    return (
      <span className="cell-stack">
        <span className={`cell-value cell-value--${cell.tone}`}>{first}</span>
        {rest.map((line) => (
          <span key={line} className="cell-detail">{line}</span>
        ))}
      </span>
    );
  }
  return (
    <ul className={`cell-list cell-list--${cell.tone}`}>
      {cell.lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
