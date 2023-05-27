class TutorProfessionalInfo {

  get header() {
    return cy.get(".tutor-reg h1");
  }

  get experienceButton() {
    return cy.contains("label.radio-group__label", "Больше 3-х лет");
  };

  get hoursButton() {
    return cy.contains("label.radio-group__label", "Более 30 часов");
  };

  get deviceButton() {
    return cy.contains("label.multiple-group__label", "Ноутбук");
  }

  get nextButton() {
    return cy.get(".tutor-reg button._btn-next");
  }

  clickProfessionalButtons() {
    this.experienceButton.click();
    this.hoursButton.click();
    this.deviceButton.click();
    return this;
  }

  clickNextButton() {
    this.nextButton.should("not.be.disabled").click();
  }

}

export default new TutorProfessionalInfo();