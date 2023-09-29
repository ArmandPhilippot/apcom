import type { FC, LiHTMLAttributes } from 'react';
import styles from './list.module.scss';

export type ListItemProps = LiHTMLAttributes<HTMLElement>;

/**
 * ListItem component
 *
 * Used it inside a `<List />` component.
 */
export const ListItem: FC<ListItemProps> = ({
  children,
  className = '',
  ...props
}) => {
  const itemClass = `${styles.item} ${className}`;

  return (
    <li {...props} className={itemClass}>
      {children}
    </li>
  );
};
