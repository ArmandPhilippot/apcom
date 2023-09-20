import { FC } from 'react';
import styles from './hamburger.module.scss';

export type HamburgerProps = {
  /**
   * Set additional classnames to the icon wrapper.
   */
  className?: string;
  /**
   * Set additional classnames to the icon.
   */
  iconClassName?: string;
};

/**
 * Hamburger component
 *
 * Render a Hamburger icon.
 */
export const Hamburger: FC<HamburgerProps> = ({
  className = '',
  iconClassName = '',
}) => {
  return (
    <span className={`${styles.wrapper} ${className}`}>
      <span className={`${styles.icon} ${iconClassName}`}></span>
    </span>
  );
};
