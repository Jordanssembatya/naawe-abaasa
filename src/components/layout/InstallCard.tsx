import { Download, Share, SquarePlus, X } from 'lucide-react';
import { useState } from 'react';
import { isIos, promptInstall } from '../../lib/install';
import { readJson, writeJson } from '../../lib/storage';
import { useInstall } from '../../state/useInstall';

const DISMISSED_KEY = 'afyaguide.installDismissed';
const isTrue = (value: unknown): value is boolean => value === true;

/**
 * Invites the visitor to add AfyaGuide to their home screen. Chrome/Edge get an
 * Install button; iPhone/iPad Safari get the manual steps. Hidden once installed,
 * when the browser cannot install, or after "Not now".
 */
export function InstallCard() {
  const { canPrompt, installed } = useInstall();
  const [dismissed, setDismissed] = useState(() => readJson(DISMISSED_KEY, false, isTrue));
  const ios = isIos();

  if (installed || dismissed || (!canPrompt && !ios)) return null;

  const dismiss = () => {
    writeJson(DISMISSED_KEY, true);
    setDismissed(true);
  };

  return (
    <section className="install-card" aria-labelledby="install-title">
      <img src="/pwa-192x192.png" alt="" className="install-card__icon" width={48} height={48} />
      <div className="install-card__body">
        <h2 id="install-title" className="install-card__title">
          Get the AfyaGuide app
        </h2>
        {canPrompt ? (
          <p>Add it to your home screen. It opens like an app and works without internet.</p>
        ) : (
          <p>
            Tap <Share size={16} aria-hidden className="install-card__glyph" /> <strong>Share</strong>, then{' '}
            <SquarePlus size={16} aria-hidden className="install-card__glyph" /> <strong>Add to Home Screen</strong>. It
            opens like an app and works without internet.
          </p>
        )}
        {canPrompt && (
          <button type="button" className="button button--primary button--sm" onClick={() => void promptInstall()}>
            <Download size={16} aria-hidden />
            Install app
          </button>
        )}
      </div>
      <button type="button" className="icon-button icon-button--sm install-card__close" onClick={dismiss} aria-label="Not now">
        <X size={16} aria-hidden />
      </button>
    </section>
  );
}
