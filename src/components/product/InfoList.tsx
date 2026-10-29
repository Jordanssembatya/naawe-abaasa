import type { ReactNode } from 'react';
import { NotSpecified } from '../ui/NotSpecified';

interface InfoListProps {
  items: string[] | null;
  icon?: ReactNode;
  emptyText?: string;
  missingHint?: string;
  variant?: 'plain' | 'warning';
}

/** A list from the product record, or a clear "not specified" message. */
export function InfoList({ items, icon, emptyText = 'None listed.', missingHint, variant = 'plain' }: InfoListProps) {
  if (items === null) return <NotSpecified hint={missingHint} />;
  if (items.length === 0) return <p className="muted">{emptyText}</p>;
  return (
    <ul className={`info-list info-list--${variant}`}>
      {items.map((item) => (
        <li key={item}>
          {icon && <span className="info-list__icon" aria-hidden>{icon}</span>}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
