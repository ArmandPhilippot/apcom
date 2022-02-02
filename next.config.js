const path = require('path');

const backendDomain = process.env.BACKEND_URL.split('//')[1];

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  images: {
    domains: [backendDomain, 'secure.gravatar.com'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ];
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias['@formatjs/icu-messageformat-parser'] =
        '@formatjs/icu-messageformat-parser/no-parser';
    }
    config.module.rules.push(
      {
        test: /\.pdf/,
        type: 'asset',
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withBundleAnalyzer(withMDX(nextConfig));
