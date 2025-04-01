const {test,expect} = require('@playwright/test');

test('Demo Test Case', async ({page}) => 
{
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator("[value='Login']");
    const products = page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    await expect(page).toHaveTitle("Let's Shop");
    await username.fill("jerilgeorge555@gmail.com");
    await password.fill("DummyPassword@123");
    await loginButton.click();

    await page.waitForLoadState('networkidle');//waits for all netwrok calls to run 
    //and be idle so it fetches everything if not working, use below
    //await products.first().waitFor();

    //const firstProductTitle = await products.first().textContent();
    //console.log(firstProductTitle);
    const productTitles = await products.allTextContents();
    console.log(productTitles);
    


})