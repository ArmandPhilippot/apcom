import Link from 'next/link';
import { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import styles from './buttons.module.scss';

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * The button link body.
   */
  children: ReactNode;
  /**
   * True if it is an external link. Default: false.
   */
  external?: boolean;
  /**
   * ButtonLink kind. Default: secondary.
   */
  kind?: 'primary' | 'secondary' | 'tertiary';
  /**
   * ButtonLink shape. Default: rectangle.
   */
  shape?: 'circle' | 'rectangle' | 'square';
  /**
   * Define an URL as target.
   */
  target: string;
};

/**
 * ButtonLink component
 *
 * Use a button-like link as call to action.
 */
export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  className,
  target,
  kind = 'secondary',
  shape = 'rectangle',
  external = false,
  ...props
}) => {
  const kindClass = styles[`btn--${kind}`];
  const shapeClass = styles[`btn--${shape}`];
  const btnClass = `${styles.btn} ${kindClass} ${shapeClass} ${className}`;

  return external ? (
    <a {...props} className={btnClass} href={target}>
      {children}
    </a>
  ) : (
    <Link {...props} className={btnClass} href={target}>
      {children}
    </Link>
  );
};
