const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 300000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
