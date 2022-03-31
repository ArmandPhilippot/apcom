import NextLink from 'next/link';
import { FC } from 'react';
import styles from './link.module.scss';

type LinkProps = {
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
const Link: FC<LinkProps> = ({ children, href, lang, external = false }) => {
  return external ? (
    <a
      href={href}
      hrefLang={lang}
      className={`${styles.link} ${styles['link--external']}`}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href}>
      <a className={styles.link}>{children}</a>
    </NextLink>
  );
};

export default Link;
