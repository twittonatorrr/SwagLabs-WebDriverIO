const { expect, browser } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const MainPage = require("../pageobjects/main.page");
const CartPage = require("../pageobjects/cart.page")
const testData = require("../../fixtures/data.json");

describe('Items-Suite',()=>{
        
    beforeEach(async ()=>{
        //precondition
        await browser.reloadSession();
        await browser.url(testData.baseUrl);
        const pageTitle = await browser.getTitle();
        await expect(pageTitle).toBe('Swag Labs');
        await LoginPage.login(testData.validLogin, testData.validPassword);
    })

    it('Test-Case 5:Saving the cart after logout', async()=>{
        const addItem1 = await $('#add-to-cart-sauce-labs-backpack');

        await addItem1.click(); //step 1
        await expect(MainPage.cart).toHaveText("1"); //expected result

        await MainPage.clickBurgerBtn(); //step 2
        await MainPage.clickLogoutBtn(); //step 3
        await LoginPage.login(testData.validLogin, testData.validPassword) //step 4
        await MainPage.goToCartPage(); //step 5
        await expect(MainPage.cart).toHaveText("1"); //expected result
    })

    it('Test-Case 6:Sorting', async()=>{
        const option = await $('.active_option');
        await expect(option).toHaveText("Name (A to Z)");

        await MainPage.sortBtn.selectByAttribute("value", "lohi"); //step 1.1
        await expect(option).toHaveText("Price (low to high)"); //expected result

        await MainPage.sortBtn.selectByAttribute("value", "hilo"); //step 1.2
        await expect(option).toHaveText("Price (high to low)");

        await MainPage.sortBtn.selectByAttribute("value", "az"); //step 1.3
        await expect(option).toHaveText("Name (A to Z)"); //expected result

        await MainPage.sortBtn.selectByAttribute("value", "za"); //step 1.4
        await expect(option).toHaveText("Name (Z to A)"); //expected result
    })

    it('Test-Case 7:Footer Links', async () => {
        await browser.url('https://www.saucedemo.com/inventory.html');

        const mainWindow = await browser.getWindowHandle();
        const footer = await $('footer');
        await footer.scrollIntoView();

    
        await MainPage.goToTwitter(); //step 1
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        let handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        const twitterUrl = await browser.getUrl();
        expect(twitterUrl).toContain('https://x.com/saucelabs');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);


        await MainPage.goToFacebook(); //step 2
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        const fbUrl = await browser.getUrl();
        expect(fbUrl).toContain('https://www.facebook.com/saucelabs');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);


        await MainPage.goToLinkedIn(); //step 3
        await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1);
        handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);

        const linkedUrl = await browser.getUrl();
        expect(linkedUrl).toContain('https://www.linkedin.com/company/sauce-labs/');

        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);
    });

    it('Test-Case 8:Valid Checkout', async()=>{
        const addItem = await $('#add-to-cart-sauce-labs-backpack');
        const ItemName = await $("//div[contains(text(), 'Sauce Labs Backpack')]");
        const ItemPrice = '$29.99';

        await addItem.click(); //step 1
        await expect(MainPage.cart).toHaveText("1"); //expected result

        await MainPage.goToCartPage(); //step 2

        await CartPage.checkoutBtn.click(); //step 3
        await expect(CartPage.checkoutForm).toBeDisplayed(); //expected result

        await CartPage.inputFirstName.setValue('First'); //step 4
        await expect(CartPage.inputFirstName).toHaveValue('First'); //expected result

        await CartPage.inputLastName.setValue('Last'); //step 5
        await expect(CartPage.inputLastName).toHaveValue('Last'); //expected result

        await CartPage.inputPostalCode.setValue('11111'); //step 6
        await expect(CartPage.inputPostalCode).toHaveValue('11111'); //expected result
        
        await CartPage.continueBtn.click(); //step 7
        await expect($("span[data-test*='title']")).toBeDisplayed(); //expected result
        await expect(ItemName).toBeDisplayed(); //expected result
        const summaryPrice = await $('.summary_subtotal_label').getText();
        await expect(summaryPrice).toContain(ItemPrice); //expected result

        await CartPage.finishBtn.click(); //step 8
        await expect($('.complete-header')).toBeDisplayed(); //expected result
        await expect($('.complete-text')).toBeDisplayed(); //expected result

        await CartPage.backHomeBtn.click(); //step 9
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(MainPage.cart).not.toBeDisplayed();

    })

    it('Test-Case 9:Checkout without products', async()=>{
        // upd: Site allows you to make an order even without items
        await MainPage.goToEmptyCartPage(); //step 1
        await CartPage.checkoutBtn.click(); //step 2
        await expect(CartPage.checkoutForm).toBeDisplayed();

        await CartPage.inputFirstName.setValue('First'); //step 3
        await expect(CartPage.inputFirstName).toHaveValue('First'); //expected result

        await CartPage.inputLastName.setValue('Last'); //step 4
        await expect(CartPage.inputLastName).toHaveValue('Last'); //expected result

        await CartPage.inputPostalCode.setValue('11111'); //step 5
        await expect(CartPage.inputPostalCode).toHaveValue('11111'); //expected result
        
        await CartPage.continueBtn.click(); //step 6
        const summaryPrice = await $('.summary_subtotal_label').getText();
        await expect(summaryPrice).toContain("Item total: $0"); //expected result

        await CartPage.finishBtn.click(); //step 7
        await expect($('.complete-header')).toBeDisplayed(); //expected result
        await expect($('.complete-text')).toBeDisplayed(); //expected result
    })

    afterEach(async()=>{
        await browser.reloadSession();
    })
})