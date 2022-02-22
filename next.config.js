const path = require('path');

const backendDomain = process.env.APP_BACKEND_DOMAIN;
const frontendDomain = process.env.APP_FRONTEND_DOMAIN;
const ackeeDomain = process.env.NEXT_PUBLIC_ACKEE_DOMAIN;

const contentSecurityPolicy = `
  default-src 'self' ${backendDomain};
  child-src 'self' *.${frontendDomain.replace('www.', '')};
  connect-src 'self' ${backendDomain} ${ackeeDomain} api.github.com;
  font-src 'self';
  frame-src 'self';
  img-src 'self' ${backendDomain} secure.gravatar.com data:;
  media-src 'self' data:;
  script-src 'self' ${ackeeDomain} 'unsafe-inline' data:;
  style-src 'self' 'unsafe-inline';
`;

const contentSecurityPolicyDev = `
  default-src 'self' ${backendDomain};
  child-src 'self' *.${frontendDomain.replace('www.', '')};
  connect-src 'self' ${backendDomain} ${ackeeDomain} api.github.com;
  font-src 'self';
  frame-src 'self';
  img-src 'self' ${backendDomain} secure.gravatar.com data:;
  media-src 'self' data:;
  object-src 'self' data:;
  script-src 'self' ${ackeeDomain} 'unsafe-inline' 'unsafe-eval' data:;
  style-src 'self' 'unsafe-inline';
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value:
      process.env.NODE_ENV !== 'development'
        ? contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
        : contentSecurityPolicyDev.replace(/\s{2,}/g, ' ').trim(),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
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
  webpack: (config) => {
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
