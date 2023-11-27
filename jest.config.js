import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/**
 * Add any custom config to be passed to Jest
 *
 * For a detailed explanation regarding each configuration property and type
 * check, visit:
 * https://jestjs.io/docs/configuration
 *
 * @type {import('jest').Config}
 */
const customJestConfig = {
  // Needed because of mswServer export in tests directory.
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/tests'],

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/tests/jest/__mocks__/svgr.mock.tsx',
  },

  setupFiles: ['./jest.polyfills.cjs'],

  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/tests'],
};

/**
 * createJestConfig is exported this way to ensure that next/jest can load the
 * Next.js config which is async.
 */
export default createJestConfig(customJestConfig);
