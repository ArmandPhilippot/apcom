import { FC, ReactNode } from 'react';
import styles from './sidebar.module.scss';

export type SidebarProps = {
  /**
   * An accessible name for the sidebar.
   */
  'aria-label'?: string;
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
const Sidebar: FC<SidebarProps> = ({ children, className = '', ...props }) => {
  return (
    <aside className={`${styles.wrapper} ${className}`} {...props}>
      <div className={styles.body}>{children}</div>
    </aside>
  );
};

export default Sidebar;
