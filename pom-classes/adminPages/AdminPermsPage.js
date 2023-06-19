class AdminPermsPage {

  get cardPerms() {
    return cy.get("div.card").as("cardPerms");
  }

  get permsSelector() {
    return this.cardPerms.find("select.form-control[name='permissions']");
  }

  get editPermsButton() {
    return this.cardPerms.find("button#edit-user-perms-btn");
  }

  checkCardHeader() {
    cy.get("h1").should("contain", "Редактирование прав пользователя");
    return this;
  }


  setAndCheckPermissions() {
    const removePermissions = [
      "Управление модулями",
      "Админ аутсорс",
      "Отметка прохождения адаптации",
      "Просмотр расписания смен",
      "Просмотр и редактирование расписания смен"
    ];

    this.permsSelector
      .then(($select) => {
        const options = $select.find("option");
        options.each((index, element) => {
          cy.wrap(element).invoke("attr", "selected", "selected");
        });
      });

    removePermissions.forEach((permission) => {
      cy.contains("option", permission).invoke("removeAttr", "selected");
    });

    this.editPermsButton.click();

    this.permsSelector
      .find("option")
      .each(($option) => {
        const optionText = $option.text();
        const hasPermission = removePermissions.some((permission) =>
          optionText.includes(permission)
        );

        if (hasPermission) {
          expect($option).not.to.have.attr("selected");
        } else {
          expect($option).to.have.attr("selected");
        }
      });

    return this;
  }


  clickEditPermsButton() {
    this.editPermsButton.click();
    return this;
  }

}

export default new AdminPermsPage();