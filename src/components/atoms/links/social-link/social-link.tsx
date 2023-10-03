import type { AnchorHTMLAttributes, FC } from 'react';
import GithubIcon from '../../../../assets/images/social-media/github.svg';
import GitlabIcon from '../../../../assets/images/social-media/gitlab.svg';
import LinkedInIcon from '../../../../assets/images/social-media/linkedin.svg';
import TwitterIcon from '../../../../assets/images/social-media/twitter.svg';
import styles from './social-link.module.scss';

export type SocialWebsite = 'Github' | 'Gitlab' | 'LinkedIn' | 'Twitter';

export type SocialLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'aria-label' | 'children' | 'href'
> & {
  /**
   * The social link icon.
   */
  icon: SocialWebsite;
  /**
   * An accessible label for the link.
   */
  label: string;
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
export const SocialLink: FC<SocialLinkProps> = ({
  className = '',
  icon,
  label,
  url,
  ...props
}) => {
  const linkClass = `${styles.link} ${className}`;

  /**
   * Retrieve a social link icon by id.
   * @param {string} id - The social website id.
   */
  const getIcon = (id: string) => {
    switch (id) {
      case 'Github':
        return <GithubIcon aria-hidden className={styles.icon} />;
      case 'Gitlab':
        return <GitlabIcon aria-hidden className={styles.icon} />;
      case 'LinkedIn':
        return <LinkedInIcon aria-hidden className={styles.icon} />;
      case 'Twitter':
      default:
        return <TwitterIcon aria-hidden className={styles.icon} />;
    }
  };

  return (
    <a {...props} aria-label={label} className={linkClass} href={url}>
      {getIcon(icon)}
    </a>
  );
};
