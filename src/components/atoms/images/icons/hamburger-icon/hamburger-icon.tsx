import type { FC, HTMLAttributes } from 'react';
import styles from './hamburger-icon.module.scss';

export type HamburgerIconProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
>;

/**
 * HamburgerIcon component
 *
 * Render a Hamburger icon.
 */
export const HamburgerIcon: FC<HamburgerIconProps> = ({
  className = '',
  ...props
}) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <span {...props} className={wrapperClass}>
      <span className={styles.icon} />
    </span>
  );
};
