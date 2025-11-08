import Page from "./page";

class LoginPage extends Page {

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get loginBtn () {
        return $('#login-button');
    }

    get error () {
        return $("h3[data-test='error']");
    }

    get errorIcon () {
        return $("svg[data-icon='times-circle']");
    }

    get titlePage () {
        return browser.getTitle();
    }
    
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.loginBtn.click();
    }

    async clickLoginBtn () {
        await this.loginBtn.click();
    }

    async openPage() {
        await browser.url('https://www.saucedemo.com/');
    }
}

export default LoginPage;