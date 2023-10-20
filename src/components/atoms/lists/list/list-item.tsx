import {
  forwardRef,
  type LiHTMLAttributes,
  type ForwardRefRenderFunction,
} from 'react';
import styles from './list.module.scss';

export type ListItemProps = LiHTMLAttributes<HTMLElement> & {
  /**
   * Should we hide the marker in front of the list item?
   *
   * @default false
   */
  hideMarker?: boolean;
};

const ListItemWithRef: ForwardRefRenderFunction<
  HTMLLIElement,
  ListItemProps
> = ({ children, className = '', hideMarker = false, ...props }, ref) => {
  const itemClass = [
    styles.item,
    styles[hideMarker ? 'item--no-marker' : ''],
    className,
  ].join(' ');

  return (
    <li {...props} className={itemClass} ref={ref}>
      {children}
    </li>
  );
};

/**
 * ListItem component
 *
 * Used it inside a `<List />` component.
 */
export const ListItem = forwardRef(ListItemWithRef);
