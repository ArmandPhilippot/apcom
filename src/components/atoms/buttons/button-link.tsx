import Link from 'next/link';
import { FC } from 'react';
import styles from './buttons.module.scss';

type ButtonLinkProps = {
  /**
   * ButtonLink accessible label.
   */
  'aria-label'?: string;
  /**
   * True if it is an external link. Default: false.
   */
  external?: boolean;
  /**
   * ButtonLink kind. Default: secondary.
   */
  kind?: 'primary' | 'secondary';
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
  target,
  kind = 'secondary',
  external = false,
  ...props
}) => {
  const kindClass = styles[`btn--${kind}`];

  return external ? (
    <a href={target} className={`${styles.btn} ${kindClass}`} {...props}>
      {children}
    </a>
  ) : (
    <Link href={target} {...props}>
      <a className={`${styles.btn} ${kindClass}`}>{children}</a>
    </Link>
  );
};

export default ButtonLink;
