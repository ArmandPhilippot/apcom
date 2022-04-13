import { VFC } from 'react';
import styles from './description-list.module.scss';

export type DescriptionListItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * A list term.
   */
  term: string;
  /**
   * An array of values for the list term.
   */
  value: any[];
};

export type DescriptionListProps = {
  /**
   * Set additional classnames to the list wrapper.
   */
  className?: string;
  /**
   * Set additional classnames to the `dd` element.
   */
  descriptionClassName?: string;
  /**
   * Set additional classnames to the `dt`/`dd` couple wrapper.
   */
  groupClassName?: string;
  /**
   * The list items.
   */
  items: DescriptionListItem[];
  /**
   * The list items layout. Default: column.
   */
  layout?: 'inline' | 'column';
  /**
   * Define if the layout should automatically create rows/columns.
   */
  responsiveLayout?: boolean;
  /**
   * Set additional classnames to the `dt` element.
   */
  termClassName?: string;
};

/**
 * DescriptionList component
 *
 * Render a description list.
 */
const DescriptionList: VFC<DescriptionListProps> = ({
  className = '',
  descriptionClassName = '',
  groupClassName = '',
  items,
  layout = 'column',
  responsiveLayout = false,
  termClassName = '',
}) => {
  const layoutModifier = `list--${layout}`;
  const responsiveModifier = responsiveLayout ? 'list--responsive' : '';

  /**
   * Retrieve the description list items wrapped in a div element.
   *
   * @param {DescriptionListItem[]} listItems - An array of term and description couples.
   * @returns {JSX.Element[]} The description list items.
   */
  const getItems = (listItems: DescriptionListItem[]): JSX.Element[] => {
    return listItems.map(({ id, term, value }) => {
      return (
        <div key={id} className={`${styles.list__item} ${groupClassName}`}>
          <dt className={`${styles.list__term} ${termClassName}`}>{term}</dt>
          {value.map((currentValue, index) => (
            <dd
              key={`${id}-${index}`}
              className={`${styles.list__description} ${descriptionClassName}`}
            >
              {currentValue}
            </dd>
          ))}
        </div>
      );
    });
  };

  return (
    <dl
      className={`${styles.list} ${styles[layoutModifier]} ${styles[responsiveModifier]} ${className}`}
    >
      {getItems(items)}
    </dl>
  );
};

export default DescriptionList;
