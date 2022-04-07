import { FC } from 'react';
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
   * Set additional classes to the list wrapper.
   */
  classes?: string;
  /**
   * The list items.
   */
  items: DescriptionListItem[];
};

/**
 * DescriptionList component
 *
 * Render a description list.
 */
const DescriptionList: FC<DescriptionListProps> = ({ classes = '', items }) => {
  /**
   * Retrieve the description list items wrapped in a div element.
   *
   * @param {DescriptionListItem[]} listItems - An array of term and description couples.
   * @returns {JSX.Element[]} The description list items.
   */
  const getItems = (listItems: DescriptionListItem[]): JSX.Element[] => {
    return listItems.map(({ id, term, value }) => {
      return (
        <div key={id} className={styles.list__item}>
          <dt className={styles.list__term}>{term}</dt>
          {value.map((currentValue, index) => (
            <dd key={`${id}-${index}`} className={styles.list__description}>
              {currentValue}
            </dd>
          ))}
        </div>
      );
    });
  };

  return <dl className={`${styles.list} ${classes}`}>{getItems(items)}</dl>;
};

export default DescriptionList;
