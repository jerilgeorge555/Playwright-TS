const {test,expect} = require('@playwright/test');


test('Browser context Playwright Test', async ({browser})=>
{
    const context = await browser.newContext(); //not required if using default context, browser fixture also not required, instead use page fixture
    const page = await context.newPage(); //not required if using default context, browser fixture also not required, instead use page fixture like next test case
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

});

test('First Test case Test', async ({page})=>
    {
        const userName = page.locator('input#username');
        const password = page.locator('input#password');
        const signInButton = page.locator('#signInBtn');
        const titles = page.locator("div.card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
        await userName.fill("rahulshetty");
        // to enter info in edit box, 1.fill 2.type
        //type is depricated
        await password.fill("learning");
        await signInButton.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect'); 
        
        //clearing the username field and enter correct username
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signInButton.click();
        
        //methods to select the first selector nth(0) and first(). To select last,use last()
        //console.log(await page.titles.nth(0).textContent());
        //console.log(await page.titles.last().textContent());
        console.log(await titles.first().textContent());

        //get all titles. This method doesnt have auto wait. 
        const allTitles = await titles.allTextContents();
        console.log(allTitles);
        

    });
 