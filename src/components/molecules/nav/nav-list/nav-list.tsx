import { forwardRef, type ReactNode, type ForwardedRef } from 'react';
import { List, type ListProps } from '../../../atoms';

export type NavListProps<T extends boolean> = Omit<
  ListProps<T, false>,
  'children' | 'hideMarker'
> & {
  /**
   * The nav items.
   */
  children: ReactNode;
};

const NavListWithRef = <T extends boolean>(
  { children, isInline, ...props }: NavListProps<T>,
  ref: ForwardedRef<HTMLUListElement | HTMLOListElement>
) => (
  <List {...props} hideMarker isInline={isInline} ref={ref}>
    {children}
  </List>
);

export const NavList = forwardRef(NavListWithRef);
