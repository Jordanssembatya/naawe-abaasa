import { Outlet, ScrollRestoration } from 'react-router';
import { useI18n } from '../../i18n/I18nProvider';
import { CompareTray } from '../compare/CompareTray';
import { Footer } from './Footer';
import { Header } from './Header';
import { OfflineNotice } from './OfflineNotice';
import { TabBar } from './TabBar';

export function Layout() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t('common.skipToContent')}
      </a>
      <Header />
      <OfflineNotice />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CompareTray />
      <TabBar />
      <ScrollRestoration />
    </>
  );
}
