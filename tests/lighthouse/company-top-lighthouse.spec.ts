import { test } from '@playwright/test';
import { chromium } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { APP } from '../../const/app';
import { TEST_NOINDEX_COMPANY } from '../../const/input-test';

test('Company top test light house', async ({page}) => {
    const browser = await chromium.launch({
        args: ['--remote-debugging-port=9222'],
    });
    await page.goto(APP.URL + '/company/' + TEST_NOINDEX_COMPANY.COMPANY_TOP.CASE_1.COMPANYID);

    await playAudit({
        page: page,
        thresholds: {
            performance: 0,
            accessibility: 10,
            'best-practices': 10,
            seo: 10,
            pwa: 10,
        },
        port: 9222,
    });

    await browser.close();
    await page.close();
});
