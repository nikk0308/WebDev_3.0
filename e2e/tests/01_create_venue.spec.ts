import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateVenuePage } from '../pages/CreateVenuePage';
import { sharedUser } from '../utils/shared-user';

const venueName = `ТестМайданчик_${Date.now()}`;
const startTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16); // now + 2h
const endTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 16); // now + 3h

test('user can login and create a venue with slot', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const createVenuePage = new CreateVenuePage(page);

  await loginPage.goto();
  await loginPage.login(sharedUser.email, sharedUser.password);
  await page.waitForURL('/home');

  await createVenuePage.goto();
  await createVenuePage.createVenueWithSlot(venueName, 'Київ', 'football', 'Тестовий опис', startTime, endTime);
});
