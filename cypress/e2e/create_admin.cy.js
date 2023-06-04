import adminPupilRootPage from "../../pom-classes/adminPages/AdminPupilRootPage";
import adminPermsPage from "../../pom-classes/adminPages/AdminPermsPage";
import "../support/commands.js";

const { fakerRU } = require("@faker-js/faker");

// const sharedUrl = "https://review-mr-4857-de-lwq8xf.k8s.tetrika-school.ru/";
const sharedUrl = Cypress.env("URL");

const adminRegData = {
  firstName: `Администратор`,
  phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
  email: fakerRU.internet.email().toLowerCase()
};

it(`Создание админа: 
    √ имя - ${adminRegData.firstName}, 
    √ номер - ${adminRegData.phoneNumber}
    √ email - ${adminRegData.email}`
  , () => {
    cy.createPupilOrAdmin(adminRegData, sharedUrl);
  });

it("Установка прав админа", () => {

  cy.postAuth(sharedUrl);
  cy.visit(`${sharedUrl}adminka`);

  adminPupilRootPage
    .goToPage(sharedUrl)
    .checkHeader()
    .typeAdminEmail(adminRegData.email)
    .clickCreateAdminButton()
    .checkResultHeader(adminRegData.email)
    .clickSetPermsButton();

  adminPermsPage
    .checkCardHeader()
    .setPermissions()
    .clickEditPermsButton();
});