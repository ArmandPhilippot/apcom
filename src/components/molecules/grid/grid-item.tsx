import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { ListItem, type ListItemProps } from '../../atoms';

export type GridItemProps = ListItemProps;

const GridItemWithRef: ForwardRefRenderFunction<
  HTMLLIElement,
  GridItemProps
> = ({ children, ...props }, ref) => (
  <ListItem {...props} ref={ref}>
    {children}
  </ListItem>
);

export const GridItem = forwardRef(GridItemWithRef);
