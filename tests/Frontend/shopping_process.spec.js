// the main functionality, correct login

import { test, expect } from '@playwright/test';
import { login } from './login_function.js'; // import login function

test('Whole order process ', async ({ page }) => {
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

    // Add item to cart and check the remove text near the item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');


    // Check shopping card increased
    await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();

    // Check shopping list and go to checkout
    await expect(page).toHaveURL(/cart.html/);
    await page.locator('[data-test="checkout"]').click();

    // Check checkout site and fill delivery information
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await page.locator('[data-test="firstName"]').fill('Anna');
    await page.locator('[data-test="lastName"]').fill('Hadidomova');
    await page.locator('[data-test="postalCode"]').fill('05981');
    await page.locator('[data-test="continue"]').click();

    // Final summarization 
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await page.locator('[data-test="finish"]').click();

    // Final order comfirmation. Order was successfully completed
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete.html/);

});