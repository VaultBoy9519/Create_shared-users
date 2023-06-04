import tutorRegPage from "../../pom-classes/tutorPages/TutorRegPage";
import authSmsPage from "../../pom-classes/adminPages/AuthSmsPage";
import adminPage from "../../pom-classes/adminPages/AdminPage";
import adminTutorPage from "../../pom-classes/adminPages/AdminTutorPage";
import adminTutorEditPage from "../../pom-classes/adminPages/AdminTutorEditPage";
import adminTutorRatesPage from "../../pom-classes/adminPages/AdminTutorRatesPage";
import "../support/commands.js";

const { fakerRU } = require("@faker-js/faker");

const sharedUrl = Cypress.env("URL");
// const sharedUrl = "https://review-mr-4857-de-lwq8xf.k8s.tetrika-school.ru/";

const tutorRegData = {
  firstName: fakerRU.person.firstName("male"),
  middleName: fakerRU.person.middleName("male"),
  lastName: fakerRU.person.lastName("male"),
  phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
  email: fakerRU.internet.email().toLowerCase()
};

it(`Создание преподавателя: 
    √ имя - ${tutorRegData.firstName} ${tutorRegData.lastName}, 
    √ номер - ${tutorRegData.phoneNumber}
    √ email - ${tutorRegData.email}`
  , () => {
    cy.visit(`${sharedUrl}auth/tutor/new`);

    tutorRegPage
      .checkUrl()
      .typeUsername(tutorRegData.firstName)
      .typeNumber(tutorRegData.phoneNumber)
      .typeEmail(tutorRegData.email)
      .clickCheckboxOffert()
      .clickCheckboxPrivacy()
      .clickCheckboxAgreement()
      .clickSubmitButton();

    authSmsPage
      .checkTopSmsText(tutorRegData.phoneNumber);

    cy.postAuth(sharedUrl);
    cy.visit(`${sharedUrl}adminka`);
    cy.createUser(tutorRegData, cy.createTutor, sharedUrl);

  });

it("Установка параметров и ставок препода", () => {

  // adminLogin();
  cy.postAuth(sharedUrl);
  cy.visit(`${sharedUrl}adminka`);

  adminPage.searchUser(tutorRegData.phoneNumber, tutorRegData.email);
  adminTutorPage.checkFullName(tutorRegData.firstName, tutorRegData.middleName, tutorRegData.lastName);

  adminTutorPage
    .clickTutorOptions()
    .clickEditLink();

  adminTutorEditPage
    .checkTitle()
    .setMathSubject()
    .clickBackLink();

  adminTutorPage
    .checkSubjects()
    .clickRatesLink();

  adminTutorRatesPage
    .checkHeader()
    .setRateMathGraduate()
    .checkRate();
});