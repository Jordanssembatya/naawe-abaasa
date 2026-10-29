import type { ReactNode } from 'react';
import type { Locale } from './i18n/config';
import { I18nProvider } from './i18n/I18nProvider';
import { CompareProvider } from './state/CompareContext';
import { ToastProvider } from './state/ToastContext';

/** App-wide state. Language is outermost because toasts and comparison messages are translated. */
export function AppProviders({ children, locale }: { children: ReactNode; locale?: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <ToastProvider>
        <CompareProvider>{children}</CompareProvider>
      </ToastProvider>
    </I18nProvider>
  );
}
