const { locales } = require('./lingui.config');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales,
    defaultLocale: 'fr',
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po/,
      use: ['@lingui/loader'],
    });

    return config;
  },
};
