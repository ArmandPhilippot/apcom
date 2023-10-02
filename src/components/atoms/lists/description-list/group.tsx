import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type ForwardRefRenderFunction,
} from 'react';
import type { Spacing } from '../../../../types';
import styles from './description-list.module.scss';

export type GroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * The term(s) and description(s) of a description list.
   */
  children: ReactNode;
  /**
   * Should the term & description in the group be inlined?
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

const GroupWithRef: ForwardRefRenderFunction<HTMLDivElement, GroupProps> = (
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
  const layoutClass = styles[isInline ? 'group--inline' : 'group--stack'];
  const groupClass = `${styles.group} ${layoutClass} ${className}`;
  const groupStyles = {
    ...style,
    '--itemSpacing': itemSpacing,
  } as CSSProperties;

  return (
    <div {...props} className={groupClass} ref={ref} style={groupStyles}>
      {children}
    </div>
  );
};

/**
 * Group component.
 *
 * Use it to wrap `Description` and `Term` components in a `DescriptionList`
 * component.
 */
export const Group = forwardRef(GroupWithRef);
