const { fakerRU } = require("@faker-js/faker");
import "../support/commands.js";

const sharedUrl = Cypress.env("URL");
// const sharedUrl = "https://review-mr-4334-de-43fk7j.k8s.tetrika-school.ru/";

const pupilRegData = {
  firstName: fakerRU.person.firstName(),
  phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
  email: fakerRU.internet.email().toLowerCase()
};


it(`Создание ученика:
    √ имя - ${pupilRegData.firstName},
    √ номер - ${pupilRegData.phoneNumber}
    √ email - ${pupilRegData.email}`
  , () => {
    cy.createPupilOrAdmin(pupilRegData, sharedUrl);
  });

