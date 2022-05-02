import photo from '@assets/images/armand-philippot.jpg';
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

export type PictureSettings = {
  /**
   * The picture height.
   */
  height: number;
  /**
   * The picture url.
   */
  src: string;
  /**
   * The picture width.
   */
  width: number;
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
   * The website locales.
   */
  locales: LocaleSettings;
  /**
   * A picture representing the website.
   */
  picture: PictureSettings;
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
  const { baseline, copyright, locales, name, postsPerPage, url } = settings;
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
      locales: {
        default: locales.defaultLocale,
        supported: locales.supported,
      },
      name,
      picture: photo,
      url,
    },
  };
};

export default useSettings;
