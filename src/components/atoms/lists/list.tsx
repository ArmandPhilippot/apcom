import { VFC } from 'react';
import styles from './list.module.scss';

export type ListItem = {
  /**
   * Nested list.
   */
  child?: ListItem[];
  /**
   * Item id.
   */
  id: string;
  /**
   * Item value.
   */
  value: any;
};

export type ListProps = {
  /**
   * Set additional classnames to the list wrapper
   */
  className?: string;
  /**
   * An array of list items.
   */
  items: ListItem[];
  /**
   * The list kind (ordered or unordered).
   */
  kind?: 'ordered' | 'unordered';
};

/**
 * List component
 *
 * Render either an ordered or an unordered list.
 */
const List: VFC<ListProps> = ({ className, items, kind = 'unordered' }) => {
  const ListTag = kind === 'ordered' ? 'ol' : 'ul';
  const kindClass = `list--${kind}`;

  /**
   * Retrieve the list items.
   * @param array - An array of items.
   * @returns {JSX.Element[]} - An array of li elements.
   */
  const getItems = (array: ListItem[]): JSX.Element[] => {
    return array.map(({ child, id, value }) => (
      <li key={id} className={styles.list__item}>
        {value}
        {child && (
          <ListTag
            className={`${styles.list} ${styles[kindClass]} ${className}`}
          >
            {getItems(child)}
          </ListTag>
        )}
      </li>
    ));
  };

  return (
    <ListTag className={`${styles.list} ${styles[kindClass]} ${className}`}>
      {getItems(items)}
    </ListTag>
  );
};

export default List;
