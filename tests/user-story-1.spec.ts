import { test, expect } from '@playwright/test';
import { config } from '../lib/helpers/config';

test('Feature: Navigate to the 7 benefits of workforce analytics for business article on Humanforce website', async ({
  page,
}) => {
  await test.step('Given user Navigate to the homepage', async () => {
    //redirect to homepage
    await page.goto(`${config.HF.HF_URL}`);
    await page.waitForLoadState('networkidle');
    //add soft assertion
    expect(
      page.getByRole('link', { name: 'Humanforce logo.' }).first(),
    ).toBeVisible();
    expect(page.getByRole('button', { name: 'Our suite' })).toBeVisible();
  });

  await test.step('When user click on the "7 benefits of workforce analytics for business" link', async () => {
    await page.getByRole('button', { name: 'Our suite' }).first().click();
    await page
      .locator('#nav-item-0')
      .getByRole('link', { name: 'Time & Attendance' })
      .click();
    await page.getByRole('button', { name: 'Accept all' }).click();
    await page
      .getByText('Workforce Management', { exact: true })
      .nth(1)
      .click();
    await page.getByRole('link', { name: '7 benefits of workforce' }).click();
  });

  await test.step('Then user should be redirected to the article page', async () => {
    //user must be redirected to the article page
    await expect(page).toHaveURL(
      `https://humanforce.com/blog/7-benefits-of-workforce-analytics-for-business/`,
    );
  });
});
