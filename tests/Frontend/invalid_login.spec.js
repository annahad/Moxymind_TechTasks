// the main functionality, correct login

import { test, expect } from '@playwright/test';
import { login } from './login_function.js'; // import login function

test('Invalid user data ', async ({ page }) => {
    //go to website
    await page.goto('/');

    //page is loaded correctly
    await expect(page.getByText('Swag Labs')).toBeVisible();

    //enter login details
    await expect(page.locator('[data-test="username"]')).toBeEmpty();
    await expect(page.locator('[data-test="password"]')).toBeEmpty();
    await login(page, 'invalid_user', 'invalid_password');

    //page is still saucedemo 
    await expect(page).toHaveURL('/');

    //error message displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');


});