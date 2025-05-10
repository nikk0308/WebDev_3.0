import { Page } from '@playwright/test';

export class CreateBookingPage {
  constructor(private page: Page) {}

  async bookFirstAvailableSlot() {
    await this.page.waitForSelector('[data-testid="slot-book"]', { timeout: 10000  });
    await this.page.click('[data-testid="slot-book"]');
  }
}
