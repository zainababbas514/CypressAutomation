const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Demo Web Shop Tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  
  e2e: {
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://demowebshop.tricentis.com/",
  },

});
