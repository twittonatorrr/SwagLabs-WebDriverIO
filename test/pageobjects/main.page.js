const { $, expect, browser } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page')

class MainPage{
   get itemsList () {
        return $('.inventory_list');
   } 

   get burgerBtn () {
    return $('#react-burger-menu-btn');
   }

   get menuItems () {
    return $$('.bm-item-list a');
   }

   get logoutBtn () {
    return $('#logout_sidebar_link');
   }

   get cart () {
    return $("span[data-test='shopping-cart-badge']");
   }

   get emptyCart () {
      return $('.shopping_cart_link')
   }

   get sortBtn () {
      return $('.product_sort_container');
   }

   get footer () {
      return $('.footer');
   }

   get twitterIcon () {
      return $("a[href*='https://twitter.com/saucelabs']");
   }

   get facebookIcon () {
      return $("a[href*='facebook.com']");
   }

   get linkedInIcon () {
      return $("a[href*='https://www.linkedin.com/company/sauce-labs/']");
   }

   async clickBurgerBtn(){
    this.burgerBtn.click();
    expect(MainPage.menuItems).toBeElementsArrayOfSize(4);
   }

   async clickLogoutBtn(){
    this.logoutBtn.click();
    await expect(LoginPage.inputUsername).toHaveValue(''); //expected result
    await expect(LoginPage.inputPassword).toHaveValue(''); //expected result
   }

   async goToCartPage () {
    this.cart.click();
    await expect($('.title')).toBeDisplayed();
   }

   async goToEmptyCartPage () {
    this.emptyCart.click();
    await expect($('.title')).toBeDisplayed();
   }

   async goToTwitter(){
      this.twitterIcon.click();
   }

   async goToFacebook(){
      this.facebookIcon.click();
   }

   async goToLinkedIn(){
      this.linkedInIcon.click();
   }
}

module.exports = new MainPage();