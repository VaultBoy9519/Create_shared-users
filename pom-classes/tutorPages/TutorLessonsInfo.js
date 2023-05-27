class TutorLessonsInfo {

  get pupilsAgeButton() {
    return cy.contains("label.multiple-group__label", "Взрослые");
  }

  get subjectDropdown() {
    return cy.get(".tutor-reg__tags-group._subject");
  };

  get psyCheckbox() {
    return cy.contains("label.checkbox__label", "Психология");
  }

  get goalsDropdown() {
    return cy.get(".tutor-reg__tags-group._goals");
  };

  get levelUpCheckbox() {
    return cy.contains("label.checkbox__label", "Повысить уровень");
  }

  get nextButton() {
    return cy.get(".tutor-reg__footer ._btn-next");
  }

  clickSubjectsButtons() {
    this.pupilsAgeButton.should("be.visible").click();
    this.subjectDropdown.should("not.be.disabled").click();
    this.psyCheckbox.should("be.visible").click();
    this.subjectDropdown.click();
    this.psyCheckbox.should("not.be.visible");
    this.goalsDropdown.should("not.be.disabled").click();
    this.levelUpCheckbox.should("be.visible").click();
    return this;
  }

  clickNextButton() {
    this.nextButton.should("not.be.disabled").click();
    return this;
  }

}

export default new TutorLessonsInfo();