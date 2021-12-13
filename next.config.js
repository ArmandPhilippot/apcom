const path = require('path');
const { locales } = require('./lingui.config');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales,
    defaultLocale: 'fr',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.po/,
        use: ['@lingui/loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeTitle: false,
                        removeViewBox: false,
                      },
                    },
                  },
                  'removeDimensions',
                ],
              },
            },
          },
        ],
      }
    );

    return config;
  },
};
