import NextLink from 'next/link';
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ForwardRefRenderFunction,
  type ReactNode,
} from 'react';
import styles from './link.module.scss';

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'download' | 'hrefLang' | 'lang'
> & {
  /**
   * The link body.
   */
  children: ReactNode;
  /**
   * Should we disable the default transition on links?
   *
   * @default false
   */
  disableTransition?: boolean;
  /**
   * True if it is a download link.
   *
   * @default false
   */
  isDownload?: boolean;
  /**
   * True if it is an external link.
   *
   * @default false
   */
  isExternal?: boolean;
  /**
   * The link target.
   */
  href: string;
  /**
   * The link target code language.
   */
  lang?: string;
};

const LinkWithRef: ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
  {
    children,
    className = '',
    disableTransition = false,
    isDownload = false,
    isExternal = false,
    href,
    lang,
    rel = '',
    ...props
  },
  ref
) => {
  const LinkComponent = isExternal ? 'a' : NextLink;
  const linkClass = [
    styles.link,
    styles[disableTransition ? '' : 'link--regular'],
    styles[isDownload ? 'link--download' : ''],
    styles[isExternal ? 'link--external' : ''],
    className,
  ].join(' ');
  const linkRel =
    isExternal && !rel.includes('external') ? `external ${rel}` : rel;

  return (
    <LinkComponent
      {...props}
      className={linkClass}
      href={href}
      hrefLang={lang}
      ref={ref}
      rel={linkRel}
    >
      {children}
    </LinkComponent>
  );
};

/**
 * Link Component
 *
 * Render a link.
 */
export const Link = forwardRef(LinkWithRef);
