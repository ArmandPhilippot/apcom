module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['formatjs'],
  parserOptions: {
    project: ['tsconfig.json', './tests/cypress/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'formatjs/enforce-default-message': ['error', 'literal'],
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
  },
};
