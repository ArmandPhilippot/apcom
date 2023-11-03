import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { List, type ListProps } from '../../atoms';
import { NavbarItem, type NavbarItemProps } from './navbar-item';
import styles from './navbar.module.scss';

export type NavbarItemData = Pick<
  NavbarItemProps,
  | 'icon'
  | 'id'
  | 'isActive'
  | 'label'
  | 'modalHeading'
  | 'modalVisibleFrom'
  | 'onDeactivate'
  | 'onToggle'
  | 'showIconOnModal'
> & {
  contents: ReactNode;
};

export type NavbarItems = [NavbarItemData, NavbarItemData?, NavbarItemData?];

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
  items: NavbarItems;
};

const NavbarWithRef: ForwardRefRenderFunction<HTMLUListElement, NavbarProps> = (
  { className = '', items, ...props },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const navItems = items.filter(
    (item): item is NavbarItemData => item !== undefined
  );

  return (
    <List {...props} className={wrapperClass} hideMarker isInline ref={ref}>
      {navItems.map(({ contents, ...item }) => (
        <NavbarItem {...item} className={styles.item} key={item.id}>
          {contents}
        </NavbarItem>
      ))}
    </List>
  );
};

/**
 * Navbar component
 *
 * Render the website navbar.
 */
export const Navbar = forwardRef(NavbarWithRef);
