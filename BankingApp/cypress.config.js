const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {

  // Hook reporter plugin
  require("cypress-mochawesome-reporter/plugin")(on);

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "Practice Test Automation",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    viewportWidth: 1320,
    viewportHeight: 1080,

    video: true,
    baseUrl: "https://www.globalsqa.com/angularJs-protractor/BankingProject",
    specPattern: "cypress/e2e/features/**/*.feature",
    setupNodeEvents,
  },
});


