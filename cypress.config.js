import { defineConfig } from 'cypress';

export default defineConfig({
  downloadsFolder: 'tests/cypress/downloads',
  fixturesFolder: 'tests/cypress/fixtures',
  screenshotsFolder: 'tests/cypress/screenshots',
  supportFolder: 'tests/cypress/support',
  videosFolder: 'tests/cypress/videos',

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/cypress/support/e2e.ts',
  },
});
