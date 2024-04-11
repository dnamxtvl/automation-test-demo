import { test, expect } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';
import { APP } from '../const/app';
import { TEST_NOINDEX_COMPANY } from '../const/input-test';

test('Company kyujin module user check noindex CASE_1', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_KYUJIN.CASE_1.COMPANYID + '/kyujin');
    expect(await page.locator('meta[content="noindex"]').count()).toBe(0);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});
