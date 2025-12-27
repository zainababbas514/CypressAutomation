module.exports = class CheckoutPage {
    elements = {
        firstName_input: () => cy.get("#BillingNewAddress_FirstName"),
        lastName_input: () => cy.get("#BillingNewAddress_LastName"),
        email_input: () => cy.get("#BillingNewAddress_Email"),
        company_input: () => cy.get("#BillingNewAddress_Company"),

        country_dropdown: () => cy.get("#BillingNewAddress_CountryId"),
        state_dropdown: () => cy.get("#BillingNewAddress_StateProvinceId"),
        state_loading: () => cy.get("#states-loading-progress"),

        city_input: () => cy.get("#BillingNewAddress_City"),
        address1_input: () => cy.get("#BillingNewAddress_Address1"),
        address2_input: () => cy.get("#BillingNewAddress_Address2"),
        zip_input: () => cy.get("#BillingNewAddress_ZipPostalCode"),
        phone_input: () => cy.get("#BillingNewAddress_PhoneNumber"),
        fax_input: () => cy.get("#BillingNewAddress_FaxNumber"),
        billingAddressContinueBtn: () => cy.get("#billing-buttons-container input"),
        shippingAddressContinueBtn: () => cy.get(".new-address-next-step-button:visible"),
        shippingMethodContinueBtn: () => cy.get(".shipping-method-next-step-button:visible"),
        paymentMethodContinueBtn: () => cy.get(".payment-method-next-step-button"),
        paymentInfoContinueBtn: () => cy.get(".payment-info-next-step-button"),
        confirmOrderBtn: () => cy.get(".confirm-order-next-step-button"),

        shippingMethodLabels: () => cy.get('.method-list label'),
        shippingMethodRadios: () => cy.get('input[name="shippingoption"]'),

        paymentMethodLabels: () => cy.get('.payment-method .method-list label'),
        paymentMethodRadios: () => cy.get('input[name="paymentmethod"]')
    }

    enterFirstName(firstName) {
        this.elements.firstName_input().then(el => {
            if (firstName !== "") {
                cy.wrap(el).clear().type(firstName)
            }
        })
    }

    enterLastName(lastName) {
        this.elements.lastName_input().then(el => {
            if (lastName !== "") {
                cy.wrap(el).clear().type(lastName)
            }
        })
    }

    enterEmail(email) {
        this.elements.email_input().then(el => {
            if (email !== "") {
                cy.wrap(el).clear().type(email)
            }
        })
    }

    enterCompany(company) {
        this.elements.company_input().then(el => {
            if (company !== "") {
                cy.wrap(el).clear().type(company)
            }
        })
    }

    selectCountry(country) {
        this.elements.country_dropdown().select(country)
    }

    selectState(state) {
        this.elements.state_dropdown().select(state)
    }

    enterCity(city) {
        this.elements.city_input().clear().type(city)
    }

    enterAddress1(address1) {
        this.elements.address1_input().clear().type(address1)
    }

    enterAddress2(address2) {
        this.elements.address2_input().then(el => {
            if (address2 !== "") {
                cy.wrap(el).clear().type(address2)
            }
        })
    }

    enterZip(zip) {
        this.elements.zip_input().clear().type(zip);
    }

    enterPhone(phone) {
        this.elements.phone_input().clear().type(phone)
    }

    enterFax(fax) {
        this.elements.fax_input().then(el => {
            if (fax !== "") {
                cy.wrap(el).clear().type(fax)
            }
        })
    }

    clickBillingAddressContinueBtn() {
        this.elements.billingAddressContinueBtn().next().should("not.be.visible")
        this.elements.billingAddressContinueBtn().should("be.visible").click()
    }

    clickShippingAddressContinueBtn() {
        this.elements.shippingAddressContinueBtn().next().should("not.be.visible")
        this.elements.shippingAddressContinueBtn().should("be.visible").click()
    }

    clickShippingMethodContinueBtn() {
        this.elements.shippingMethodContinueBtn().next().should("not.be.visible")
        this.elements.shippingMethodContinueBtn().should("be.visible").click()
    }

    clickPaymentMethodContinueBtn() {
        this.elements.paymentMethodContinueBtn().next().should("not.be.visible")
        this.elements.paymentMethodContinueBtn().should("be.visible").click()
    }

    clickPaymentInfoContinueBtn() {
        this.elements.paymentInfoContinueBtn().next().should("not.be.visible")
        this.elements.paymentInfoContinueBtn().should("be.visible").click()
    }

    clickConfirmOrderBtn() {
        this.elements.confirmOrderBtn().next().should("not.be.visible")
        this.elements.confirmOrderBtn().should("be.visible").click()
    }

    fillBillingAddress(address) {
        this.enterFirstName(address.firstName)
        this.enterLastName(address.lastName)
        this.enterEmail(address.email)
        this.enterCompany(address.company)
        this.selectCountry(address.country)
        this.selectState(address.state)
        this.enterCity(address.city)
        this.enterAddress1(address.address1)
        this.enterAddress2(address.address2)
        this.enterZip(address.zip)
        this.enterPhone(address.phone)
        this.enterFax(address.fax)
        this.clickContinueBtn()
    }

    selectShippingMethod(methodName) {
        this.elements.shippingMethodLabels()
            .contains(methodName)
            .should('be.visible')
            .click();
    }

    selectPaymentMethod(methodName) {
        this.elements.paymentMethodLabels()
            .contains(methodName)
            .should('be.visible')
            .click();
    }



}
