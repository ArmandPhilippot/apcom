const path = require('path');

/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */

const storybookConfig = {
  stories: ['../src/**/*.stories.@(md|mdx|js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
  /**
   * @param {WebpackConfig} config
   * @return {Promise<WebpackConfig>}
   */
  webpackFinal: async (config) => {
    // Use SVGR for SVG files. See: https://medium.com/@derek_19900/config-storybook-4-to-use-svgr-webpack-plugin-22cb1152f004
    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { dimensions: false } }],
    });

    /** @type {import('next').NextConfig} */
    const nextConfig = require('../next.config');

    // Set modules aliases.
    config.resolve.alias = {
      ...config.resolve.alias,
      '@i18n': path.resolve(__dirname, '../src/i18n'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@content': path.resolve(__dirname, '../src/content'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    };

    return { ...config, ...nextConfig.webpack };
  },
};

module.exports = storybookConfig;
