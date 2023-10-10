import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { DescriptionList, type DescriptionListProps } from '../../atoms';
import { MetaItem, type MetaItemProps } from './meta-item';
import styles from './meta-list.module.scss';

export type MetaItemData = Pick<
  MetaItemProps,
  | 'hasBorderedValues'
  | 'hasInlinedValues'
  | 'isCentered'
  | 'isInline'
  | 'label'
  | 'value'
> & {
  id: string;
};

export type MetaListProps = Omit<DescriptionListProps, 'children' | 'spacing'> &
  Pick<MetaItemProps, 'hasBorderedValues' | 'hasInlinedValues'> & {
    /**
     * Should the items be inlined?
     *
     * @default false
     */
    hasInlinedItems?: boolean;
    /**
     * Should the meta be centered?
     *
     * @default false
     */
    isCentered?: boolean;
    /**
     * The meta items.
     */
    items: MetaItemData[];
  };

const MetaListWithRef: ForwardRefRenderFunction<
  HTMLDListElement,
  MetaListProps
> = (
  {
    className = '',
    hasBorderedValues = false,
    hasInlinedItems = false,
    hasInlinedValues = false,
    isCentered = false,
    isInline = false,
    items,
    ...props
  },
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
      {items.map(({ id, ...item }) => (
        <MetaItem
          hasBorderedValues={hasBorderedValues}
          hasInlinedValues={hasInlinedValues}
          isCentered={isCentered}
          isInline={hasInlinedItems}
          // Each item should be able to override the global settings.
          {...item}
          key={id}
        />
      ))}
    </DescriptionList>
  );
};

export const MetaList = forwardRef(MetaListWithRef);
