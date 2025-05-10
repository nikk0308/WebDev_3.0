import { Page } from '@playwright/test';

export class CreateVenuePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/venues/create');
  }

  async createVenueWithSlot(name: string, location: string, type: string, description: string, startTime: string, endTime: string) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="location"]', location);
    await this.page.fill('input[name="type"]', type);
    await this.page.fill('textarea[name="description"]', description);
    await this.page.fill('input[name="start_time"]', startTime);
    await this.page.fill('input[name="end_time"]', endTime);
    await this.page.click('button[type="submit"]');
  }
}