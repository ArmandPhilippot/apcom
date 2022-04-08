import NextLink from 'next/link';
import { FC } from 'react';
import styles from './link.module.scss';

export type LinkProps = {
  /**
   * Set additional classnames to the link.
   */
  className?: string;
  /**
   * True if it is an external link. Default: false.
   */
  external?: boolean;
  /**
   * The link target.
   */
  href: string;
  /**
   * The link target code language.
   */
  lang?: string;
};

/**
 * Link Component
 *
 * Render a link.
 */
const Link: FC<LinkProps> = ({
  children,
  className = '',
  href,
  lang,
  external = false,
}) => {
  return external ? (
    <a
      href={href}
      hrefLang={lang}
      className={`${styles.link} ${styles['link--external']} ${className}`}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href}>
      <a className={`${styles.link} ${className}`}>{children}</a>
    </NextLink>
  );
};

export default Link;
