import { test, expect } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';
import { APP } from '../const/app';

test.use({ viewport: { width: 1538, height: 864 } });

test('Email required and password not required', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', "");
    await page.fill('input[name="user_password"]', '123456789');
    await page.click('button[id="submit-button"]');

    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「メールアドレス」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_email.png', fullPage: true });
});

test('Password required and email not required', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi12334@gmail.com');
    await page.fill('input[name="user_password"]', '');
    await page.click('button[id="submit-button"]');

    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「パスワード」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_required_password.png', fullPage: true });
});

test('Password required and email required', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', '');
    await page.fill('input[name="user_password"]', '');
    await page.click('button[id="submit-button"]');

    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「メールアドレス」を入力してください。', '「パスワード」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_and_email_required.png', fullPage: true });
});

test('Email not required and password all space', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'abcccccsfaaaaaaaaagttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com');
    await page.fill('input[name="user_password"]', '                    ');
    await page.click('button[id="submit-button"]');
    
    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「パスワード」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_all_space.png', fullPage: true });
});

test('Password required and invalid email', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihidddddd');
    await page.fill('input[name="user_password"]', '');
    await page.click('button[id="submit-button"]');

    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「メールアドレス」は、正しく入力してください。', '「パスワード」を入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_password_required_invalid_email.png', fullPage: true });
});

test('Invalid email and password not required', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihitoidangtest');
    await page.fill('input[name="user_password"]', '123456789afff');
    await page.click('button[id="submit-button"]');

    const alertMessages = page.locator('.text-danger');
    expect(alertMessages).toContainText(['「メールアドレス」は、正しく入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_invalid.png', fullPage: true });
});

test('Wrong email or wrong password', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihitoidangtestclgt@gmail.com');
    await page.fill('input[name="user_password"]', '123456789afff$dhdh5');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL + "/user/login/", { waitUntil:"domcontentloaded" });

    const alertMessages = page.locator('.error-text');
    expect(alertMessages).toContainText(['「ログインID」「パスワード」を正しく入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_email_wrong_or_password_wrong.png', fullPage: true });
});

test('Macth email and password and user_status_flg # 10', async ({ page }) => {
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'StudentAhihi@gmail.com');
    await page.fill('input[name="user_password"]', '12345678');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL + "/user/login/", { waitUntil:"domcontentloaded" });

    const alertMessages = page.locator('.error-text');
    expect(alertMessages).toContainText(['「ログインID」「パスワード」を正しく入力してください。']);
    await page.screenshot({ path: './tests/screenshots/login/screenshot_match_email_pass_word_and_wrong_user_status.png', fullPage: true });
});

test('Macth email and password and logout success', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/user/login');
    await page.fill('input[name="user_mail_address"]', 'ahihi123@gmail.com');
    await page.fill('input[name="user_password"]', '12345678');
    await page.click('button[id="submit-button"]');
    await page.waitForURL(APP.URL, { waitUntil:"domcontentloaded" });
    await page.screenshot({ path: './tests/screenshots/login/screenshot_login_success.png', fullPage: true });

    await page.hover('a[id="user_header_menu"]');
    await page.hover('div[aria-labelledby="user_header_menu"]');
    await page.locator('.dropdown-item').last().click();
    await page.waitForURL(APP.URL + "/user/login/");
    expect(page.url()).toBe(APP.URL + '/user/login/');

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
    await page.screenshot({ path: './tests/screenshots/login/screenshot_login_success_2.png', fullPage: true });

    await page.hover('a[id="user_header_menu"]');
    await page.hover('div[aria-labelledby="user_header_menu"]');
    await page.locator('.dropdown-item').last().click();
    await page.waitForURL(APP.URL + "/user/login/");
    expect(page.url()).toBe(APP.URL + '/user/login/');

    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});
