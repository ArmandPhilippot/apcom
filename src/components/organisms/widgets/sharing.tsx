import SharingLink, {
  type SharingMedium,
} from '@components/atoms/links/sharing-link';
import Widget, { type WidgetProps } from '@components/molecules/layout/widget';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './sharing.module.scss';

export type SharingData = {
  /**
   * The content excerpt.
   */
  excerpt: string;
  /**
   * The content title.
   */
  title: string;
  /**
   * The content url.
   */
  url: string;
};

export type SharingProps = WidgetProps & {
  /**
   * The page data to share.
   */
  data: SharingData;
  /**
   * A list of active and ordered sharing medium.
   */
  media: SharingMedium[];
};

/**
 * Sharing widget component
 *
 * Render a list of sharing links inside a widget.
 */
const Sharing: VFC<SharingProps> = ({ data, media, ...props }) => {
  const intl = useIntl();

  /**
   * Build the Diaspora sharing url with provided data.
   *
   * @param {string} title - The content title.
   * @param {string} url - The content url.
   * @returns {string} The Diaspora url.
   */
  const buildDiasporaUrl = (title: string, url: string): string => {
    const titleParam = `title=${encodeURI(title)}`;
    const urlParam = `url=${encodeURI(url)}`;
    return `https://share.diasporafoundation.org/?${titleParam}&${urlParam}`;
  };

  /**
   * Build the mailto url from provided data.
   *
   * @param {string} excerpt - The content excerpt.
   * @param {string} title - The content title.
   * @param {string} url - The content url.
   * @returns {string} The mailto url with params.
   */
  const buildEmailUrl = (
    excerpt: string,
    title: string,
    url: string
  ): string => {
    const intro = intl.formatMessage({
      defaultMessage: 'Introduction:',
      description: 'Sharing: email content prefix',
      id: 'yfgMcl',
    });
    const readMore = intl.formatMessage({
      defaultMessage: 'Read more here:',
      description: 'Sharing: content link prefix',
      id: 'UsQske',
    });
    const body = `${intro}\n\n"${excerpt}"\n\n${readMore} ${url}`;
    const bodyParam = excerpt ? `body=${encodeURI(body)}` : '';

    const subject = intl.formatMessage(
      {
        defaultMessage: 'You should read {title}',
        description: 'Sharing: subject text',
        id: 'azgQuH',
      },
      { title }
    );
    const subjectParam = `subject=${encodeURI(subject)}`;

    return `mailto:?${bodyParam}&${subjectParam}`;
  };

  /**
   * Build the Facebook sharing url with provided data.
   *
   * @param {string} url - The content url.
   * @returns {string} The Facebook url.
   */
  const buildFacebookUrl = (url: string): string => {
    const urlParam = `u=${encodeURI(url)}`;
    return `https://www.facebook.com/sharer/sharer.php?${urlParam}`;
  };

  /**
   * Build the Journal du Hacker sharing url with provided data.
   *
   * @param {string} title - The content title.
   * @param {string} url - The content url.
   * @returns {string} The Journal du Hacker url.
   */
  const buildJdHUrl = (title: string, url: string): string => {
    const titleParam = `title=${encodeURI(title)}`;
    const urlParam = `url=${encodeURI(url)}`;
    return `https://www.journalduhacker.net/stories/new?${titleParam}&${urlParam}`;
  };

  /**
   * Build the LinkedIn sharing url with provided data.
   *
   * @param {string} url - The content url.
   * @returns {string} The LinkedIn url.
   */
  const buildLinkedInUrl = (url: string): string => {
    const urlParam = `url=${encodeURI(url)}`;
    return `https://www.linkedin.com/sharing/share-offsite/?${urlParam}`;
  };

  /**
   * Build the Twitter sharing url with provided data.
   *
   * @param {string} title - The content title.
   * @param {string} url - The content url.
   * @returns {string} The Twitter url.
   */
  const buildTwitterUrl = (title: string, url: string): string => {
    const titleParam = `text=${encodeURI(title)}`;
    const urlParam = `url=${encodeURI(url)}`;
    return `https://twitter.com/intent/tweet?${titleParam}&${urlParam}`;
  };

  /**
   * Retrieve the sharing url by medium id.
   *
   * @param {SharingMedium} medium - A sharing medium id.
   * @returns {string} The sharing url.
   */
  const getUrl = (medium: SharingMedium): string => {
    const { excerpt, title, url } = data;

    switch (medium) {
      case 'diaspora':
        return buildDiasporaUrl(title, url);
      case 'email':
        return buildEmailUrl(excerpt, title, url);
      case 'facebook':
        return buildFacebookUrl(url);
      case 'journal-du-hacker':
        return buildJdHUrl(title, url);
      case 'linkedin':
        return buildLinkedInUrl(url);
      case 'twitter':
        return buildTwitterUrl(title, url);
      default:
        return '#';
    }
  };

  /**
   * Get the sharing list items.
   *
   * @returns {JSX.Element[]} The sharing links wrapped with li element.
   */
  const getItems = (): JSX.Element[] => {
    return media.map((medium) => (
      <li key={medium}>
        <SharingLink medium={medium} url={getUrl(medium)} />
      </li>
    ));
  };

  return (
    <Widget {...props}>
      <ul className={styles.list}>{getItems()}</ul>
    </Widget>
  );
};

export default Sharing;
