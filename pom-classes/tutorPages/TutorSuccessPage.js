class TutorSuccessPage {

  get title() {
    return cy.get(".tutor-banner__title._left");
  };

  get inLkButton() {
    return cy.get(".tutor-banner__content a[href$=confirmed]");
  }

  checkTitle() {
    this.title.should("contain", "Поздравляем, вы успешно прошли предварительный отбор!");
    return this;
  }

  clickLkButton() {
    this.inLkButton.click();
    return this;
  }

}

export default new TutorSuccessPage();