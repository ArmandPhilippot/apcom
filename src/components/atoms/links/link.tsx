import NextLink from 'next/link';
import { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import styles from './link.module.scss';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * The link body.
   */
  children: ReactNode;
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
export const Link: FC<LinkProps> = ({
  children,
  className = '',
  download = false,
  external = false,
  href,
  lang,
  ...props
}) => {
  const downloadClass = download ? styles['link--download'] : '';
  const linkClass = `${styles.link} ${downloadClass} ${className}`;
  const externalLinkClass = `${linkClass} ${styles['link--external']}`;

  return external ? (
    <a {...props} className={externalLinkClass} href={href} hrefLang={lang}>
      {children}
    </a>
  ) : (
    <NextLink {...props} className={linkClass} href={href} hrefLang={lang}>
      {children}
    </NextLink>
  );
};
