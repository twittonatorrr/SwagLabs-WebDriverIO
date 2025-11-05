const { expect, browser } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const MainPage = require("../pageobjects/main.page");
const testData = require("../../fixtures/data.json");

describe('Login-Suite', ()=>{
    beforeEach(async ()=>{
        //precondition
        await browser.url(testData.baseUrl);
        const pageTitle = await browser.getTitle();
        await expect(pageTitle).toBe('Swag Labs');
    })

    it('Test-Case 1: Valid Login', async ()=>{
        //In this case I didn't use login method from LoginPage because I wanted to assert every expected result for every step

        await LoginPage.inputUsername.setValue(testData.validLogin); //step 1
        await expect(LoginPage.inputUsername).toHaveValue(testData.validLogin); //expected result

        await LoginPage.inputPassword.setValue(testData.validPassword); //step 2
        await expect(LoginPage.inputPassword).toHaveValue(testData.validPassword); //expected result
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password'); //expected result

        await LoginPage.loginBtn.click(); //step 3
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('inventory.html'); //expected result
        await expect(MainPage.itemsList).toBeDisplayed(); //expected result
    })

    it('Test-Case 2: Login with invalid password', async ()=>{
        await LoginPage.login(testData.validLogin, testData.invalidPassword); //step 1-3
        await expect(LoginPage.inputUsername).toHaveValue(testData.validLogin); //expected result
        await expect(LoginPage.inputPassword).toHaveValue(testData.invalidPassword); //expected result
        await expect(LoginPage.error).toBeDisplayed(); //expected result     
        await expect(LoginPage.error).toHaveText("Epic sadface: Username and password do not match any user in this service");
        await expect(LoginPage.errorIcon).toBeDisplayed();
    })

    it('Test-Case 3: Login with invalid login', async ()=>{
        await LoginPage.login(testData.invalidLogin, testData.validPassword);
        await expect(LoginPage.inputUsername).toHaveValue(testData.invalidLogin); //expected result
        await expect(LoginPage.inputPassword).toHaveValue(testData.validPassword); //expected result
        await expect(LoginPage.error).toBeDisplayed(); //expected result     
        await expect(LoginPage.errorIcon).toBeDisplayed();
    })

    it('Test-Case 4: Logout', async ()=>{
        await LoginPage.login(testData.validLogin, testData.validPassword); //precondition

        await MainPage.burgerBtn.click(); //step 1
        await expect(MainPage.menuItems).toBeElementsArrayOfSize(4); //expected result

        await MainPage.logoutBtn.click(); //step 2
        await expect(LoginPage.inputUsername).toHaveValue(''); //expected result
        await expect(LoginPage.inputPassword).toHaveValue(''); //expected result
    })

    afterEach(async()=>{
        await browser.reloadSession();
    })
})