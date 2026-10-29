/**
 * "Add to Home Screen" support. Chrome and Edge fire `beforeinstallprompt`,
 * which is kept so the app can offer its own Install button. Safari on iPhone
 * and iPad has no such event, so the app shows the Share → Add to Home Screen
 * steps instead. The listeners are added when this module loads, before
 * React renders, so an early event is not missed.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface InstallState {
  /** The browser offered an install prompt we can show. */
  canPrompt: boolean;
  /** Running as the installed app (or installed during this visit). */
  installed: boolean;
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)')?.matches === true ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** iPhone or iPad Safari, where installing is a manual Share-sheet step. iPadOS reports itself as a Mac. */
export function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

let deferred: BeforeInstallPromptEvent | null = null;
let state: InstallState = { canPrompt: false, installed: isStandalone() };
const listeners = new Set<() => void>();

function update(next: Partial<InstallState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // show our own button instead of the browser's mini-infobar
    deferred = event as BeforeInstallPromptEvent;
    update({ canPrompt: true });
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    update({ canPrompt: false, installed: true });
  });
}

export const installStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => state,
};

/** Opens the browser's install dialog. A prompt can only be used once. */
export async function promptInstall(): Promise<void> {
  const event = deferred;
  if (!event) return;
  deferred = null;
  await event.prompt();
  const { outcome } = await event.userChoice;
  update({ canPrompt: false, installed: state.installed || outcome === 'accepted' });
}
