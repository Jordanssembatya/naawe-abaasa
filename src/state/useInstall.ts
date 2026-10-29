import { useSyncExternalStore } from 'react';
import { installStore, type InstallState } from '../lib/install';

const serverState: InstallState = { canPrompt: false, installed: false };

export function useInstall(): InstallState {
  return useSyncExternalStore(installStore.subscribe, installStore.getSnapshot, () => serverState);
}
