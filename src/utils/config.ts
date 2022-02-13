export const settings = {
  name: 'Armand Philippot',
  baseline: {
    en: 'Front-end developer',
    fr: 'Intégrateur web',
  },
  copyright: {
    startYear: '2012',
    endYear: new Date().getFullYear(),
  },
  locales: {
    defaultLocale: 'fr',
    defaultCountry: 'FR',
    supported: ['en', 'fr'],
  },
  matomo: {
    urlBase: process.env.NEXT_PUBLIC_MATOMO_URL || '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '0',
  },
  postsPerPage: 10,
  twitterId: '@ArmandPhilippot',
  url: process.env.NEXT_PUBLIC_FRONTEND_URL,
};
