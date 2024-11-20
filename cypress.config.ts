import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'test/cypress/e2e/**/*.cy.ts', // Update the path
    supportFile: 'test/cypress/support/e2e.ts', // Update the path
    fixturesFolder: 'test/cypress/fixtures', // Update the path
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
