import {
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactNode,
} from 'react';
import { DescriptionList, type DescriptionListProps } from '../../atoms';
import styles from './meta-list.module.scss';

export type MetaListProps = Omit<
  DescriptionListProps,
  'children' | 'spacing'
> & {
  /**
   * The meta items.
   */
  children: ReactNode;
  /**
   * Should the meta be centered?
   *
   * @default false
   */
  isCentered?: boolean;
};

const MetaListWithRef: ForwardRefRenderFunction<
  HTMLDListElement,
  MetaListProps
> = (
  { children, className = '', isCentered = false, isInline = false, ...props },
  ref
) => {
  const listClass = [
    styles.list,
    styles[isCentered ? 'list--centered' : ''],
    styles[isInline ? 'list--inlined' : 'list--stacked'],
    className,
  ].join(' ');

  return (
    <DescriptionList {...props} className={listClass} ref={ref}>
      {children}
    </DescriptionList>
  );
};

export const MetaList = forwardRef(MetaListWithRef);
