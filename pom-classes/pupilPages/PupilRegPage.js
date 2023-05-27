class PupilRegPage {

  get nameInput() {
    return cy.get(".form-registration input[name='name']");
  }

  get numberInput() {
    return cy.get(".form-registration input[name='phone']");
  }

  get emailInput() {
    return cy.get(".form-registration input[name='email']");
  }

  get checkboxPrivacy() {
    return cy.get(".form-registration [data-name='privacy']");
  }

  get submitButton() {
    return cy.get(".footer__navigation-block button[type='submit']");
  }


  checkUrl() {
    cy.url().should("include", "/auth/pupil/new");
    return this;
  }

  typeUsername(username) {
    this.nameInput.type(username);
    return this;
  }

  typeNumber(number) {
    this.numberInput.type(number);
    return this;
  }

  typeEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  clickCheckboxPrivacy() {
    this.checkboxPrivacy.click();
    return this;
  }

  clickSubmitButton() {
    this.submitButton
      .should("not.be.disabled")
      .click();
    return this;

  }

}

export default new PupilRegPage();