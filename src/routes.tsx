import type { RouteObject } from 'react-router';
import { Layout } from './components/layout/Layout';
import { AboutPage } from './pages/AboutPage';
import { CataloguePage } from './pages/CataloguePage';
import { ComparePage } from './pages/ComparePage';
import { EnrolmentPage } from './pages/EnrolmentPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage, RouteErrorPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'products', element: <CataloguePage /> },
          { path: 'products/:productId', element: <ProductDetailPage /> },
          { path: 'products/:productId/enrol', element: <EnrolmentPage /> },
          { path: 'compare', element: <ComparePage /> },
          { path: 'glossary', element: <GlossaryPage /> },
          { path: 'about', element: <AboutPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];
