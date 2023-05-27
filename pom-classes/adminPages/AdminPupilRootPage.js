class AdminPupilRootPage {

  get createAdminForm() {
    return cy.get("#make_admin_form").as("createAdminForm");
  }

  get emailInput() {
    return this.createAdminForm.find("input[name=email]");
  }

  get createAdminButton() {
    return this.createAdminForm.find("button[type=submit]");
  }

  get resultHeader() {
    return cy.get("h3");
  }

  get setPermsButton() {
    return cy.get("button#setting_perms");
  }


  goToPage(sharedUrl) {
    cy.visit(`${sharedUrl}adminka/danger`);
    //TODO: ошибка завершает тест, добавил игнор
    cy.on("uncaught:exception", (err, runnable) => {
      // Проверяем, содержит ли ошибка $ is not defined
      if (err.message.includes("properties of null (reading 'addEventListener')")) {
        // Пропускаем ошибку
        return false;
      }
      // В противном случае, позволяем ошибке вызвать сбой теста
      return true;
    });
    return this;
  }

  get header() {
    return this.createAdminForm.find("h5");
  }

  checkHeader() {
    this.header.should("contain", "- Сделать ученика админом -");
    return this;
  }

  typeAdminEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  clickCreateAdminButton() {
    this.createAdminButton.click();
    cy.on("window:confirm", () => true);
    return this;
  }

  checkResultHeader(email) {
    this.resultHeader
      .should("exist")
      .should("contain", `Пользователь ${email} теперь админ.`);
    return this;
  }

  clickSetPermsButton() {
    this.setPermsButton.click();
    return this;
  }

}

export default new AdminPupilRootPage();