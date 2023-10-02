import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type ForwardRefRenderFunction,
} from 'react';
import type { Spacing } from '../../../../types';
import styles from './description-list.module.scss';

export type DescriptionListProps = Omit<
  HTMLAttributes<HTMLDListElement>,
  'children'
> & {
  /**
   * The list items or groups.
   */
  children: ReactNode;
  /**
   * Should the list be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * Define the spacing between list items.
   *
   * @default null
   */
  spacing?: Spacing | null;
};

const DescriptionListWithRef: ForwardRefRenderFunction<
  HTMLDListElement,
  DescriptionListProps
> = (
  {
    children,
    className = '',
    isInline = false,
    spacing = null,
    style,
    ...props
  },
  ref
) => {
  const itemSpacing = spacing === null ? 0 : `var(--spacing-${spacing})`;
  const layoutClass = styles[isInline ? 'list--inline' : 'list--stack'];
  const listClass = `${styles.list} ${layoutClass} ${className}`;
  const listStyles = {
    ...style,
    '--itemSpacing': itemSpacing,
  } as CSSProperties;

  return (
    <dl {...props} className={listClass} ref={ref} style={listStyles}>
      {children}
    </dl>
  );
};

/**
 * DescriptionList component
 *
 * Render a description list.
 */
export const DescriptionList = forwardRef(DescriptionListWithRef);
