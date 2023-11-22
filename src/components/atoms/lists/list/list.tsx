import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type OlHTMLAttributes,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import type { Spacing } from '../../../../types';
import styles from './list.module.scss';

type OrderedListProps = Omit<OlHTMLAttributes<HTMLOListElement>, 'children'>;

type UnorderedListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'>;

type BaseListProps<O extends boolean, H extends boolean> = O extends true
  ? OrderedListProps
  : H extends true
    ? OrderedListProps
    : UnorderedListProps;

type AdditionalProps<O extends boolean, H extends boolean> = {
  /**
   * The list items.
   */
  children?: ReactNode;
  /**
   * Should the items marker be hidden?
   *
   * @default false
   */
  hideMarker?: boolean;
  /**
   * Should the list be ordered and hierarchical?
   *
   * @default false
   */
  isHierarchical?: H;
  /**
   * Should the list be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * Should the list be ordered?
   *
   * @default false
   */
  isOrdered?: O;
  /**
   * Define the spacing between list items.
   *
   * @default null
   */
  spacing?: Spacing | null;
};

type BuildClassNameConfig<O extends boolean, H extends boolean> = Pick<
  BaseListProps<O, H>,
  'className'
> &
  Pick<
    AdditionalProps<O, H>,
    'hideMarker' | 'isHierarchical' | 'isInline' | 'isOrdered'
  >;

const buildClassName = <O extends boolean, H extends boolean>({
  className = '',
  hideMarker,
  isHierarchical,
  isInline,
  isOrdered,
}: BuildClassNameConfig<O, H>) => {
  const orderedClassName = isHierarchical
    ? 'list--hierarchical'
    : 'list--ordered';
  const classNames: string[] = [
    isHierarchical || isOrdered ? orderedClassName : 'list--unordered',
    isInline ? 'list--inline' : 'list--stack',
    hideMarker ? 'list--no-marker' : 'list--has-marker',
    className,
  ].map((key) => styles[key]);

  if (className) classNames.push(className);

  return classNames.join(' ');
};

export type ListProps<O extends boolean, H extends boolean> = BaseListProps<
  O,
  H
> &
  AdditionalProps<O, H>;

const ListWithRef = <O extends boolean, H extends boolean>(
  {
    className,
    children,
    hideMarker = false,
    isHierarchical,
    isInline = false,
    isOrdered,
    spacing = null,
    style,
    ...props
  }: ListProps<O, H>,
  ref: ForwardedRef<
    O extends true
      ? HTMLOListElement
      : H extends true
        ? HTMLOListElement
        : HTMLUListElement
  >
) => {
  const itemSpacing = spacing === null ? 0 : `var(--spacing-${spacing})`;
  const listClass = buildClassName({
    className,
    hideMarker,
    isHierarchical,
    isInline,
    isOrdered,
  });
  const listStyles = {
    ...style,
    '--itemSpacing': itemSpacing,
  } as CSSProperties;

  return isHierarchical || isOrdered ? (
    <ol
      {...props}
      className={listClass}
      ref={ref as ForwardedRef<HTMLOListElement>}
      style={listStyles}
    >
      {children}
    </ol>
  ) : (
    <ul {...props} className={listClass} ref={ref} style={listStyles}>
      {children}
    </ul>
  );
};

/**
 * List component
 *
 * Render either an ordered or an unordered list.
 */
export const List = forwardRef(ListWithRef);
