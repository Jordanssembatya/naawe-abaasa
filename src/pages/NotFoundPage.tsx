import { CircleAlert } from 'lucide-react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';

export function NotFoundPage({ what = 'page' }: { what?: 'page' | 'product' }) {
  return (
    <div className="container page-body">
      <div className="empty-state">
        <span className="icon-tile icon-tile--lg"><CircleAlert size={28} aria-hidden /></span>
        <h1 className="empty-state__title">We could not find that {what}</h1>
        <p>
          {what === 'product'
            ? 'The product may have been removed, or the link may be wrong.'
            : 'The link may be wrong or the page may have moved.'}
        </p>
        <div className="empty-state__actions">
          <Link to="/products" className="button button--primary">Browse products</Link>
          <Link to="/" className="button button--secondary">Go to home page</Link>
        </div>
      </div>
    </div>
  );
}

/** Shown by the router when a page throws while rendering. */
export function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  return (
    <div className="container page-body">
      <div className="empty-state">
        <span className="icon-tile icon-tile--lg icon-tile--warning"><CircleAlert size={28} aria-hidden /></span>
        <h1 className="empty-state__title">Something went wrong</h1>
        <p>This part of the page could not be shown. Reloading usually fixes it.</p>
        <div className="empty-state__actions">
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>Reload page</button>
          <Link to="/" className="button button--secondary">Go to home page</Link>
        </div>
      </div>
    </div>
  );
}
