import { createInstance } from '@datapunt/matomo-tracker-react';

export const instance = createInstance({
  urlBase: process.env.NEXT_PUBLIC_MATOMO_URL || '',
  siteId: Number(process.env.NEXT_PUBLIC_MATOMO_SITE_ID) || 0,
  linkTracking: true,
});
