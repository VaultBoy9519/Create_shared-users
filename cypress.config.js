const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 70000,
    pageLoadTimeout: 500000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
