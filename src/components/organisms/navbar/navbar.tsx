import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { List, type ListProps } from '../../atoms';
import styles from './navbar.module.scss';

export type NavbarProps = Omit<
  ListProps<false, false>,
  'children' | 'hideMarker' | 'isHierarchical' | 'isInline' | 'isOrdered'
> & {
  /**
   * The navbar items.
   *
   * The number of items should not exceed 3 because of the modal position on
   * small screens.
   */
  children: ReactNode;
};

const NavbarWithRef: ForwardRefRenderFunction<HTMLUListElement, NavbarProps> = (
  { children, className = '', ...props },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <List {...props} className={wrapperClass} hideMarker isInline ref={ref}>
      {children}
    </List>
  );
};

/**
 * Navbar component
 *
 * Render the website navbar.
 */
export const Navbar = forwardRef(NavbarWithRef);
