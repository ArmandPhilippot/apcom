import NextLink from 'next/link';
import { FC } from 'react';
import styles from './link.module.scss';

type LinkProps = {
  /**
   * Set additional classes to the link.
   */
  classes?: string;
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
  classes,
  href,
  lang,
  external = false,
}) => {
  const additionalClasses = classes || '';

  return external ? (
    <a
      href={href}
      hrefLang={lang}
      className={`${styles.link} ${styles['link--external']} ${additionalClasses}`}
    >
      {children}
    </a>
  ) : (
    <NextLink href={href}>
      <a className={`${styles.link} ${additionalClasses}`}>{children}</a>
    </NextLink>
  );
};

export default Link;
