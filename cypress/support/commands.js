import pupilRegPage from "../../pom-classes/pupilPages/PupilRegPage";
import authSmsPage from "../../pom-classes/adminPages/AuthSmsPage";
import adminPage from "../../pom-classes/adminPages/AdminPage";
import adminSmsPage from "../../pom-classes/adminPages/AdminSmsPage";
import pupilClassPage from "../../pom-classes/pupilPages/PupilClassPage";
import tutorMainInfoPage from "../../pom-classes/tutorPages/TutorMainInfo";
import tutorProfInfoPage from "../../pom-classes/tutorPages/TutorProfessionalInfo";
import tutorLessonInfoPage from "../../pom-classes/tutorPages/TutorLessonsInfo";
import tutorSuccessPage from "../../pom-classes/tutorPages/TutorSuccessPage";

Cypress.Commands.add("postAuth", (url) => {
  cy.clearCookie("login");
  cy.request({
    method: "POST",
    url: `${url}auth/email_login`,
    form: true,
    body: {
      email: "admin@preprep.ru",
      password: "oioioi",
      action: "enter"
    }
  });
});

Cypress.Commands.add("createPupil", () => {
  pupilClassPage
    .checkHeader()
    .clickClassButton()
    .clickNextButton();
});

Cypress.Commands.add("createTutor", (regData) => {
  tutorMainInfoPage
    .checkHeader()
    .setGender()
    .typeSurname(regData.lastName)
    .typeMiddlename(regData.middleName)
    .typeDateOfBirth()
    .typeCity()
    .setPassport()
    .clickNextButton();

  tutorProfInfoPage
    .clickProfessionalButtons()
    .clickNextButton();

  tutorLessonInfoPage
    .clickSubjectsButtons()
    .clickNextButton();

  tutorSuccessPage
    .checkTitle()
    .clickLkButton();
});

Cypress.Commands.add("createUser", (userData, createFunc, url) => {
  adminPage
    .checkHeader()
    .clickSmsHistory();

  adminSmsPage
    .checkUrl()
    .searchAndCheckSms(userData.phoneNumber);

  adminSmsPage.receiveSms()
    .then((verificationCode) => {
      adminSmsPage.clickLogoutButton();
      cy.visit(`${url}auth/sms_confirmation/${userData.phoneNumber}`);

      authSmsPage
        .checkTopSmsText(userData.phoneNumber)
        .typeSmsCode(verificationCode)
        .clickConfirmButton();

      createFunc(userData);
      cy.get("header").should("contain", "Проверьте оборудование");
    });
});

Cypress.Commands.add("createPupilOrAdmin", (regData, url) => {
  cy.visit(`${url}auth/pupil/new`);

  pupilRegPage
    .checkUrl()
    .typeUsername(regData.firstName)
    .typeNumber(regData.phoneNumber)
    .typeEmail(regData.email)
    .clickCheckboxPrivacy()
    .clickSubmitButton();

  authSmsPage
    .checkTopSmsText(regData.phoneNumber);

  cy.postAuth(url);
  cy.visit(`${url}adminka`);
  cy.createUser(regData, cy.createPupil, url);
});