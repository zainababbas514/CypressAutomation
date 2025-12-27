import HomePage from "../pages/homePage"
const homePage = new HomePage();

import CartPage from "../pages/cartPage";
const cartPage = new CartPage()

import CheckoutPage from "../pages/checkoutPage";
const checkoutPage = new CheckoutPage();

import CheckoutSuccessPage from "../pages/checkoutSuccessPage";
const checkoutSuccessPage = new CheckoutSuccessPage();

let checkoutData;
var expectedCartCount = 0
let productDetail = []

describe("Test Cart Functionality", () => {

    before(() => {
        cy.fixture("checkoutData").then((data) => {
            checkoutData = data;
        })
    })

    beforeEach(() => {
        cy.visit("/");
        homePage.header().click_header_link("Log in")
        cy.login(checkoutData.loginCredentials.email, checkoutData.loginCredentials.password);
        homePage.header().verifyUserLoggedIn(checkoutData.loginCredentials.email)
    })

    it("Verify that user can update quantity of a product in the cart", () => {
        const testData = checkoutData["TC-001"]
        cy.addProductsToCart(testData.productDetails).then((info) => {
            productDetail = info.products;
            expectedCartCount = info.cartCount;
        });
        homePage.header().clickShoppingCartOption();
        cy.wrap(testData.productDetails).each(($el) => {
            cartPage.changeCartQuantity($el.name, $el.qty)
        });

        cartPage.clickUpdateCartBtn()
        cartPage.verifyTotalUnitPrice().then((priceList) => {
            let expectedSubtotal = cartPage.calculateSubtotal(priceList);
            cartPage.verifySubtotal(expectedSubtotal)
        });
        cartPage.verifyCalculatedTotalMatchesDisplayedTotal();

        cartPage.selectCountry(testData.country);
        cartPage.selectState(testData.state);
        cartPage.checkTermsConditions();
        cartPage.clickCheckoutBtn();

        checkoutPage.clickBillingAddressContinueBtn()
        checkoutPage.clickShippingAddressContinueBtn()
        checkoutPage.selectShippingMethod(testData.deliveryMethod)
        checkoutPage.clickShippingMethodContinueBtn()
        checkoutPage.selectPaymentMethod(testData.paymentMethod)
        checkoutPage.clickPaymentMethodContinueBtn()
        checkoutPage.clickPaymentInfoContinueBtn()
        checkoutPage.clickConfirmOrderBtn()

        checkoutSuccessPage.verifySuccessMessageDisplayed()
    });
})