class AdminSmsPage {

  get numberInput() {
    return cy.get("form input[name='additional_id']");
  }

  get searchButton() {
    return cy.get("form button[type=submit]");
  }

  get logoutButton() {
    return cy.get(".navbar a[href$=logout]");
  }

  checkUrl() {
    cy.url().should("include", "/adminka/sms_history");
    return this;
  }

  get smsTable() {
    return cy.get("table");
  }

  searchAndCheckSms(number) {
    this.numberInput.type(number);
    this.searchButton.click();
    this.smsTable.should("contain", "verification_code");
    return this;
  }

  receiveSms() {
    return cy.get("table td:contains(\"verification_code\")")
      .invoke("text")
      .then((text) => {
        const clearText = text.replace(/[^a-zA-Z0-9\s]/g, "");
        const verificationCode = clearText.split(" ")[4];
        return verificationCode;
      });
  }

  clickLogoutButton() {
    this.logoutButton.click();
    return this;
  }

}

export default new AdminSmsPage();