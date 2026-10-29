import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { routes } from '../routes';
import { CompareProvider } from '../state/CompareContext';
import { ToastProvider } from '../state/ToastContext';

function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <ToastProvider>
      <CompareProvider>
        <RouterProvider router={router} />
      </CompareProvider>
    </ToastProvider>,
  );
  return router;
}

// The tab bar and the desktop nav are both labelled "Main"; CSS shows one at a time.
const tabBar = () => document.querySelector<HTMLElement>('.tab-bar')!;

describe('app shell', () => {
  it('tab pages show the logo and no Back button', () => {
    renderApp('/products');
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
    expect(within(tabBar()).getByRole('link', { name: 'Products' })).toHaveClass('active');
  });

  it('Back returns to the previous in-app page', async () => {
    const user = userEvent.setup();
    const router = renderApp('/products');
    await user.click(screen.getByRole('link', { name: 'Boda Inpatient Basic' }));
    expect(screen.getByText('Product details', { selector: '.app-bar__title' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(router.state.location.pathname).toBe('/products');
  });

  it('Back on a page opened directly goes up to its parent', async () => {
    const user = userEvent.setup();
    const router = renderApp('/products/boda-inpatient-basic/enrol');
    expect(screen.getByText('Enrolment guide', { selector: '.app-bar__title' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(router.state.location.pathname).toBe('/products/boda-inpatient-basic');
  });

  it('the Compare tab counts the selected products', async () => {
    const user = userEvent.setup();
    renderApp('/products');
    await user.click(screen.getByRole('button', { name: 'Add Boda Inpatient Basic to comparison' }));
    expect(within(tabBar()).getByRole('link', { name: 'Compare (1 selected)' })).toBeInTheDocument();
  });
});
