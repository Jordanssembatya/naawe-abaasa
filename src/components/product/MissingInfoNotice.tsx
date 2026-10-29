import { getMissingFields } from '../../lib/missing';
import type { InsuranceProduct } from '../../types/product';
import { Notice } from '../ui/Notice';

export function MissingInfoNotice({ product }: { product: InsuranceProduct }) {
  const missing = getMissingFields(product);
  if (missing.length === 0) {
    return (
      <Notice tone="info" title="All standard fields are filled in">
        Even so, the full policy document may contain conditions not shown here. Check it before you commit.
      </Notice>
    );
  }
  return (
    <Notice tone="warning" title={`${missing.length} detail${missing.length === 1 ? ' is' : 's are'} missing from this record`}>
      <p>
        Missing information does not mean there is no restriction or that a benefit is unlimited. Ask the insurer
        about:
      </p>
      <ul className="bullet-list">
        {missing.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Notice>
  );
}
