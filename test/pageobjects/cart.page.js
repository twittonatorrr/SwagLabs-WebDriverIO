class CartPage{
    get checkoutBtn () {
        return $('#checkout');
    }

    get checkoutForm () {
        return $('.checkout_info');
    }

    get inputFirstName () {
        return $('#first-name');
    }

    get inputLastName () {
        return $('#last-name');
    }

    get inputPostalCode () {
        return $('#postal-code');
    }

    get continueBtn () {
        return $('#continue');
    }

    get finishBtn () {
        return $('#finish');
    }

    get backHomeBtn () {
        return $('#back-to-products');
    }

    get checkoutHeader () {
        return $("span[data-test*='title']");
    }

    get sumPrice () {
        return $('.summary_subtotal_label');
    }

    get successTitle () {
        return $('.complete-header');
    }

    get successText () {
        return $('.complete-text');
    }

    async clickCheckoutBtn () {
        await this.checkoutBtn.click();
    }

    async clickContinueBtn () {
        await this.continueBtn.click();
    }

    async clickFinishBtn () {
        await this.finishBtn.click();
    }

    async clickBackHomeBtn () {
        await this.backHomeBtn.click();
    }
}
export default CartPage;