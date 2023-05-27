class TutorMainInfo {

  get header() {
    return cy.get(".tutor-reg h1");
  }

  get gender() {
    return cy.get(".tutor-reg label[for='male']");
  }

  get surname() {
    return cy.get(".tutor-reg input[name=surname]");
  }

  get middlename() {
    return cy.get(".tutor-reg input[name=middlename]");
  }

  get dateOfBirth() {
    return cy.get(".tutor-reg input[name=date_of_birth]");
  }

  get city() {
    return cy.get(".tutor-reg input[name=city]");
  }

  get hasPassportRadio() {
    return cy.get(".tutor-reg label[for='has-passport']");
  }

  get nextButton() {
    return cy.get(".tutor-reg .tutor-reg__btn");
  };

  checkHeader() {
    this.header.should("contain", "Поздравляем с успешной регистрацией!");
    return this;
  }

  setGender() {
    this.gender.click();
    return this;
  }

  typeSurname(surname) {
    this.surname.type(surname);
    return this;
  }

  typeMiddlename(middlename) {
    this.middlename.type(middlename);
    return this;
  }

  typeDateOfBirth() {
    this.dateOfBirth.type("01/01/1999");
    return this;
  }

  typeCity() {
    this.city.type("Санкт-Петербург");
    return this;
  }

  setPassport() {
    this.hasPassportRadio.click();
    return this;
  }

  clickNextButton() {
    this.nextButton.should("not.be.disabled").click();
    return this;
  }

}

export default new TutorMainInfo();