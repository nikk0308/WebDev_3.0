import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VenueListPage } from '../pages/VenueListPage';
import { CreateBookingPage } from '../pages/CreateBookingPage';
import { sharedUser } from '../utils/shared-user';

test('user can login, select venue and book slot', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const venueListPage = new VenueListPage(page);
  const bookingPage = new CreateBookingPage(page);

  await loginPage.goto();
  await loginPage.login(sharedUser.email, sharedUser.password);
  await page.waitForURL('/home');

  await venueListPage.goto();
  await venueListPage.clickLastVenue();
  await bookingPage.bookFirstAvailableSlot();

  await expect(page.url()).toMatch(/\/venues\/.+\/book/);
});