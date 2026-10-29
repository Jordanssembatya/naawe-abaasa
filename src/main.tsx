import '@fontsource-variable/inter';
import '@fontsource/playfair-display/latin-700.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { routes } from './routes';
import { CompareProvider } from './state/CompareContext';
import { ToastProvider } from './state/ToastContext';
import './styles/global.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <CompareProvider>
        <RouterProvider router={router} />
      </CompareProvider>
    </ToastProvider>
  </StrictMode>,
);
