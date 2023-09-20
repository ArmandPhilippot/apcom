import { FC, HTMLAttributes } from 'react';
import {
  DescriptionListGroup,
  type DescriptionListGroupProps,
} from './description-list-group';
import styles from './description-list.module.scss';

export type DescriptionListItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The list item layout.
   */
  layout?: DescriptionListGroupProps['layout'];
  /**
   * A list label.
   */
  label: DescriptionListGroupProps['label'];
  /**
   * An array of values for the list item.
   */
  value: DescriptionListGroupProps['value'];
};

export type DescriptionListProps = Omit<
  HTMLAttributes<HTMLDListElement>,
  'children'
> & {
  /**
   * Set additional classnames to the `dt`/`dd` couple wrapper.
   */
  groupClassName?: string;
  /**
   * The list items.
   */
  items: DescriptionListItem[];
  /**
   * Set additional classnames to the `dt` element.
   */
  labelClassName?: string;
  /**
   * The list layout. Default: column.
   */
  layout?: 'inline' | 'column';
  /**
   * Set additional classnames to the `dd` element.
   */
  valueClassName?: string;
  /**
   * If true, use a slash to delimitate multiple values.
   */
  withSeparator?: DescriptionListGroupProps['withSeparator'];
};

/**
 * DescriptionList component
 *
 * Render a description list.
 */
export const DescriptionList: FC<DescriptionListProps> = ({
  className = '',
  groupClassName = '',
  items,
  labelClassName = '',
  layout = 'column',
  valueClassName = '',
  withSeparator,
  ...props
}) => {
  const layoutModifier = `list--${layout}`;
  const listClass = `${styles.list} ${styles[layoutModifier]} ${className}`;

  /**
   * Retrieve the description list items.
   *
   * @param {DescriptionListGroup[]} listItems - An array of items.
   * @returns {JSX.Element[]} The description list items.
   */
  const getItems = (listItems: DescriptionListItem[]): JSX.Element[] => {
    return listItems.map(({ id, layout: itemLayout, label, value }) => {
      return (
        <DescriptionListGroup
          key={id}
          label={label}
          value={value}
          layout={itemLayout}
          className={groupClassName}
          descriptionClassName={valueClassName}
          termClassName={labelClassName}
          withSeparator={withSeparator}
        />
      );
    });
  };

  return (
    <dl {...props} className={listClass}>
      {getItems(items)}
    </dl>
  );
};
