import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './buttons.module.scss';

export type ButtonLinkProps = {
  /**
   * ButtonLink accessible label.
   */
  'aria-label'?: string;
  /**
   * One or more ids that refer to the accessible label.
   */
  'aria-labelledby'?: string;
  /**
   * The button link body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the button link.
   */
  className?: string;
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
const ButtonLink: FC<ButtonLinkProps> = ({
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

  return external ? (
    <a
      href={target}
      className={`${styles.btn} ${kindClass} ${shapeClass} ${className}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link
      {...props}
      className={`${styles.btn} ${kindClass} ${shapeClass} ${className}`}
      href={target}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
