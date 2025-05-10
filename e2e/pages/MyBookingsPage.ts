import { Page } from '@playwright/test';

export class MyBookingsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/bookings');
  }

  async expectBookingsList() {
    await this.page.waitForSelector('[data-testid="booking-item"]', { timeout: 15000 });
  }
}