class PupilClassPage {
  get header() {
    return cy.get(".form-class h1");
  }

  get classButton() {
    return cy.get(".form-class .form-class__btn-graduate");
  }

  get nextButton() {
    return cy.get(".footer__navigation-block .footer__btn-next");
  }

  checkHeader() {
    this.header.should("contain", "классе?");
    return this;
  }

  clickClassButton() {
    this.classButton.click();
    return this;
  }

  clickNextButton() {
    this.nextButton
      .should("not.be.disabled")
      .click();
    return this;
  }

}

export default new PupilClassPage();