class AuthSmsPage {

  get topSmsText() {
    return cy.get(".form-sms p._top-text");
  }

  get smsCodeInput() {
    return cy.get(".form-sms input[name=code]");
  }

  get confirmButton() {
    return cy.get(".form-sms button[type=submit]");
  }

  checkTopSmsText(number) {
    this.topSmsText
      .should("be.visible")
      .should("contain", number);
    return this;
  }

  typeSmsCode(code) {
    this.smsCodeInput.type(code);
    return this;
  }

  clickConfirmButton() {
    this.confirmButton
      .should("not.be.disabled")
      .click();
    return this;
  }

}

export default new AuthSmsPage();