import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyBookingsPage } from '../pages/MyBookingsPage';
import { sharedUser } from '../utils/shared-user';

test('user can login and view bookings', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookingsPage = new MyBookingsPage(page);

  await loginPage.goto();
  await loginPage.login(sharedUser.email, sharedUser.password);
  await bookingsPage.goto();
  await bookingsPage.expectBookingsList();
  await expect(page.getByTestId('booking-item').first()).toBeVisible();
  await page.close();
});