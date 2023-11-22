import {
  type ForwardedRef,
  type ReactNode,
  forwardRef,
  type CSSProperties,
} from 'react';
import type { Spacing } from '../../../types';
import { List, type ListProps } from '../../atoms';
import styles from './grid.module.scss';

export type GridProps<T extends boolean> = Omit<
  ListProps<T, false>,
  'children' | 'hideMarker' | 'isHierarchical' | 'isInline' | 'spacing'
> & {
  /**
   * The grid items.
   */
  children: ReactNode;
  /**
   * Control the number of column.
   *
   * @default 'auto-fit'
   */
  col?: number | 'auto-fill' | 'auto-fit';
  /**
   * The gap between the items.
   *
   * @default null
   */
  gap?: Spacing | null;
  /**
   * Should the grid be centered?
   *
   * @default false
   */
  isCentered?: boolean;
  /**
   * Define a fixed size for each item.
   *
   * You should either use `size` or `sizeMax`/`sizeMin` not both.
   *
   * @default undefined
   */
  size?: string;
  /**
   * Define the maximal size of each item.
   *
   * You should either use `size` or `sizeMax`/`sizeMin` not both.
   *
   * @default '1fr'
   */
  sizeMax?: string;
  /**
   * Define the maximal size of each item.
   *
   * You should either use `size` or `sizeMax`/`sizeMin` not both.
   *
   * @default 0
   */
  sizeMin?: 0 | string;
};

const GridWithRef = <T extends boolean>(
  {
    children,
    className = '',
    col = 'auto-fit',
    gap,
    isCentered = false,
    size,
    sizeMax,
    sizeMin,
    style,
    ...props
  }: GridProps<T>,
  ref?: ForwardedRef<T extends true ? HTMLOListElement : HTMLUListElement>
) => {
  const gridClass = [
    styles.wrapper,
    styles[isCentered ? 'wrapper--is-centered' : ''],
    styles[size ? 'wrapper--has-fixed-size' : ''],
    styles[sizeMin ? 'wrapper--has-min-size' : ''],
    className,
  ].join(' ');
  const gridStyles = {
    ...style,
    '--col': col,
    ...(size ? { '--size': size } : {}),
    ...(sizeMax ? { '--size-max': sizeMax } : {}),
    ...(sizeMin ? { '--size-min': sizeMin } : {}),
    ...(gap ? { '--gap': `var(--spacing-${gap})` } : {}),
  } as CSSProperties;

  return (
    <List
      {...props}
      className={gridClass}
      hideMarker
      ref={ref}
      style={gridStyles}
    >
      {children}
    </List>
  );
};

export const Grid = forwardRef(GridWithRef);
