class TutorRegPage {

  get nameInput() {
    return cy.get(".form-registration input[name='name']");
  }

  get numberInput() {
    return cy.get(".form-registration input[name='phone']");
  }

  get emailInput() {
    return cy.get(".form-registration input[name='email']");
  }

  get checkboxOffert() {
    return cy.get(".form-registration [data-name='offert']");
  }

  get checkboxPrivacy() {
    return cy.get(".form-registration [data-name='privacy']");
  }

  get checkboxAgreement() {
    return cy.get(".form-registration [data-name='agreement']");
  }

  get submitButton() {
    return cy.get(".footer__navigation-block button[type='submit']");
  }


  checkUrl() {
    cy.url().should("include", "/auth/tutor/new");
    return this;
  }

  typeUsername(username) {
    this.nameInput.type(username);
    return this;
  }

  typeNumber(number) {
    this.numberInput
      .clear()
      .type(number);
    return this;
  }

  typeEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  clickCheckboxOffert() {
    this.checkboxOffert.click();
    return this;
  }

  clickCheckboxPrivacy() {
    this.checkboxPrivacy.click();
    return this;
  }

  clickCheckboxAgreement() {
    this.checkboxAgreement.click();
    return this;
  }

  clickSubmitButton() {
    this.submitButton.should("not.be.disabled").click();
    return this;

  }

}

export default new TutorRegPage();