import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from '../../../atoms';
import styles from './nav-link.module.scss';

export type NavLinkProps = Omit<LinkProps, 'children' | 'disableTransition'> & {
  /**
   * Should the logo and label be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * The link label.
   */
  label: string;
  /**
   * The link logo.
   */
  logo?: ReactNode;
};

const NavLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NavLinkProps
> = ({ className = '', isInline = false, label, logo, ...props }, ref) => {
  const linkClass = [
    styles.link,
    styles[isInline ? 'link--inline' : 'link--stack'],
    className,
  ].join(' ');

  return (
    <Link {...props} className={linkClass} disableTransition ref={ref}>
      {logo ? <span className={styles.logo}>{logo}</span> : null}
      {label}
    </Link>
  );
};

export const NavLink = forwardRef(NavLinkWithRef);
