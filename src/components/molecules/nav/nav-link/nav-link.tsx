import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { Link, type LinkProps } from '../../../atoms';
import styles from './nav-link.module.scss';

export type NavLinkProps = Omit<LinkProps, 'children' | 'disableTransition'> & {
  /**
   * Should the logo be above the label?
   *
   * @default false
   */
  isStack?: boolean;
  /**
   * The link label.
   */
  label: ReactNode;
  /**
   * The link logo.
   */
  logo?: ReactNode;
  /**
   * The link variant.
   *
   * @default 'regular'
   */
  variant?: 'block' | 'main' | 'regular';
};

const NavLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  NavLinkProps
> = (
  {
    className = '',
    isStack = false,
    label,
    logo,
    variant = 'regular',
    ...props
  },
  ref
) => {
  const linkClass = [
    styles.link,
    styles[`link--${variant}`],
    styles[isStack ? 'link--stack' : 'link--inline'],
    className,
  ].join(' ');

  return (
    <Link
      {...props}
      className={linkClass}
      disableTransition={variant === 'main'}
      ref={ref}
    >
      {logo ? <span className={styles.logo}>{logo}</span> : null}
      {label}
    </Link>
  );
};

export const NavLink = forwardRef(NavLinkWithRef);
