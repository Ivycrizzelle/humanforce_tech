import { test, expect } from '@playwright/test';
import { config } from '../lib/helpers/config';
import {
  generateValidUsername,
  generateName,
  generateFakeCode,
} from '../lib/helpers/generate-random-text';
const ShortName = generateValidUsername();
const Name = generateName();
const ExpostrCode = generateFakeCode();
test.describe('Feature: Admin Manages Area table', () => {
  // Shared setup for all tests: navigate to the same page before each test
  test.beforeEach(async ({ page }) => {
    //redirect to homepage
    await page.goto(`${config.HF.CHALLENGE_URL}`);
    //fill up its details
    await page
      .getByLabel('Employee code or email')
      .fill(`${config.HF.ADMIN_ACCOUNT}`);
    await page.getByLabel('Password').fill(`${config.HF.CRED_PASS}`);
    await page.getByRole('button', { name: 'Log In' }).click();
    //assert that the welcome banner message is visible and close it
    const welcomeText = page.locator('text=× Welcome to Humanforce!');
    if (await welcomeText.isVisible()) {
      await page.locator('text=×').click();
    } else {
      // Otherwise, if welcome banner is not visible then check if header title is visible
      const header = page.locator('hf-home-header');
      await expect(header).toBeVisible();
      await page.getByRole('button', { name: 'Admin' }).click();
      await page.getByRole('button', { name: 'Admin Config' }).click();
      await page.getByRole('button', { name: 'Org Structure' }).click();
      await page.getByRole('link', { name: 'Areas' }).click();
      const helpMebtn = page
        .locator('div')
        .filter({ hasText: 'Help Me Add an Area' })
        .first();
      await helpMebtn.waitFor({ state: 'visible' });
    }
  });

  test('As Admin I should be able to add a New Area', async ({ page }) => {
    await page.getByRole('link', { name: ' Add new record' }).click();
    await page
      .locator('div')
      .filter({ hasText: /^Edit$/ })
      .waitFor({ state: 'visible' });

    await page.getByLabel('Name', { exact: true }).fill(`${Name}`);
    await page.getByLabel('Short Name').fill(`${ShortName}`);

    await page.getByLabel('Export Code').fill(`${ExpostrCode}`);
    await page.getByRole('button', { name: ' Save' }).click();

    // Wait for the row containing the dynamic username to appear
    await page.waitForSelector(`tr[role="row"]:has-text("${Name}")`);

    const newAccountRow = page.locator(
      `td[role="gridcell"]:has-text("${Name}")`,
    );
    expect(await newAccountRow.isVisible()).toBe(true);
  });
  test('As Admin I should be able to delete an existing Area', async ({
    page,
  }) => {
    await page
      .getByRole('row', { name: 'Edit Delete' })
      .getByRole('button')
      .nth(1)
      .click();
    await page.getByLabel('Confirm').click();
    await page.getByRole('link', { name: 'Yes' }).click();
  });
  test('As Admin I should be able to update an existing Area', async ({
    page,
  }) => {
    await page
      .getByRole('row', { name: 'Edit' })
      .getByRole('button')
      .first()
      .click();
    await page.getByLabel('Export Code').fill('pqa1');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(
      page.getByRole('gridcell', { name: 'pqa1' }).first(),
    ).toBeVisible();
  });
  test('As Admin I should be able to undelete an Area', async ({ page }) => {
    await page.getByRole('link', { name: ' UnDelete' }).click();
    await page
      .locator(
        'div:nth-child(2) > table > tbody > tr > .k-command-cell > .k-button',
      )
      .first()
      .click();
    const SecondCellText = await page
      .locator('.k-grid-content:nth-child(2) td:nth-child(1)')
      .textContent();
    console.log('Restored Data:', SecondCellText); // Logs the data from the second cell
    await page
      .getByLabel('UnDelete')
      .getByRole('button', { name: 'Close' })
      .click();
    // Assert that the restored data is visible in the admin row table
    await expect(
      page.locator(`tr[role="row"]:has-text("${SecondCellText}")`),
    ).toBeVisible();
  });
});
