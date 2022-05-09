import { FC } from 'react';
import DescriptionListItem, {
  type DescriptionListItemProps,
} from './description-list-item';
import styles from './description-list.module.scss';

export type DescriptionListItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The list item layout.
   */
  layout?: DescriptionListItemProps['layout'];
  /**
   * A list label.
   */
  label: DescriptionListItemProps['label'];
  /**
   * An array of values for the list item.
   */
  value: DescriptionListItemProps['value'];
};

export type DescriptionListProps = {
  /**
   * Set additional classnames to the list wrapper.
   */
  className?: string;
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
  withSeparator?: DescriptionListItemProps['withSeparator'];
};

/**
 * DescriptionList component
 *
 * Render a description list.
 */
const DescriptionList: FC<DescriptionListProps> = ({
  className = '',
  groupClassName = '',
  items,
  labelClassName = '',
  layout = 'column',
  valueClassName = '',
  withSeparator,
}) => {
  const layoutModifier = `list--${layout}`;

  /**
   * Retrieve the description list items.
   *
   * @param {DescriptionListItem[]} listItems - An array of items.
   * @returns {JSX.Element[]} The description list items.
   */
  const getItems = (listItems: DescriptionListItem[]): JSX.Element[] => {
    return listItems.map(({ id, layout: itemLayout, label, value }) => {
      return (
        <DescriptionListItem
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
    <dl className={`${styles.list} ${styles[layoutModifier]} ${className}`}>
      {getItems(items)}
    </dl>
  );
};

export default DescriptionList;
