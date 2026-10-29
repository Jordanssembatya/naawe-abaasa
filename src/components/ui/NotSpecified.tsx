import { CircleHelp } from 'lucide-react';
import { NOT_SPECIFIED } from '../../data/labels';

/** Shown wherever the source data does not give a value. Never implies "none". */
export function NotSpecified({ hint }: { hint?: string }) {
  return (
    <span className="not-specified">
      <CircleHelp size={16} aria-hidden />
      <span>
        {NOT_SPECIFIED}
        {hint && <span className="not-specified__hint"> {hint}</span>}
      </span>
    </span>
  );
}
