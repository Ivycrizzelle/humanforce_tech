// // global-setup.ts
import { chromium } from '@playwright/test';
import { config } from '../../lib/helpers/config';

async function globalSetup() {
  const Browser = await chromium.launch();
  const Page = await Browser.newPage();
  await Page.context().clearCookies();
  await Page.context().clearPermissions();
  await Page.goto(`${config.HF.HF_URL}`);
  await Page.waitForTimeout(5000);
  await Page.context().storageState({
    path: 'storage-state/notLoggedInState.json',
  });
}
export default globalSetup;
