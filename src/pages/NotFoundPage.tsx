import { CircleAlert } from 'lucide-react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { useI18n } from '../i18n/I18nProvider';

export function NotFoundPage({ what = 'page' }: { what?: 'page' | 'product' }) {
  const { t } = useI18n();
  return (
    <div className="container page-body">
      <div className="empty-state">
        <span className="icon-tile icon-tile--lg"><CircleAlert size={28} aria-hidden /></span>
        <h1 className="empty-state__title">{t(what === 'product' ? 'notFound.productTitle' : 'notFound.pageTitle')}</h1>
        <p>{t(what === 'product' ? 'notFound.productText' : 'notFound.pageText')}</p>
        <div className="empty-state__actions">
          <Link to="/products" className="button button--primary">{t('notFound.browseProducts')}</Link>
          <Link to="/" className="button button--secondary">{t('notFound.goHome')}</Link>
        </div>
      </div>
    </div>
  );
}

/** Shown by the router when a page throws while rendering. */
export function RouteErrorPage() {
  const error = useRouteError();
  const { t } = useI18n();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  return (
    <div className="container page-body">
      <div className="empty-state">
        <span className="icon-tile icon-tile--lg icon-tile--warning"><CircleAlert size={28} aria-hidden /></span>
        <h1 className="empty-state__title">{t('notFound.errorTitle')}</h1>
        <p>{t('notFound.errorText')}</p>
        <div className="empty-state__actions">
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>{t('notFound.reload')}</button>
          <Link to="/" className="button button--secondary">{t('notFound.goHome')}</Link>
        </div>
      </div>
    </div>
  );
}
