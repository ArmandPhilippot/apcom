import type { StorybookConfig } from '@storybook/nextjs';
import { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Use SVGR for SVG files. See: https://medium.com/@derek_19900/config-storybook-4-to-use-svgr-webpack-plugin-22cb1152f004
    const rules = config.module?.rules as RuleSetRule[];
    const fileLoaderRule = rules.find(
      (rule) => rule?.test instanceof RegExp && rule.test.test('.svg')
    );

    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/;

    rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { dimensions: false } }],
    });

    /** @type {import('next').NextConfig} */
    const nextConfig = require('../next.config');

    return {
      ...config,
      ...nextConfig.webpack,
    };
  },
};
export default config;
