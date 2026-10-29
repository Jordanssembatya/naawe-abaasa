import { CircleHelp } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

/** Shown wherever the source data does not give a value. Never implies "none". */
export function NotSpecified({ hint }: { hint?: string }) {
  const { t } = useI18n();
  return (
    <span className="not-specified">
      <CircleHelp size={16} aria-hidden />
      <span>
        {t('common.notSpecifiedData')}
        {hint && <span className="not-specified__hint"> {hint}</span>}
      </span>
    </span>
  );
}
