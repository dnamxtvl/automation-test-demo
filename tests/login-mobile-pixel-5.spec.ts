import { test, expect } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';
import { APP } from '../const/app';

test.use({ browserName: 'chromium', viewport: { width: 393, height: 851 } });

test('Macth email and password and logout success', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi123@gmail.com');
    await page.fill('input[name="user_password"]', '12345678');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL, { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './test-results/screenshots/login/screenshot_mobile_login_success.png', fullPage: true });

    await page.locator('em[aria-controls="company-view-header-menu"]').first().click();
    await page.locator('.custom-button-logout').click();
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    expect(page.url()).toBe(APP.URL + '/user/login/ahihi');

    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Macth email and password(with space) and logout success and repnsive screen click logout', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi123@gmail.com');
    await page.fill('input[name="user_password"]', '12345678   ');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL, { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './test-results/screenshots/login/screenshot_mobile_login_success_2.png', fullPage: true });

    await page.locator('em[aria-controls="company-view-header-menu"]').first().click();
    await page.locator('.custom-button-logout').click();
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    expect(page.url()).toBe(APP.URL + '/user/login/');

    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});
