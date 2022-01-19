import { t } from '@lingui/macro';

export const config = {
  name: 'Armand Philippot',
  baseline: t`Front-end developer`,
  copyright: {
    startYear: '2012',
    endYear: new Date().getFullYear(),
  },
  locales: {
    defaultLocale: 'fr',
    defaultCountry: 'FR',
  },
  postsPerPage: 10,
  twitterId: '@ArmandPhilippot',
  url: process.env.NEXT_PUBLIC_FRONTEND_URL,
};
