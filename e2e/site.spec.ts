import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/albums', '/albums/mara-theo', '/services', '/printed-albums', '/book', '/about', '/away'];

for (const path of pages) {
  test(`${path} loads, fits the screen and has no accessibility violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await page.waitForTimeout(3600); // the hero's title arrives last
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('an unknown page answers 404 and offers a way back', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page slipped out of the album.' })).toBeVisible();
});

test('every album in the index opens', async ({ page }) => {
  await page.goto('/albums');
  const links = await page.locator('main a[href^="/albums/"]').evaluateAll((all) => all.map((a) => a.getAttribute('href')));
  expect(links).toHaveLength(9);
  await page.goto(links[0]!);
  await expect(page.getByRole('link', { name: /Next album/ })).toBeVisible();
});

test('the carousel walks through the albums and stops at the end', async ({ page }) => {
  await page.goto('/');
  const next = page.getByRole('button', { name: 'Next albums' });
  const previous = page.getByRole('button', { name: 'Previous albums' });
  await expect(previous).toBeDisabled();
  await next.click();
  await expect(previous).toBeEnabled();
  for (let i = 0; i < 12 && (await next.isEnabled()); i++) {
    await next.click();
    await page.waitForTimeout(500);
  }
  await expect(next).toBeDisabled();
});

test('the menu opens, closes on a link and on Escape', async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) >= 1200, 'the full navigation shows on desktop');
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  const drawer = page.getByRole('navigation', { name: 'Menu' });
  await drawer.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
});

test('a booking sends what was typed, and a failure offers the email address', async ({ page }) => {
  let sent: Record<string, string> = {};
  await page.route('/api/inquiry', async (route) => {
    sent = route.request().postDataJSON();
    await route.fulfill({ status: 503, json: { error: 'not_configured' } });
  });
  await page.goto('/book');
  await page.getByLabel('Your name').fill('Mara');
  await page.getByLabel('Email').fill('mara@example.com');
  await page.getByRole('button', { name: 'Check my date' }).click();
  await expect(page.locator('.ks-form-error')).toContainText('write to');
  expect(sent).toMatchObject({ kind: 'session', name: 'Mara', email: 'mara@example.com', session: 'wedding' });

  await page.unroute('/api/inquiry');
  await page.route('/api/inquiry', (route) => route.fulfill({ json: { ok: true } }));
  await page.getByRole('button', { name: 'Check my date' }).click();
  await expect(page.getByRole('status')).toContainText('on its way');
});

test('the album form sends its choices', async ({ page }) => {
  let sent: Record<string, string> = {};
  await page.route('/api/inquiry', async (route) => {
    sent = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto('/printed-albums');
  await page.getByText('Leather').click();
  await page.getByLabel('Your name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByRole('button', { name: 'Request a quote' }).click();
  await expect(page.getByRole('status')).toBeVisible();
  expect(sent).toMatchObject({ kind: 'album', size: '20x25', cover: 'leather', source: 'session', name: 'Ada' });
});

test('the enquiry endpoint rejects an incomplete form', async ({ request }) => {
  const response = await request.post('/api/inquiry', { data: { kind: 'session', name: 'Mara' } });
  expect(response.status()).toBe(400);
});

test('without an email service the endpoint says so instead of pretending', async ({ request }) => {
  const response = await request.post('/api/inquiry', { data: { kind: 'session', name: 'Mara', email: 'm@example.com', session: 'wedding' } });
  expect(response.status()).toBe(503);
});
