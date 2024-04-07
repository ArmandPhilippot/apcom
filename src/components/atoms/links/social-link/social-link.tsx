import dynamic from 'next/dynamic';
import type {
  AnchorHTMLAttributes,
  ComponentType,
  FC,
  SVGAttributes,
} from 'react';
import styles from './social-link.module.scss';

const GithubIcon: ComponentType<SVGAttributes<SVGElement>> = dynamic(
  async () => import('../../../../assets/images/social-media/github.svg')
);

const GitlabIcon: ComponentType<SVGAttributes<SVGElement>> = dynamic(
  async () => import('../../../../assets/images/social-media/gitlab.svg')
);

const LinkedInIcon: ComponentType<SVGAttributes<SVGElement>> = dynamic(
  async () => import('../../../../assets/images/social-media/linkedin.svg')
);

const TwitterIcon: ComponentType<SVGAttributes<SVGElement>> = dynamic(
  async () => import('../../../../assets/images/social-media/twitter.svg')
);

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

export type SocialWebsite = 'Github' | 'Gitlab' | 'LinkedIn' | 'Twitter';

const resolveUrl = (id: string, url: string) => {
  if (url.startsWith('http')) return url;

  switch (id) {
    case 'Github':
      return `https://github.com/${url}`;
    case 'Gitlab':
      return `https://gitlab.com/${url}`;
    case 'LinkedIn':
      return `https://www.linkedin.com/${url}`;
    case 'Twitter':
      return `https://www.twitter.com/${url}`;
    default:
      return url;
  }
};

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

  return (
    <a
      {...props}
      aria-label={label}
      className={linkClass}
      href={resolveUrl(icon, url)}
    >
      {getIcon(icon)}
    </a>
  );
};
