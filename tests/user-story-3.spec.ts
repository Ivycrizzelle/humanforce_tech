import { test, expect } from '@playwright/test';
import { config } from '../lib/helpers/config';

test.describe('Feature: Manager access help articles from HF Academy link', () => {
  // Shared setup for all tests: navigate to the same page before each test
  test.beforeEach(async ({ page }) => {
    //redirect to homepage
    await page.goto(`${config.HF.CHALLENGE_URL}`);
    //fill up its details
    await page
      .getByLabel('Employee code or email')
      .fill(`${config.HF.MGR_ACCOUNT}`);
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
    }
  });
  test('As a manager, I would like to search articles regarding Personal', async ({
    page,
  }) => {
    // click the HF accademy link
    await page.locator('footer div').nth(3).click();
    //search for the keyword "personal"
    await page
      .getByRole('searchbox', { name: 'Type in your question...' })
      .click();
    await page
      .getByRole('searchbox', { name: 'Type in your question...' })
      .fill('personal');
    //assert that the search results are available and visible
    await expect(
      page.locator('.walkme-jspPane > .walkme-search-results-list-inner'),
    ).toBeVisible();
  });
  test('As a manager, I should be able to open the article "How do I view or update my details"', async ({
    page,
  }) => {
    // click the HF accademy link
    await page.locator('footer div').nth(3).click();
    await page
      .getByRole('searchbox', { name: 'Type in your question...' })
      .click();
    await page
      .getByRole('searchbox', { name: 'Type in your question...' })
      .fill('personal');
    const page1Promise = page.waitForEvent('popup');
    await page
      .getByLabel(
        'search-zendesk result: How do I view or update my details? (opens in a new tab)',
      )
      .click();
    const page1 = await page1Promise;
    //assert that the article is visible
    await expect(page1.locator('.below-hero-wrapper-2')).toBeVisible();
    //assert that the article heading title is visible
    await expect(
      page1.getByRole('heading', { name: 'How do I view or update my' }),
    ).toBeVisible();
  });
});
