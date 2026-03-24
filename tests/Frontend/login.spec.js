// the main functionality, correct login

import { test, expect } from '@playwright/test';
import { login } from './login_function.js'; // import login function

test('Correct login', async ({ page }) => {
    //go to website
    await page.goto('/');

    //page is loaded correctly
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //enter login details
    await expect(page.locator('[data-test="username"]')).toBeEmpty();
    await expect(page.locator('[data-test="password"]')).toBeEmpty();
    await login(page, 'standard_user', 'secret_sauce');

    //user is successfuly log in
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');


});