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
}
module.exports = new CartPage();