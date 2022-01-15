import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import styles from './Sidebar.module.scss';

type SidebarPosition = 'left' | 'right';

const Sidebar = ({
  children,
  position,
  title,
}: {
  children: ReactNode;
  position: SidebarPosition;
  title?: string;
}) => {
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { titleLevel: title ? 3 : 2 });
    }
    return child;
  });

  const positionClass = `wrapper--${position}`;

  return (
    <aside className={`${styles.wrapper} ${styles[positionClass]}`}>
      <div className={styles.body}>
        {title && <h2>{title}</h2>}
        {childrenWithProps}
      </div>
    </aside>
  );
};

export default Sidebar;
