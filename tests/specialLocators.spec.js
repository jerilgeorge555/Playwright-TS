const {test, expect} = require('@playwright/test');

test('playwright special locators', async ({page})=>{

  //const checkBox = page.locator('#exampleCheck1');
  const checkBox = page.getByLabel("Check me out if you Love IceCreams!");
  //const studentRadioBtn = page.locator('#inlineRadio1');
  const studentRadioBtn = page.getByLabel("Student");
  const gender = page.getByLabel("Gender");
  const password = page.getByPlaceholder("Password");
  const submitBtn = page.getByRole("button",{name:'Submit'});
  const successmessage = page.getByText("Success! The Form has been submitted successfully!.");
  const shopLink = page.getByRole("link",{name:'Shop'});


  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  
  await checkBox.check();
  await studentRadioBtn.click();
  await gender.selectOption("Male");
  await password.fill("DummyPassword@123");
  await submitBtn.click();
  await expect(successmessage).toBeVisible();
  await shopLink.click();
  //filter and chaining
  await page.locator('.card.h-100').filter({hasText: 'iphone X'}).getByRole('button').click();

})

test('e2eWithSpecialLocators', async ({page})=>{

  const mailId = "jerilgeorge555@gmail.com";
  const pass = "DummyPassword@123";
  const couponCode="rahulshettyacademy";
  const productToBuy = "IPHONE 13 PRO";

  const username = page.getByPlaceholder("email@example.com");//page.locator('#userEmail');
  const password = page.getByPlaceholder("enter your passsword");//page.locator('#userPassword');
  const signInBtn = page.getByRole("button",{name:"Login"});//page.locator("#login");
  const products = page.locator(".card-body");
  const cart = page.getByRole("button",{name:'Cart'}).nth(0);//page.locator("button[routerlink = '/dashboard/cart']")
  const productInCart = page.locator('.cartSection');
  const checkout = page.getByRole("button",{name:'Checkout'});//page.locator(".totalRow button[type='button']");
  const placeOrderBtn = page.locator('.btnn.action__submit.ng-star-inserted');
  const shippingEmail = page.locator("label[type='text']");
  const creditcard = page.locator('.field .input.txt').nth(0);
  const expiryDate = page.locator('.input.ddl');
  const cvv = page.locator('.field .input.txt').nth(1);
  const nameOnCard = page.locator('.field .input.txt').nth(2);
  const coupon = page.locator('.field .input.txt').nth(3);
  const applyCouponBtn = page.getByRole("button",{name:'Apply Coupon'});//page.locator('.btn.btn-primary.mt-1');
  const couponAppliedMessage = page.locator('.mt-1.ng-star-inserted');
  const country = page.getByPlaceholder("Select Country");//page.locator("[placeholder='Select Country']");
  const countryDropdown = page.locator("[class*='ta-results']");
  const orderCompleteMsg = page.locator('.hero-primary');
  const orderHistory = page.locator("label[routerlink*='/dashboard/myorders']");
  const orderId = page.locator("label[class*='ng-star-inserted']");
  const orderHistoryTable = page.locator("table[class*='table table-bordered table-hover ng-star-inserted']");


  //load the application
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(page).toHaveTitle("Let's Shop");

  //enter username and password and clicks login
  await username.fill(mailId);
  await password.fill(pass);
  await signInBtn.click();
  //waiting for page to get loaded completely
  await page.waitForLoadState('networkidle');
  await products.first().waitFor();

  const allItems= await products.locator('b').allTextContents();
  console.log(allItems);
  for(let i=0; i<await products.count() ; i++){
      
      const chooseProduct = products.nth(i).locator('b');
      const addToCarkBtn = products.nth(i).getByRole("button",{name:' Add To Cart'})
      if((await chooseProduct.textContent()).includes(productToBuy)){

          await addToCarkBtn.click();
          break;
      }
  }
  //clicking cart button
  await cart.click();
  await productInCart.last().waitFor(); //waiting for the page to completely load
  //checking whether the cart contains the desired product
  expect(productInCart.locator('h3')).toContainText(productToBuy);

  //clicking checkout button
  await checkout.click();
  await expect(placeOrderBtn).toBeVisible();

  await expect(shippingEmail).toHaveText(mailId);

  await creditcard.clear();
  await creditcard.fill("1111222233334444");
  await expiryDate.first().selectOption("10");//selecting month
  await expiryDate.last().selectOption("25");//selecting year

  await cvv.fill("123");
  await nameOnCard.fill("Jeril George");
  await coupon.fill(couponCode);
  await applyCouponBtn.click();
  await expect(couponAppliedMessage).toHaveText("* Coupon Applied");

  //enter characters one by one
  await country.pressSequentially('IND');
  await countryDropdown.waitFor();

  for(let i=0; i<await countryDropdown.locator('button').count(); i++){
    const chooseCountry = countryDropdown.locator('button').nth(i);
    if(await chooseCountry.textContent()===' India'){
      await chooseCountry.click();
      break;
    }
  }

  await placeOrderBtn.click();
  await expect(orderCompleteMsg).toHaveText('Thankyou for the order.');

  //extracting the orderId
  let orderNumberDummy = (await orderId.textContent()).split(" ");
  let orderNumber = orderNumberDummy[2].trim();
  console.log(orderNumber);

  await orderHistory.click();
  await orderHistoryTable.waitFor();

  for(let i=0; i<orderHistoryTable.locator('tbody tr').count(); i++){

    const tableRowValue = await orderHistoryTable.locator('tbody tr th').nth(i).textContent();
    if(tableRowValue===orderNumber){
       await orderHistoryTable.locator('tbody tr td .btn.btn-primary').nth(i).click();
       expect(await page.locator('.col-text.-main').textContent()).toStrictEqual(orderNumber);
      break;
    }
  }
})