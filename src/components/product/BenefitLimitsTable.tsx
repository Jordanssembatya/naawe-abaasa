import { useI18n } from '../../i18n/I18nProvider';
import { formatUgx } from '../../lib/format';
import type { BenefitLimit } from '../../types/product';
import { NotSpecified } from '../ui/NotSpecified';

export function BenefitLimitsTable({ limits }: { limits: BenefitLimit[] | null }) {
  const { t } = useI18n();
  if (limits === null) {
    return <NotSpecified hint={t('product.limitsTable.missingHint')} />;
  }
  const notSpecified = <span className="text-missing">{t('common.notSpecified')}</span>;
  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption className="visually-hidden">{t('product.limitsTable.caption')}</caption>
        <thead>
          <tr>
            <th scope="col">{t('product.limitsTable.benefit')}</th>
            <th scope="col">{t('product.limitsTable.mostPaid')}</th>
            <th scope="col">{t('product.limitsTable.period')}</th>
          </tr>
        </thead>
        <tbody>
          {limits.map((limit) => (
            <tr key={limit.label}>
              <th scope="row">
                {limit.label}
                {limit.notes && <span className="data-table__note">{limit.notes}</span>}
              </th>
              <td className="data-table__amount">{limit.amountUgx === null ? notSpecified : formatUgx(limit.amountUgx)}</td>
              <td>{limit.period ? t(`labels.limitPeriod.${limit.period}`) : notSpecified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
