// the main functionality, correct login

import { test, expect } from '@playwright/test';
import { login } from './login_function.js'; // import login function

test('Simple logout process', async ({ page }) => {
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
    //await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    //click menu button and check if log out button is visible to click
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

    //click logout button
    await page.locator('[data-test="logout-sidebar-link"]').click();

    //check successful logout
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
        
    });

