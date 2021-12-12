module.exports = {
  locales: ['fr'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/i18n/{locale}/messages',
      include: ['<rootDir>/'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
};
