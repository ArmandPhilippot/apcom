const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/*
 * Add any custom config to be passed to Jest
 *
 * For a detailed explanation regarding each configuration property and type
 * check, visit:
 * https://jestjs.io/docs/configuration
 */
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    /** Module Path Aliases */
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@content/(.*)$': '<rootDir>/src/content/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@test-utils': '<rootDir>/__tests__/utils/test-utils',
    '^@ts/(.*)$': '<rootDir>/src/ts/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  testPathIgnorePatterns: [
    '<rootDir>/__tests__/jest/__mocks__',
    '<rootDir>/__tests__/utils',
  ],
};

/**
 * createJestConfig is exported this way to ensure that next/jest can load the
 * Next.js config which is async.
 */
module.exports = createJestConfig(customJestConfig);
