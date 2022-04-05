import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './sharing-link.module.scss';

export type SharingMedium =
  | 'diaspora'
  | 'email'
  | 'facebook'
  | 'journal-du-hacker'
  | 'linkedin'
  | 'twitter';

export type SharingLinkProps = {
  /**
   * The sharing medium id.
   */
  medium: SharingMedium;
  /**
   * The sharing url.
   */
  url: string;
};

/**
 * SharingLink component
 *
 * Render a sharing link.
 */
const SharingLink: FC<SharingLinkProps> = ({ medium, url }) => {
  const intl = useIntl();
  const text = intl.formatMessage(
    {
      defaultMessage: 'Share on {name}',
      description: 'Sharing: share on social network text',
      id: 'ureXFw',
    },
    { name: medium }
  );
  const mediumClass = `link--${medium}`;

  return (
    <a href={url} className={`${styles.link} ${styles[mediumClass]}`}>
      <span className="screen-reader-text">{text}</span>
    </a>
  );
};

export default SharingLink;
