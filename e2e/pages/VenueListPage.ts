import { Page } from '@playwright/test';

export class VenueListPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/venues');
    await this.page.waitForSelector('[data-testid="venue-item"] h2', { timeout: 10000 });
  }

  async clickLastVenue() {
    const items = this.page.locator('[data-testid="venue-item"]');
    const count = await items.count();

    console.log(`Знайдено майданчиків: ${count}`);
    if (count === 0) throw new Error('Немає жодного майданчика');

    await Promise.all([
      this.page.waitForNavigation({ timeout: 10000 }),
      items.nth(count - 1).locator('button', { hasText: 'Забронювати' }).click(),
    ]);
  }
}