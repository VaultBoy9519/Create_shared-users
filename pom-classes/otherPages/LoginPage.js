class LoginPage {

  get emailInput() {
    return cy.get(".form-login input[name=\"email\"]");
  }

  get passwordInput() {
    return cy.get(".form-login input[name=\"password\"]");
  }

  get enterButton() {
    return cy.get(".form-login button[value=\"enter\"]");
  }

  checkUrl() {
    cy.url().should("include", "/auth/email_login");
    return this;
  }

  typeEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  typePassword(password) {
    this.passwordInput.type(password);
    return this;
  }

  clickEnterButton() {
    this.enterButton.click();
    return this;
  }

}

export default new LoginPage();