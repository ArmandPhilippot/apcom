import Link from 'next/link';
import type { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import styles from './button-link.module.scss';

export type ButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  /**
   * The button link body.
   */
  children: ReactNode;
  /**
   * Should the link be disabled?
   *
   * Be aware, if disable the link will be replaced by a `span` element.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * True if it is an external link.
   *
   * @default false
   */
  isExternal?: boolean;
  /**
   * Define the button kind.
   *
   * @default 'secondary'
   */
  kind?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Define the button shape.
   *
   * @default 'rectangle'
   */
  shape?: 'auto' | 'circle' | 'rectangle' | 'square';
  /**
   * Define an URL or anchor as target.
   */
  to: string;
};

/**
 * ButtonLink component
 *
 * Use a button-like link as call to action.
 */
export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  className = '',
  kind = 'secondary',
  shape = 'rectangle',
  isDisabled = false,
  isExternal = false,
  rel = '',
  to,
  ...props
}) => {
  const kindClass = styles[`btn--${kind}`];
  const shapeClass = styles[`btn--${shape}`];
  const btnClass = `${styles.btn} ${kindClass} ${shapeClass} ${className}`;

  if (isDisabled)
    return (
      <span {...props} className={btnClass} data-disabled>
        {children}
      </span>
    );

  const linkRel =
    isExternal && !rel.includes('external') ? `external ${rel}` : rel;

  return isExternal ? (
    <a {...props} className={btnClass} href={to} rel={linkRel}>
      {children}
    </a>
  ) : (
    <Link {...props} className={btnClass} href={to} rel={rel}>
      {children}
    </Link>
  );
};
