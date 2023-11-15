const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';

export const CONFIG = {
  ackee: {
    filename: process.env.NEXT_PUBLIC_ACKEE_FILENAME ?? 'tracker.js',
    siteId: process.env.NEXT_PUBLIC_ACKEE_SITE_ID ?? '',
    url: process.env.NEXT_PUBLIC_ACKEE_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_ACKEE_DOMAIN}`
      : '',
  },
  api: {
    url: isStaging
      ? process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API
      : process.env.NEXT_PUBLIC_GRAPHQL_API,
  },
  name: 'Armand Philippot',
  baseline: 'Intégrateur web',
  copyright: {
    startYear: '2012',
    endYear: new Date().getFullYear().toString(),
  },
  email: process.env.APP_AUTHOR_EMAIL ?? '',
  locales: {
    defaultLocale: 'fr',
    defaultCountry: 'FR',
    supported: ['en', 'fr'],
  },
  postsPerPage: 10,
  twitterId: '@ArmandPhilippot',
  url:
    (isStaging
      ? process.env.NEXT_PUBLIC_STAGING_APP_URL
      : process.env.NEXT_PUBLIC_APP_URL) ?? '',
};
