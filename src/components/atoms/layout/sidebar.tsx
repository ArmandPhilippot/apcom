import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './sidebar.module.scss';

export type SidebarProps = HTMLAttributes<HTMLElement> & {
  /**
   * The sidebar body.
   */
  children: ReactNode;
};

/**
 * Sidebar component
 *
 * Render an aside element.
 */
export const Sidebar: FC<SidebarProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <aside {...props} className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>{children}</div>
    </aside>
  );
};
