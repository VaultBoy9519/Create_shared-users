class AdminPage {

  get adminHeader() {
    return cy.get("h2");
  }

  get smsHistoryLink() {
    return cy.get(".sidebar-sticky a[href$=sms_history]");
  };

  get searchInput() {
    return cy.get("input#search_field");
  }

  get searchCard() {
    return cy.get(".card-body");
  }

  checkHeader() {
    this.adminHeader.should("contain", "Admin");
    return this;
  }

  clickSmsHistory() {
    this.smsHistoryLink.click();
    return this;
  }

  searchUser(number, email) {
    this.searchInput.type(number);
    cy.wait(3000);
    this.searchCard
      .should("be.visible")
      .should("contain", email)
      .click();
    return this;
  }

}

export default new AdminPage();