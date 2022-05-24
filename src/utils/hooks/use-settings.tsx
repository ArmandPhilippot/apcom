import { settings } from '@utils/config';
import { useRouter } from 'next/router';

export type BlogSettings = {
  /**
   * The number of posts per page.
   */
  postsPerPage: number;
};

export type CopyrightSettings = {
  /**
   * The copyright end year.
   */
  end: string;
  /**
   * The copyright start year.
   */
  start: string;
};

export type LocaleSettings = {
  /**
   * The default locale.
   */
  default: string;
  /**
   * The supported locales.
   */
  supported: string[];
};

export type WebsiteSettings = {
  /**
   * The website name.
   */
  name: string;
  /**
   * The website baseline.
   */
  baseline: string;
  /**
   * The website copyright dates.
   */
  copyright: CopyrightSettings;
  /**
   * The website admin email.
   */
  email: string;
  /**
   * The website locales.
   */
  locales: LocaleSettings;
  /**
   * The website url.
   */
  url: string;
};

export type UseSettingsReturn = {
  blog: BlogSettings;
  website: WebsiteSettings;
};

/**
 * Retrieve the website and blog settings.
 *
 * @returns {UseSettingsReturn} - An object describing settings.
 */
const useSettings = (): UseSettingsReturn => {
  const { baseline, copyright, email, locales, name, postsPerPage, url } =
    settings;
  const router = useRouter();
  const locale = router.locale || locales.defaultLocale;

  return {
    blog: {
      postsPerPage,
    },
    website: {
      baseline: locale.startsWith('en') ? baseline.en : baseline.fr,
      copyright: {
        end: copyright.endYear,
        start: copyright.startYear,
      },
      email,
      locales: {
        default: locales.defaultLocale,
        supported: locales.supported,
      },
      name,
      url,
    },
  };
};

export default useSettings;
