const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.google.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    async setupNodeEvents(on, config) {
      // Add Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Create bundler with esbuild plugin
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      // Register file preprocessor
      on('file:preprocessor', bundler);

      // Task for logging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    },

    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'spec',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});