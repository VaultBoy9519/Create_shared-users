class AdminTutorRatesPage {

  get header() {
    return cy.get("a[href$='/payoffs']");
  }

  get rateMathGraduate() {
    return cy.get("tr:nth-child(10) button[type='submit']");
  }

  get tableThisRates() {
    return cy.get("table").first();
  }

  checkHeader() {
    this.header.should("contain", "Выплаты для");
    return this;
  }

  setRateMathGraduate() {
    this.rateMathGraduate.click();
    return this;
  }

  checkRate() {
    this.tableThisRates
      .contains("td", "profi")
      .should("exist");
    return this;
  }

}

export default new AdminTutorRatesPage();