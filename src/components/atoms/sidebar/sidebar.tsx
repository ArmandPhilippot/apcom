import type { FC } from 'react';
import { Aside, type AsideProps } from '../layout';
import styles from './sidebar.module.scss';

export type SidebarProps = AsideProps;

/**
 * Sidebar component
 */
export const Sidebar: FC<SidebarProps> = ({
  children,
  className = '',
  ...props
}) => {
  const sidebarClass = `${styles.wrapper} ${className}`;

  return (
    <Aside {...props} className={sidebarClass}>
      <div className={styles.body}>{children}</div>
    </Aside>
  );
};
