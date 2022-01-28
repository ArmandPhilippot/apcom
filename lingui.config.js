module.exports = {
  locales: ['en', 'fr'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: '<rootDir>/src/i18n/{locale}/messages',
      include: ['<rootDir>/'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
};
