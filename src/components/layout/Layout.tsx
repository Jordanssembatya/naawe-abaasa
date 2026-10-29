import { Outlet, ScrollRestoration } from 'react-router';
import { CompareTray } from '../compare/CompareTray';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CompareTray />
      <ScrollRestoration />
    </>
  );
}
