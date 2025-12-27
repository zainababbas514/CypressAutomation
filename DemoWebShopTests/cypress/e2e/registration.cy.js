import HomePage from "../pages/homePage"
import RegisterPage from "../pages/registerPage"
import RegisterResultPage from "../pages/registerResultPage"

const homePage = new HomePage()
const registerPage = new RegisterPage()
const registerResultPage = new RegisterResultPage()

let user;

describe('Registration', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  before(() => {
    cy.fixture("registrationData").then((data) => {
      user = data;
    })
  })

  it('Verify that a new user can register successfully', () => {

    homePage.header().click_header_link("Register")
    cy.waitForRedirection(registerPage.elements.page_heading)

    registerPage.selectGender(user.gender)
    registerPage.enterFirstName(user.firstName)
    registerPage.enterLastName(user.lastName)
    registerPage.enterEmail(user.email)
    registerPage.enterPassword(user.password)
    registerPage.enterConfirmPassword(user.password)
    registerPage.clickRegisterButton()

    registerResultPage.verify_success_message_displayed()
  })
})
