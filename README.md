# SwagLabs-WebDriverIO
This project contains automated end-to-end tests for the SauceDemo  web application. The goal of this test suite is to verify the core functionality of the app — login, product management, checkout process, and UI components — using WebdriverIO and JavaScript.

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/saucedemo-webdriverio-tests.git

2. **Go to the main folder**
   cd saucedemo-webdriverio-tests

3. **Install all dependencies**
   npm install

3. **Run tests**
   npx wdio run ./wdio.conf.js

   npx wdio run ./wdio.conf.js --spec ./test/specs/items.e2e.js


---

```md
## 🧩 Test Coverage

The current suite covers the following functionality:

### 🔐 **Login**
- Valid and invalid credentials  
- Error message validation  
- Logout flow  

### 🛒 **Items & Cart**
- Adding and removing items from the cart  
- Cart item persistence after logout  
- Sorting items by name and price  

### 💳 **Checkout**
- Valid checkout process  
- Checkout without added products  
- Form field validations  

### 📎 **Footer Links**
- Verification of external social media links:
  - Twitter (X)
  - Facebook
  - LinkedIn  

### 🎨 **UI**
- Display and visibility checks for main page elements  

