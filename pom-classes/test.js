const test = () => {
  let verificationCode;
  const clearText = "verification_code: {\"user_ip\": \"185.177.104.119\", \"verification_code\": \"7793\"}\n".replace(/[^a-zA-Z0-9\s]/g, "");
  verificationCode = clearText.split(" ")[4];
  return verificationCode;
};

console.log(test());

const { faker } = require("@faker-js/faker/locale/ru");

console.log(faker.person.middleName("male"));