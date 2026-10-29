import type { RouteObject } from 'react-router';
import { Layout } from './components/layout/Layout';
import type { AppBarHandle } from './lib/appBar';
import { AboutPage } from './pages/AboutPage';
import { CataloguePage } from './pages/CataloguePage';
import { ComparePage } from './pages/ComparePage';
import { EnrolmentPage } from './pages/EnrolmentPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage, RouteErrorPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

// Pages below a tab get a phone app bar with Back and a title (see lib/appBar.ts).
const appBar = (title: string, backTo: AppBarHandle['backTo']): AppBarHandle => ({ title, backTo });

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'products', element: <CataloguePage /> },
          {
            path: 'products/:productId',
            element: <ProductDetailPage />,
            handle: appBar('Product details', () => '/products'),
          },
          {
            path: 'products/:productId/enrol',
            element: <EnrolmentPage />,
            handle: appBar('Enrolment guide', ({ productId }) => `/products/${productId}`),
          },
          { path: 'compare', element: <ComparePage /> },
          { path: 'glossary', element: <GlossaryPage /> },
          { path: 'about', element: <AboutPage />, handle: appBar('About', () => '/') },
          { path: '*', element: <NotFoundPage />, handle: appBar('Not found', () => '/') },
        ],
      },
    ],
  },
];
