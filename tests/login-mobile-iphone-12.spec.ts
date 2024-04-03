import { test, expect } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';
import { APP } from '../const/app';

test.use({ browserName: 'chromium', viewport: { width: 390, height: 884 } });

test('Email required and password not required iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', '');
    await page.fill('input[name="user_password"]', '123456789');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_email.png', fullPage: true });
    await expect(page.locator('.text-danger')).toHaveText(['「メールアドレス」を入力してください。']);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Password required and email not required iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi12334@gmail.com');
    await page.fill('input[name="user_password"]', '');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_password.png', fullPage: true });
    await expect(page.locator('.text-danger')).toHaveText(['「パスワード」を入力してください。']);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Password required and email required iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', '');
    await page.fill('input[name="user_password"]', '');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_and_email_required.png', fullPage: true });
    const alertMessages = page.locator('.text-danger');
    await expect(alertMessages).toContainText(['「メールアドレス」を入力してください。', '「パスワード」を入力してください。']);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Email not required and password all space iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'abcccccsfaaaaaaaaagttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com');
    await page.fill('input[name="user_password"]', '                    ');
    await page.click('button[id="submit-button"]');
    
    const alertMessages = page.locator('.text-danger');
    await expect(alertMessages).toContainText(['「パスワード」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_all_space.png', fullPage: true });
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Macth email and password and logout success iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi123@gmail.com');
    await page.fill('input[name="user_password"]', '12345678');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL, { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_mobile_login_success.png', fullPage: true });

    await page.locator('em[aria-controls="company-view-header-menu"]').first().click();
    await page.locator('.custom-button-logout').click();
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    expect(page.url()).toBe(APP.URL + '/user/login/');

    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Macth email and password(with space) and logout success and repnsive screen click logout iphone 12', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi123@gmail.com');
    await page.fill('input[name="user_password"]', '12345678   ');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL, { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_mobile_login_success_2.png', fullPage: true });

    await page.locator('em[aria-controls="company-view-header-menu"]').first().click();
    await page.locator('.custom-button-logout').click();
    await page.waitForURL(APP.URL + '/user/login/', { waitUntil:"domcontentloaded" });
    expect(page.url()).toBe(APP.URL + '/user/login/');

    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});
