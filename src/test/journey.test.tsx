import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { routes } from '../routes';
import { AppProviders } from '../AppProviders';

function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return router;
}

describe('main user journey', () => {
  it('goes from search to details, glossary, comparison and enrolment', async () => {
    const user = userEvent.setup();
    const router = renderApp('/');

    // 1. Search from the homepage.
    await user.type(screen.getByRole('searchbox', { name: /search products/i }), 'boda');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(router.state.location.pathname).toBe('/products');
    expect(screen.getByText('1 of 4 products match')).toBeInTheDocument();

    // 2. Open the product details.
    await user.click(screen.getByRole('link', { name: 'Boda Inpatient Basic' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Boda Inpatient Basic' })).toBeInTheDocument();

    // 3. Coverage, exclusions and a benefit limit are visible.
    expect(screen.getByRole('heading', { name: /coverage summary/i })).toBeInTheDocument();
    expect(screen.getByText('Cosmetic procedures')).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: 'Total inpatient cover' })).toBeInTheDocument();
    expect(screen.getAllByText('UGX 5,000,000').length).toBeGreaterThan(0);

    // 4. Open a term explanation, then close it with Escape.
    const termButton = screen.getAllByRole('button', { name: /waiting periods.*what does this mean/i })[0]!;
    await user.click(termButton);
    expect(screen.getByRole('note', { name: 'Waiting period explained' })).toHaveTextContent(/time after joining/i);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('note', { name: 'Waiting period explained' })).not.toBeInTheDocument();

    // 5. Add this product and another to the comparison.
    await user.click(screen.getByRole('button', { name: 'Add Boda Inpatient Basic to comparison' }));
    await user.click(screen.getAllByRole('link', { name: /all products/i })[0]!);
    await user.click(screen.getByRole('button', { name: 'Add Salaried Comprehensive to comparison' }));
    await user.click(screen.getByRole('link', { name: /compare now/i }));

    // 6. The same fields are compared and missing values are labelled.
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    expect(headers.map((h) => h.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining('Boda Inpatient Basic'), expect.stringContaining('Salaried Comprehensive')]),
    );
    const premiumRow = within(table).getByRole('row', { name: /^premium/i });
    expect(premiumRow).toHaveTextContent('Not specified in demonstration data');

    // 7. Remove one product; the page asks for another.
    await user.click(screen.getByRole('button', { name: 'Remove Salaried Comprehensive' }));
    expect(screen.getByRole('heading', { name: 'Choose one more product' })).toBeInTheDocument();

    // 8. Follow the enrolment checklist.
    await router.navigate('/products/boda-inpatient-basic/enrol');
    const progress = await screen.findByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
    await user.click(screen.getByLabelText(/review what is covered/i));
    expect(progress).toHaveAttribute('aria-valuenow', '1');
    expect(screen.getByText(/1 of 8 steps done/)).toBeInTheDocument();

    // 9. No fake contact details: the unverified route is explained.
    expect(screen.getAllByRole('heading', { name: 'Contact route not verified' }).length).toBeGreaterThan(0);
    expect(document.querySelector('a[href^="tel:"], a[href^="mailto:"]')).toBeNull();
  });

  it('shows an empty state when no product matches and can reset', async () => {
    const user = userEvent.setup();
    renderApp('/products?q=nothing-matches-this');
    expect(screen.getByRole('heading', { name: 'No products match your search' })).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /clear search and filters/i })[0]!);
    expect(screen.getByText('Showing all 4 products')).toBeInTheDocument();
  });

  it('shows a not-found page for an unknown product', () => {
    renderApp('/products/does-not-exist');
    expect(screen.getByRole('heading', { name: 'We could not find that product' })).toBeInTheDocument();
  });

  it('filters the glossary and shows an empty state', async () => {
    const user = userEvent.setup();
    renderApp('/glossary');
    const search = screen.getByRole('searchbox', { name: /search the glossary/i });
    await user.type(search, 'waiting');
    expect(screen.getByText('Waiting period', { selector: 'dt' })).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, 'qqqq');
    expect(screen.getByRole('heading', { name: /no terms match/i })).toBeInTheDocument();
  });
});
