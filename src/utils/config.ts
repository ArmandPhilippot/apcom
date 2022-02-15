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
    urlBase: `https://${process.env.NEXT_PUBLIC_MATOMO_DOMAIN}` || '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '0',
  },
  postsPerPage: 10,
  twitterId: '@ArmandPhilippot',
  url: `${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
};
