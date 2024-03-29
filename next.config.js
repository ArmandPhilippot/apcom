import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';
import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';

const currentDir = dirname(fileURLToPath(import.meta.url));

const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
const backendDomain = isStaging
  ? process.env.APP_STAGING_BACKEND_DOMAIN
  : process.env.APP_BACKEND_DOMAIN;
const frontendDomain = isStaging
  ? process.env.APP_STAGING_FRONTEND_DOMAIN
  : process.env.APP_FRONTEND_DOMAIN;
const ackeeDomain = process.env.NEXT_PUBLIC_ACKEE_DOMAIN;

const contentSecurityPolicy = `
  default-src 'self' ${backendDomain};
  child-src 'self' *.${frontendDomain.replace('www.', '')};
  connect-src 'self' ${backendDomain} ${ackeeDomain} api.github.com;
  font-src 'self';
  frame-src 'self';
  img-src 'self' ${backendDomain} secure.gravatar.com data:;
  media-src 'self' ${backendDomain} data:;
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
  media-src 'self' ${backendDomain} data:;
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
      process.env.NODE_ENV === 'development'
        ? contentSecurityPolicyDev.replace(/\s{2,}/g, ' ').trim()
        : contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers() {
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
    remotePatterns: [
      {
        hostname: backendDomain,
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/feed/atom',
        destination: '/atom.xml',
        permanent: true,
      },
    ];
  },
  sassOptions: {
    includePaths: [
      join(currentDir, 'styles'),
      join(currentDir, 'node_modules'),
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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const overrideHTMLTags = () => (tree) => {
  visit(tree, 'mdxJsxTextElement', (node) => {
    if (node.data) {
      delete node.data._mdxExplicitJsx;
    }
  });
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug, overrideHTMLTags],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));

// cSpell:ignore ipfs picsum
