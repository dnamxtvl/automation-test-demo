import { test, expect } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';
import { APP } from '../const/app';
import { TEST_NOINDEX_COMPANY } from '../const/input-test';

test('Company list user module user check with count kuchimuki <= 1 noindex CASE_1', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_1.COMPANYID + '/user_list');
    expect(await page.locator('meta[content="noindex"]').count()).toBe(0);
    
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and filter by contract_type noindex CASE_2', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_2.COMPANYID + '/user_list');
    const isNoIndexBeforeFilter = await page.locator('meta[content="noindex"]').count() == 0;
    await page.locator('a[title="正社員"]').first().click();
    const isNoIndexAfterFilterTypeWorkNoFulltime = await page.locator('meta[content="noindex"]').count() == 1;
    await page.locator('a[title="契約社員"]').first().click();
    const isNoIndexAfterFilterTypeWorkContract = await page.locator('meta[content="noindex"]').count() == 1;
    expect(isNoIndexBeforeFilter && isNoIndexAfterFilterTypeWorkNoFulltime && isNoIndexAfterFilterTypeWorkContract).toBe(true);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and filter by gender_type noindex CASE_3', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_3.COMPANYID + '/user_list');
    const isNoIndexBeforeFilter = await page.locator('meta[content="noindex"]').count() == 0;
    await page.locator('a[title="男性"]').first().click();
    const isNoIndexAfterFilterTypeWorkNoFulltime = await page.locator('meta[content="noindex"]').count() == 1;
    await page.locator('a[title="回答なし"]').first().click();
    const isNoIndexAfterFilterTypeWorkContract = await page.locator('meta[content="noindex"]').count() == 1;
    expect(isNoIndexBeforeFilter && isNoIndexAfterFilterTypeWorkNoFulltime && isNoIndexAfterFilterTypeWorkContract).toBe(true);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and filter by join_from_type noindex CASE_4', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_4.COMPANYID + '/user_list');
    const isNoIndexBeforeFilter = await page.locator('meta[content="noindex"]').count() == 0;
    await page.locator('a[title="新卒入社"]').first().click();
    const isNoIndexAfterFilterTypeWorkNoFulltime = await page.locator('meta[content="noindex"]').count() == 1;
    await page.locator('a[title="中途入社"]').first().click();
    const isNoIndexAfterFilterTypeWorkContract = await page.locator('meta[content="noindex"]').count() == 1;
    expect(isNoIndexBeforeFilter && isNoIndexAfterFilterTypeWorkNoFulltime && isNoIndexAfterFilterTypeWorkContract).toBe(true);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and filter by relation_type noindex CASE_5', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_5.COMPANYID + '/user_list');
    const isNoIndexBeforeFilter = await page.locator('meta[content="noindex"]').count() == 0;
    await page.locator('a[title="現職"]').first().click();
    const isNoIndexAfterFilterTypeWorkNoFulltime = await page.locator('meta[content="noindex"]').count() == 1;
    await page.locator('a[title="退職"]').first().click();
    const isNoIndexAfterFilterTypeWorkContract = await page.locator('meta[content="noindex"]').count() == 1;
    expect(isNoIndexBeforeFilter && isNoIndexAfterFilterTypeWorkNoFulltime && isNoIndexAfterFilterTypeWorkContract).toBe(true);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and filter by job_type noindex CASE_6', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_6.COMPANYID + '/user_list');
    await page.locator('select.job_type').first().click();
    const selectOption = page.locator('select.job_type').first();
    await selectOption.selectOption({ index: 1 });
    await selectOption.dispatchEvent('click');
    expect(await page.locator('meta[content="noindex"]').count()).toBe(1);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});

test('Company list user module user check with count kuchimuki > 1 and sort order by noindex CASE_7', async ({ page }) => {
    const chromiumBrowser = await chromium.launch();
    const firefoxBrowser = await firefox.launch();
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_USER_LIST.CASE_7.COMPANYID + '/user_list');
    await page.locator('a.sort_type[data-value="0"]').nth(1).click();
    const isNoIndexAfterSortByDefault = await page.locator('meta[content="noindex"]').count() == 1;
    await page.locator('a.sort_type[data-value="1"]').nth(1).click();
    const isNoIndexAfterSortByLatest = await page.locator('meta[content="noindex"]').count() == 1;
    expect(isNoIndexAfterSortByDefault && isNoIndexAfterSortByLatest).toBe(true);
    await chromiumBrowser.close();
    await firefoxBrowser.close();
    await page.close();
});




