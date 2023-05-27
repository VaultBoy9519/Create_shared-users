class AdminPermsPage {

  get cardPerms() {
    return cy.get("div.card").as("cardPerms");
  }

  get permsSelector() {
    return this.cardPerms.find("select.form-control[name='permissions'] option");
  }

  get editPermsButton() {
    return this.cardPerms.find("button#edit-user-perms-btn");
  }

  checkCardHeader() {
    cy.get("h1").should("contain", "Редактирование прав пользователя");
    return this;
  }

  setPermissions() {
    this.permsSelector.each(($option) => {
      cy.wrap($option).click({ force: true });
    });
    this.editPermsButton.click();
    return this;
  }


  clickEditPermsButton() {
    this.editPermsButton.click();
    return this;
  }

}

export default new AdminPermsPage();