import LoginPage from "../pageobjects/login.page";
import MainPage from "../pageobjects/main.page";
import testData from "../../fixtures/data.json";

describe('Login-Suite', ()=>{
    const loginPage = new LoginPage;
    const mainPage = new MainPage;

    beforeEach(async ()=>{
        await loginPage.openPage();
        await loginPage.titlePage;
    })

    it('Test-Case 1: Valid Login', async ()=>{
        //In this case I didn't use login method from LoginPage because I wanted to assert every expected result for every step

        await loginPage.inputUsername.setValue(testData.validLogin);
        await expect(loginPage.inputUsername).toHaveValue(testData.validLogin);

        await loginPage.inputPassword.setValue(testData.validPassword);
        await expect(loginPage.inputPassword).toHaveValue(testData.validPassword); 
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password'); 

        await loginPage.clickLoginBtn();
        await expect(await mainPage.url).toContain('inventory.html'); 
        await expect(mainPage.itemsList).toBeDisplayed(); 
    })

    it('Test-Case 2: Login with invalid password', async ()=>{
        const invalidDataMessage = "Epic sadface: Username and password do not match any user in this service";

        await loginPage.login(testData.validLogin, testData.invalidPassword); 
        await expect(loginPage.inputUsername).toHaveValue(testData.validLogin); 
        await expect(loginPage.inputPassword).toHaveValue(testData.invalidPassword); 
        await expect(loginPage.error).toBeDisplayed();     
        await expect(loginPage.error).toHaveText(invalidDataMessage);
        await expect(loginPage.errorIcon).toBeDisplayed();
    })

    it('Test-Case 3: Login with invalid login', async ()=>{
        await loginPage.login(testData.invalidLogin, testData.validPassword);
        await expect(loginPage.inputUsername).toHaveValue(testData.invalidLogin);
        await expect(loginPage.inputPassword).toHaveValue(testData.validPassword);
        await expect(loginPage.error).toBeDisplayed();     
        await expect(loginPage.errorIcon).toBeDisplayed();
    })

    it('Test-Case 4: Logout', async ()=>{
        await loginPage.login(testData.validLogin, testData.validPassword);

        await mainPage.clickBurgerBtn();
        await expect(mainPage.menuItems).toBeElementsArrayOfSize(4);

        await mainPage.clickLogoutBtn();
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    })

    afterEach(async()=>{
        await browser.reloadSession();
    })
})