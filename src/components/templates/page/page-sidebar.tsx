import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Aside, type AsideProps } from '../../atoms';
import styles from './page.module.scss';

export type PageSidebarProps = AsideProps;

const PageSidebarWithRef: ForwardRefRenderFunction<
  HTMLElement,
  PageSidebarProps
> = ({ children, className = '', ...props }, ref) => {
  const sidebarClass = `${styles.sidebar} ${className}`;

  return (
    <Aside {...props} className={sidebarClass} ref={ref}>
      <div className={styles.sidebar__body}>{children}</div>
    </Aside>
  );
};

export const PageSidebar = forwardRef(PageSidebarWithRef);
