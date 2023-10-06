import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Heading, SharingLink, type SharingMedium } from '../../atoms';
import { Collapsible, type CollapsibleProps } from '../../molecules';
import styles from './sharing.module.scss';

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

export type SharingProps = Omit<CollapsibleProps, 'children' | 'heading'> & {
  /**
   * Set additional classnames to the sharing links list.
   */
  className?: string;
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
export const Sharing: FC<SharingProps> = ({
  className = '',
  data,
  media,
  ...props
}) => {
  const listClass = `${styles.list} ${className}`;
  const intl = useIntl();
  const widgetTitle = intl.formatMessage({
    defaultMessage: 'Share',
    id: 'q3U6uI',
    description: 'Sharing: widget title',
  });

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
   * Retrieve the sharing label by medium id.
   *
   * @param {SharingMedium} medium - A sharing medium id.
   * @returns {string} The sharing label.
   */
  const getLabel = (medium: SharingMedium): string => {
    switch (medium) {
      case 'diaspora':
        return intl.formatMessage({
          defaultMessage: 'Share on Diaspora',
          description: 'Sharing: Diaspora sharing link',
          id: 'oVLRW8',
        });
      case 'email':
        return intl.formatMessage({
          defaultMessage: 'Share by Email',
          description: 'Sharing: Email sharing link',
          id: '2ukj9H',
        });
      case 'facebook':
        return intl.formatMessage({
          defaultMessage: 'Share on Facebook',
          description: 'Sharing: Facebook sharing link',
          id: 'o0DAK4',
        });
      case 'journal-du-hacker':
        return intl.formatMessage({
          defaultMessage: 'Share on Journal du Hacker',
          description: 'Sharing: Journal du Hacker sharing link',
          id: 'vnbryZ',
        });
      case 'linkedin':
        return intl.formatMessage({
          defaultMessage: 'Share on LinkedIn',
          description: 'Sharing: LinkedIn sharing link',
          id: 'Y+DYja',
        });
      case 'twitter':
      default:
        return intl.formatMessage({
          defaultMessage: 'Share on Twitter',
          description: 'Sharing: Twitter sharing link',
          id: 'NI5gXc',
        });
    }
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
  const getItems = (): JSX.Element[] =>
    media.map((medium) => (
      <li key={medium}>
        <SharingLink
          label={getLabel(medium)}
          medium={medium}
          url={getUrl(medium)}
        />
      </li>
    ));

  return (
    <Collapsible
      {...props}
      heading={
        <Heading isFake level={3}>
          {widgetTitle}
        </Heading>
      }
    >
      <ul className={listClass}>{getItems()}</ul>
    </Collapsible>
  );
};
