import { browser } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
const loginPage = new LoginPage;
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

   get item1 () {
      return $('#add-to-cart-sauce-labs-backpack');
   }

   get item1Name () {
      return $("//div[contains(text(), 'Sauce Labs Backpack')]");
   }

   get option () {
      return $('.active_option');
   }

   get footer () {
      return $('footer');
   }

   get url () {
      return browser.getUrl();
   }

   async clickAddItemBtn (itemName) {
      itemName.click();
   } 

   async clickBurgerBtn(){
    this.burgerBtn.click();
    expect(this.menuItems).toBeElementsArrayOfSize(4);
   }

   async clickLogoutBtn(){
    this.logoutBtn.click();
    await expect(loginPage.inputUsername).toHaveValue(''); 
    await expect(loginPage.inputPassword).toHaveValue(''); 
   }

   async goToCartPage () {
    this.cart.click();
    await expect($('.title')).toBeDisplayed();
   }

   async goToEmptyCartPage () {
      this.emptyCart.click();
      await expect($('.title')).toBeDisplayed();
      await expect($('.cart_item_label')).not.toBeDisplayed();

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

export default MainPage;