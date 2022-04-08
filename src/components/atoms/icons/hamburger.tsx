import { FC } from 'react';
import styles from './hamburger.module.scss';

type HamburgerProps = {
  /**
   * Set additional classnames to the icon.
   */
  className?: string;
  /**
   * Transform hamburger to a close icon when active.
   */
  isActive: boolean;
};

/**
 * Hamburger component
 *
 * Render a Hamburger icon.
 */
const Hamburger: FC<HamburgerProps> = ({ className = '', isActive }) => {
  const stateClass = isActive ? `${styles['icon--active']}` : '';
  const iconClasses = `${styles.icon} ${stateClass} ${className}`;

  return <span className={iconClasses}></span>;
};

export default Hamburger;
