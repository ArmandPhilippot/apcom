import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { ListItem, type ListItemProps } from '../../../atoms';

export type NavItemProps = Omit<ListItemProps, 'children' | 'hideMarker'> & {
  /**
   * The nav item contents.
   */
  children: ReactNode;
};

const NavItemWithRef: ForwardRefRenderFunction<HTMLLIElement, NavItemProps> = (
  { children, ...props },
  ref
) => (
  <ListItem {...props} hideMarker ref={ref}>
    {children}
  </ListItem>
);

export const NavItem = forwardRef(NavItemWithRef);
