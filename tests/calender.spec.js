const {test,expect} = require('@playwright/test');

test.only("Calender Validation", async ({page})=>{

    const month = "6";
    const date = "15";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.getByText(date).last().click();
    

})