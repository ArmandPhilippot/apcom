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
    'storybook-dark-mode',
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

    return { ...config, ...nextConfig.webpack };
  },
};

module.exports = storybookConfig;
