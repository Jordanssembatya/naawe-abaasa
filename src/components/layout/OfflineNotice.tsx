import { WifiOff } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';
import { useOnline } from '../../state/useOnline';

/** Shown while the device is offline. The app keeps working from its saved copy. */
export function OfflineNotice() {
  const online = useOnline();
  const { t } = useI18n();
  if (online) return null;

  return (
    <div className="offline-notice" role="status">
      <WifiOff size={16} aria-hidden />
      <span>{t('offline.notice')}</span>
    </div>
  );
}
