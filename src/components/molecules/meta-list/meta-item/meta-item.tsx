import {
  type ForwardRefRenderFunction,
  type ReactNode,
  forwardRef,
} from 'react';
import { Description, Group, type GroupProps, Term } from '../../../atoms';
import styles from './meta-item.module.scss';

export type MetaValue = ReactNode;

export type MetaValues = {
  id: string;
  value: MetaValue;
};

export type MetaItemProps = Omit<GroupProps, 'children' | 'spacing'> & {
  /**
   * Should the values be bordered?
   *
   * @default false
   */
  hasBorderedValues?: boolean;
  /**
   * Should the values be inlined?
   *
   * @warning If you use it make sure the value is larger than the label. It
   * could mess up your design since we are removing the label width.
   *
   * @default false
   */
  hasInlinedValues?: boolean;
  /**
   * Should the label and values be centered?
   *
   * @default false
   */
  isCentered?: boolean;
  /**
   * The item label.
   */
  label: ReactNode;
  /**
   * The item value or values.
   */
  value: MetaValue | MetaValues[];
};

const MetaItemWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  MetaItemProps
> = (
  {
    className = '',
    hasBorderedValues = false,
    hasInlinedValues = false,
    isCentered = false,
    isInline = false,
    label,
    value,
    ...props
  },
  ref
) => {
  const itemClass = [
    styles.item,
    styles[hasBorderedValues ? 'item--bordered-values' : ''],
    styles[hasInlinedValues ? 'item--inlined-values' : ''],
    styles[isCentered ? 'item--centered' : ''],
    styles[isInline ? 'item--inlined' : 'item--stacked'],
    className,
  ].join(' ');

  return (
    <Group {...props} className={itemClass} isInline={isInline} ref={ref}>
      <Term className={styles.label}>{label}</Term>
      {Array.isArray(value) ? (
        value.map((item) => (
          <Description className={styles.value} key={item.id}>
            {item.value}
          </Description>
        ))
      ) : (
        <Description className={styles.value}>{value}</Description>
      )}
    </Group>
  );
};

export const MetaItem = forwardRef(MetaItemWithRef);
