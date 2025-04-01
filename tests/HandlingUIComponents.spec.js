const {test,expect} = require('@playwright/test');

test('Test UI Controls', async ({page}) =>
{
    const userName = page.locator('input#username');
    const password = page.locator('input#password');
    const signInButton = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const radioBtnUser = page.locator('.customradio span.checkmark').nth(1);
    const OkBtnPopUp = page.locator('#okayBtn');
    const agreeCheckBox = page.locator('#terms');
    const documentLink = page.locator("a[href*='rahulshetty']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await password.fill("learning");

    await dropdown.selectOption("consult"); //selecting option from dropdown

    await radioBtnUser.click(); //selecting radio button

    await OkBtnPopUp.click(); //selecting OK in popup

    await expect(radioBtnUser).toBeChecked(); // can use isChecked() which is boolean

    await agreeCheckBox.check(); //checking the checkBox

    await expect(agreeCheckBox).toBeChecked(); //validating if the checkbox is checked

    await agreeCheckBox.uncheck(); // unchecking the checkbox

    expect(await agreeCheckBox.isChecked()).toBeFalsy();

    //assertion to check the  attribute value
    await expect(documentLink).toHaveAttribute("class","blinkingText");


    await signInButton.click();


})

test('Test Window handles', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const documentLink = page.locator("a[href*='rahulshetty']");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [page2] = await Promise.all(
        [
            context.waitForEvent('page'), // listen for any new page opens
            documentLink.click()
        ]
    )
     
    const text = await page2.locator(".red").textContent();
    console.log(text);

    const textArray = text.split("@"); //to split a text based on a delimitter
    const domainName = textArray[1].split(" ")[0];
    console.log(domainName);

    await userName.fill(domainName);

})