import { faker } from '@faker-js/faker';
import LoginPage from "../pageobjects/login.page";
import MainPage from "../pageobjects/main.page";
import CartPage from "../pageobjects/cart.page";
import testData from "../../fixtures/data.json";
import { browser, expect } from '@wdio/globals';

describe('Items-Suite',()=>{
    const loginPage = new LoginPage;
    const mainPage = new MainPage;
    const cartPage = new CartPage;

    beforeEach(async ()=>{

        await browser.reloadSession();
        await loginPage.openPage();
        await loginPage.titlePage;
        await loginPage.login(testData.validLogin, testData.validPassword);
    })

    it('Test-Case 5:Saving the cart after logout', async()=>{
        await mainPage.clickAddItemBtn(mainPage.item1); 
        await expect(mainPage.cart).toHaveText("1"); 

        await mainPage.clickBurgerBtn(); 
        await mainPage.clickLogoutBtn(); 
        await loginPage.login(testData.validLogin, testData.validPassword) 
        await mainPage.goToCartPage(); 
        await expect(mainPage.cart).toHaveText("1"); 
    })

    it('Test-Case 6:Sorting', async()=>{
        await expect(mainPage.option).toHaveText("Name (A to Z)");

        await mainPage.sortBtn.selectByAttribute("value", "lohi"); 
        await expect(mainPage.option).toHaveText("Price (low to high)"); 

        await mainPage.sortBtn.selectByAttribute("value", "hilo"); 
        await expect(mainPage.option).toHaveText("Price (high to low)");

        await mainPage.sortBtn.selectByAttribute("value", "az"); 
        await expect(mainPage.option).toHaveText("Name (A to Z)"); 

        await mainPage.sortBtn.selectByAttribute("value", "za"); 
        await expect(mainPage.option).toHaveText("Name (Z to A)"); 
    })

    it('Test-Case 7:Footer Links', async () => {
        await mainPage.url;
        
        const mainWindow = await browser.getWindowHandle();
        await mainPage.footer.scrollIntoView();

        const links = [
            {click: ()=> mainPage.goToTwitter(), expectedUrl: "https://x.com/saucelabs"},
            {click: ()=> mainPage.goToFacebook(), expectedUrl: "https://www.facebook.com/saucelabs"},
            {click: ()=> mainPage.goToLinkedIn(), expectedUrl: "https://www.linkedin.com/company/sauce-labs/"}
        ];

        for(const link of links){
            await link.click();

            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length > 1,
                {timeout: 10000, msg: "New window did not open"}
            );

            const handles = await browser.getWindowHandles();
            await browser.switchToWindow(handles[1]);

            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain(link.expectedUrl);

            await browser.closeWindow();
            await browser.switchToWindow(mainWindow);
        }
    });

    it('Test-Case 8:Valid Checkout', async()=>{
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const postalCode = faker.location.zipCode();
        const ItemPrice = '$29.99';

        await mainPage.clickAddItemBtn(mainPage.item1); 
        await expect(mainPage.cart).toHaveText("1"); 

        await mainPage.goToCartPage(); 

        await cartPage.clickCheckoutBtn(); 
        await expect(cartPage.checkoutForm).toBeDisplayed(); 

        await cartPage.inputFirstName.setValue(firstName); 
        await expect(cartPage.inputFirstName).toHaveValue(firstName); 

        await cartPage.inputLastName.setValue(lastName); 
        await expect(cartPage.inputLastName).toHaveValue(lastName);

        await cartPage.inputPostalCode.setValue(postalCode); 
        await expect(cartPage.inputPostalCode).toHaveValue(postalCode); 
        
        await cartPage.clickContinueBtn(); 
        await expect(cartPage.checkoutHeader).toBeDisplayed(); 
        await expect(mainPage.item1Name).toBeDisplayed(); 
        const summaryPrice = await cartPage.sumPrice.getText();
        await expect(summaryPrice).toContain(ItemPrice); 

        await cartPage.clickFinishBtn(); 
        await expect(cartPage.successTitle).toBeDisplayed(); 
        await expect(cartPage.successText).toBeDisplayed(); 

        await cartPage.clickBackHomeBtn(); 
        await loginPage.url;
        await expect(mainPage.cart).not.toBeDisplayed();

    })

    it('Test-Case 9:Checkout without products', async()=>{
        await mainPage.goToEmptyCartPage(); 
        await cartPage.checkoutBtn.click(); 
        await expect(cartPage.checkoutForm).not.toBeDisplayed();
    })

    afterEach(async()=>{
        await browser.reloadSession();
    })
})