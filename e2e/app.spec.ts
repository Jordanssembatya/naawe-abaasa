import { expect, test, type Page } from '@playwright/test';

const pages = ['/', '/products', '/products/family-starter', '/products/vendor-outpatient-plus/enrol', '/compare', '/glossary', '/about'];
const widths = [360, 390, 768, 1280];

/** Fails the test on any console error or uncaught exception. */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

async function seedComparison(page: Page) {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem('afyaguide.compare', JSON.stringify(['boda-inpatient-basic', 'salaried-comprehensive']));
      sessionStorage.setItem('seeded', '1');
    }
  });
}

for (const width of widths) {
  test(`no horizontal overflow or console errors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await seedComparison(page);
    const errors = watchErrors(page);
    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} overflows by ${overflow}px at ${width}px`).toBeLessThanOrEqual(0);
      await page.screenshot({ path: `screenshots/${width}${path.replace(/\//g, '_') || '_home'}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test('mobile journey: discover, understand, compare, prepare to enrol', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  const errors = watchErrors(page);

  // Home, mobile menu works.
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Glossary' }).click();
  await expect(page).toHaveURL(/\/glossary$/);
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await page.goto('/');

  // Find a product with a filter chip.
  await page.getByRole('link', { name: 'Market vendors' }).first().click();
  await expect(page.getByText('1 of 4 products match')).toBeVisible();
  await page.getByRole('button', { name: 'Includes inpatient' }).click();
  await page.getByRole('button', { name: 'Family', exact: true }).click();
  await expect(page.getByText('1 of 4 products match')).toBeVisible();
  await page.getByRole('link', { name: 'Vendor Outpatient Plus' }).click();

  // Details: coverage, exclusions, limits, missing-info warning.
  await expect(page.getByRole('heading', { level: 1, name: 'Vendor Outpatient Plus' })).toBeVisible();
  await expect(page.getByText(/details are missing from this record/)).toBeVisible();
  await expect(page.getByText('Spectacles and contact lenses')).toBeVisible();
  await expect(page.getByRole('rowheader', { name: /Co-payment per clinic visit/ })).toBeVisible();

  // Term explanation is visible on screen and closes on outside tap.
  await page.getByRole('button', { name: /benefit limits.*what does this mean/i }).first().click();
  const note = page.getByRole('note', { name: 'Benefit limit explained' });
  await expect(note).toBeVisible();
  const box = (await note.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(360);
  await page.mouse.click(5, 300);
  await expect(note).toHaveCount(0);

  // Compare two products.
  await page.getByRole('button', { name: 'Add Vendor Outpatient Plus to comparison' }).click();
  await expect(page.getByText('1 of 3 selected')).toBeVisible();
  await page.goBack();
  await expect(page.getByText('1 of 4 products match')).toBeVisible(); // filters restored by Back
  await page.getByRole('button', { name: 'Clear search and filters' }).first().click();
  await page.getByRole('button', { name: 'Add Salaried Comprehensive to comparison' }).click();
  await page.getByRole('link', { name: /compare now/i }).click();

  // Stacked mobile comparison with the same fields for both products.
  const fields = page.locator('.compare-field');
  await expect(fields.first()).toBeVisible();
  const count = await fields.count();
  for (let i = 0; i < count; i++) await expect(fields.nth(i).locator('.compare-field__value')).toHaveCount(2);
  await expect(page.locator('.compare-field', { hasText: 'Exclusions' }).getByText('Not specified in demonstration data')).toBeVisible();

  // Replace a product, then remove one.
  await page.getByLabel('Replace Salaried Comprehensive with another product').selectOption('family-starter');
  await expect(page.getByRole('link', { name: 'Family Starter Cover' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Remove Family Starter Cover' }).click();
  await expect(page.getByRole('heading', { name: 'Choose one more product' })).toBeVisible();

  // Enrolment checklist, progress persists after reload.
  await page.goto('/products/vendor-outpatient-plus/enrol');
  await page.getByText('Review what is covered and what is excluded').click();
  await page.getByText('Confirm you are eligible').click();
  await expect(page.getByText('2 of 8 steps done')).toBeVisible();
  await page.reload();
  await expect(page.getByText('2 of 8 steps done')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Contact route not verified' })).toBeVisible();
  await expect(page.locator('a[href^="tel:"], a[href^="mailto:"]')).toHaveCount(0);

  expect(errors).toEqual([]);
});

test('keyboard: term popover opens with Enter and closes with Escape', async ({ page }) => {
  await page.goto('/products/boda-inpatient-basic');
  const trigger = page.getByRole('button', { name: /exclusions.*what does this mean/i }).first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('note', { name: 'Exclusion explained' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('note', { name: 'Exclusion explained' })).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
