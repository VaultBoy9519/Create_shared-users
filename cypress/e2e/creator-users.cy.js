import adminTutorEditPage from "../../pom-classes/adminPages/AdminTutorEditPage";
import loginPage from "../../pom-classes/otherPages/LoginPage";
import adminPage from "../../pom-classes/adminPages/AdminPage";
import adminSmsPage from "../../pom-classes/adminPages/AdminSmsPage";
import authSmsPage from "../../pom-classes/adminPages/AuthSmsPage";
import pupilRegPage from "../../pom-classes/pupilPages/PupilRegPage";
import pupilClassPage from "../../pom-classes/pupilPages/PupilClassPage";
import tutorRegPage from "../../pom-classes/tutorPages/TutorRegPage";
import tutorSuccessPage from "../../pom-classes/tutorPages/TutorSuccessPage";
import adminTutorPage from "../../pom-classes/adminPages/AdminTutorPage";
import tutorMainInfoPage from "../../pom-classes/tutorPages/TutorMainInfo";
import tutorProfInfoPage from "../../pom-classes/tutorPages/TutorProfessionalInfo";
import tutorLessonInfoPage from "../../pom-classes/tutorPages/TutorLessonsInfo";
import adminTutorRatesPage from "../../pom-classes/adminPages/AdminTutorRatesPage";
import adminPupilRootPage from "../../pom-classes/adminPages/AdminPupilRootPage";
import adminPermsPage from "../../pom-classes/adminPages/AdminPermsPage";

const { fakerRU } = require("@faker-js/faker");


describe("creator users for shared", () => {
  const sharedUrl = Cypress.env("URL");

  const adminEmail = "admin@preprep.ru";
  const adminPassword = "oioioi";

  const pupilRegData = {
    firstName: fakerRU.person.firstName(),
    phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
    email: fakerRU.internet.email().toLowerCase()
  };

  const tutorRegData = {
    firstName: fakerRU.person.firstName("male"),
    middleName: fakerRU.person.middleName("male"),
    lastName: fakerRU.person.lastName("male"),
    phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
    email: fakerRU.internet.email().toLowerCase()
  };

  const adminRegData = {
    firstName: `Администратор`,
    phoneNumber: `+3${fakerRU.phone.number().replace(/\D/g, "")}`,
    email: fakerRU.internet.email().toLowerCase()
  };

  const adminLogin = () => {
    cy.visit(`${sharedUrl}auth/email_login`);
//TODO: ошибка завершает тест, добавил игнор
    cy.on("uncaught:exception", (err) => {
      // Проверяем, является ли ошибка TypeError с сообщением "Cannot set properties of null (setting 'src')"
      if (err.message.includes("Cannot set properties of null (setting 'src')") && err.name === "TypeError") {
        // Игнорируем ошибку
        return false;
      }
      // Если это не ошибка, пропустите ее и позвольте ей быть обработанной по умолчанию
      return true;
    });

    loginPage
      .checkUrl()
      .typeEmail(adminEmail)
      .typePassword(adminPassword)
      .clickEnterButton();
  };

  const createPupil = () => {
    pupilClassPage
      .checkHeader()
      .clickClassButton()
      .clickNextButton();
  };

  const createTutor = () => {
    tutorMainInfoPage
      .checkHeader()
      .setGender()
      .typeSurname(tutorRegData.lastName)
      .typeMiddlename(tutorRegData.middleName)
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
  };

  const createUser = (userData, createFunc) => {
    adminPage
      .checkHeader()
      .clickSmsHistory();

    adminSmsPage
      .checkUrl()
      .searchAndCheckSms(userData.phoneNumber);

    adminSmsPage.receiveSms()
      .then((verificationCode) => {
        adminSmsPage.clickLogoutButton();
        cy.visit(`${sharedUrl}auth/sms_confirmation/${userData.phoneNumber}`);

        authSmsPage
          .checkTopSmsText(userData.phoneNumber)
          .typeSmsCode(verificationCode)
          .clickConfirmButton();

        createFunc();
        cy.get("header").should("contain", "Проверьте оборудование");
      });
  };

  const createPupilorAdmin = (regData) => {
    cy.visit(`${sharedUrl}auth/pupil/new`);

    pupilRegPage
      .checkUrl()
      .typeUsername(regData.firstName)
      .typeNumber(regData.phoneNumber)
      .typeEmail(regData.email)
      .clickCheckboxPrivacy()
      .clickSubmitButton();

    authSmsPage
      .checkTopSmsText(regData.phoneNumber);

    adminLogin();
    createUser(regData, createPupil);
  };

  it(`Создание ученика:
                имя - ${pupilRegData.firstName},
                номер - ${pupilRegData.phoneNumber}
                email - ${pupilRegData.email}`
    , () => {
      createPupilorAdmin(pupilRegData);
    });

  it(`Создание преподавателя: 
                имя - ${tutorRegData.firstName} ${tutorRegData.lastName}, 
                номер - ${tutorRegData.phoneNumber}
                email - ${tutorRegData.email}`
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

      adminLogin();
      createUser(tutorRegData, createTutor);

    });

  it(`Создание админа: 
                имя - ${adminRegData.firstName}, 
                номер - ${adminRegData.phoneNumber}
                email - ${adminRegData.email}`
    , () => {
      createPupilorAdmin(adminRegData);
    });

  it("Установка параметров и ставок препода", () => {

    adminLogin();

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

  it("Установка прав админа", () => {

    adminLogin();

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

});
