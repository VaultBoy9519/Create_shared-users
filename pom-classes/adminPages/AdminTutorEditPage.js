class AdminTutorEditPage {

  get title() {
    return cy.get("h2");
  }

  get backLink() {
    return cy.get("a[href^='/adminka/tutors/']");
  }

  get mathGraduateCheckbox() {
    return cy.get("input[name=math___graduate]");
  }

  get subjectClassButton() {
    return cy.get("input[type='submit'].btn.btn-info").eq(2);
  }

  get mathEgeCheckbox() {
    return cy.get("label[for='mathege']");
  }

  get subjectTargetButton() {
    return cy.get("input[type='submit'].btn.btn-info").eq(3);
  }

  checkTitle() {
    this.title.should("contain", "Редактирование данных преподавателя");
    return this;
  }

  setMathSubject() {

    this.mathGraduateCheckbox.should("exist").click();
    this.subjectClassButton.should("exist").click();
    this.mathEgeCheckbox.should("exist").click();
    this.subjectTargetButton.should("exist").click();

    return this;
  }

  clickBackLink() {
    this.backLink.click();
    return this;
  }
}

export default new AdminTutorEditPage();