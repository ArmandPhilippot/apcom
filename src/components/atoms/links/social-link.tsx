import GithubIcon from '@assets/images/social-media/github.svg';
import GitlabIcon from '@assets/images/social-media/gitlab.svg';
import LinkedInIcon from '@assets/images/social-media/linkedin.svg';
import TwitterIcon from '@assets/images/social-media/twitter.svg';
import { FC } from 'react';
import styles from './social-link.module.scss';

type SocialLinkProps = {
  /**
   * The social website name.
   */
  name: 'Github' | 'Gitlab' | 'LinkedIn' | 'Twitter';
  /**
   * The social profile url.
   */
  url: string;
};

/**
 * SocialLink component
 *
 * Render a social icon link.
 */
const SocialLink: FC<SocialLinkProps> = ({ name, url }) => {
  /**
   * Retrieve a social link icon by id.
   * @param {string} id - The social website id.
   */
  const getIcon = (id: string) => {
    switch (id) {
      case 'Github':
        return <GithubIcon className={styles.icon} aria-hidden="true" />;
      case 'Gitlab':
        return <GitlabIcon className={styles.icon} aria-hidden="true" />;
      case 'LinkedIn':
        return <LinkedInIcon className={styles.icon} aria-hidden="true" />;
      case 'Twitter':
        return <TwitterIcon className={styles.icon} aria-hidden="true" />;
      default:
        break;
    }
  };

  return (
    <a href={url} className={styles.link} aria-label={name}>
      {getIcon(name)}
    </a>
  );
};

export default SocialLink;
