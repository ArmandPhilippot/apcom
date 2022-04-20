import { FC, ReactNode } from 'react';
import styles from './sidebar.module.scss';

export type SidebarProps = {
  /**
   * The sidebar body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the aside element.
   */
  className?: string;
};

/**
 * Sidebar component
 *
 * Render an aside element.
 */
const Sidebar: FC<SidebarProps> = ({ children, className = '' }) => {
  return <aside className={`${styles.wrapper} ${className}`}>{children}</aside>;
};

export default Sidebar;
