import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const loadedEnv = dotenv.config();
dotenvExpand.expand(loadedEnv);

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
  env: {
    NEXT_PUBLIC_STAGING_GRAPHQL_API:
      process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API ?? '',
  },
});
