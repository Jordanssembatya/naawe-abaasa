import { WifiOff } from 'lucide-react';
import { useOnline } from '../../state/useOnline';

/** Shown while the device is offline. The app keeps working from its saved copy. */
export function OfflineNotice() {
  const online = useOnline();
  if (online) return null;

  return (
    <div className="offline-notice" role="status">
      <WifiOff size={16} aria-hidden />
      <span>You are offline. AfyaGuide still works: products, comparisons and the glossary are saved on this device.</span>
    </div>
  );
}
