export const settings = {
  ackee: {
    filename: process.env.NEXT_PUBLIC_ACKEE_FILENAME || 'tracker.js',
    siteId: process.env.NEXT_PUBLIC_ACKEE_SITE_ID || '',
    url: `https://${process.env.NEXT_PUBLIC_ACKEE_DOMAIN}` || '',
  },
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
  postsPerPage: 10,
  twitterId: '@ArmandPhilippot',
  url: `${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
};
