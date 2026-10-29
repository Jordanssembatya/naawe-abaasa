import { Download, Share, SquarePlus, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { isIos, promptInstall } from '../../lib/install';
import { readJson, writeJson } from '../../lib/storage';
import { useInstall } from '../../state/useInstall';

const DISMISSED_KEY = 'afyaguide.installDismissed';
const isTrue = (value: unknown): value is boolean => value === true;

// iOS shows these button names in English: it has no Luganda, Kiswahili or
// Runyankore interface, so they stay untranslated to match the screen.
const IOS_SHARE = 'Share';
const IOS_ADD = 'Add to Home Screen';

/**
 * Invites the visitor to add InsurGuide to their home screen. Chrome/Edge get an
 * Install button; iPhone/iPad Safari get the manual steps. Hidden once installed,
 * when the browser cannot install, or after "Not now".
 */
export function InstallCard() {
  const { canPrompt, installed } = useInstall();
  const { t, tRich } = useI18n();
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
          {t('install.title')}
        </h2>
        {canPrompt ? (
          <p>{t('install.prompt')}</p>
        ) : (
          <p>
            {tRich('install.ios', {
              share: (
                <>
                  <Share size={16} aria-hidden className="install-card__glyph" /> <strong lang="en">{IOS_SHARE}</strong>
                </>
              ),
              add: (
                <>
                  <SquarePlus size={16} aria-hidden className="install-card__glyph" /> <strong lang="en">{IOS_ADD}</strong>
                </>
              ),
            })}
          </p>
        )}
        {canPrompt && (
          <button type="button" className="button button--primary button--sm" onClick={() => void promptInstall()}>
            <Download size={16} aria-hidden />
            {t('install.installButton')}
          </button>
        )}
      </div>
      <button type="button" className="icon-button icon-button--sm install-card__close" onClick={dismiss} aria-label={t('install.notNow')}>
        <X size={16} aria-hidden />
      </button>
    </section>
  );
}
