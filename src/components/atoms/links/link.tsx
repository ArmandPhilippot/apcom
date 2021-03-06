import NextLink from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './link.module.scss';

export type LinkProps = {
  /**
   * The link body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the link.
   */
  className?: string;
  /**
   * True if it is a download link. Default: false.
   */
  download?: boolean;
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
  download = false,
  external = false,
  href,
  lang,
}) => {
  const downloadClass = download ? styles['link--download'] : '';

  return external ? (
    <a
      href={href}
      hrefLang={lang}
      className={`${styles.link} ${styles['link--external']} ${downloadClass} ${className}`}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href}>
      <a
        hrefLang={lang}
        className={`${styles.link} ${downloadClass} ${className}`}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
