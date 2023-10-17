import type { FC, ReactElement } from 'react';
import { List, ListItem } from '../../atoms';
import type { CardProps } from '../../molecules';
import styles from './cards-list.module.scss';

export type CardsListItem = {
  /**
   * The card.
   */
  card: ReactElement<CardProps<string> | CardProps<undefined>>;
  /**
   * The card id.
   */
  id: string;
};

export type CardsListProps = {
  /**
   * Set additional classnames to the list wrapper.
   */
  className?: string;
  /**
   * Should the cards list be ordered?
   *
   * @default false
   */
  isOrdered?: boolean;
  /**
   * The cards data.
   */
  items: CardsListItem[];
};

/**
 * CardsList component
 *
 * Return a list of Card components.
 */
export const CardsList: FC<CardsListProps> = ({
  className = '',
  isOrdered = false,
  items,
}) => {
  const kindModifier = `wrapper--${isOrdered ? 'ordered' : 'unordered'}`;

  return (
    <List
      className={`${styles.wrapper} ${styles[kindModifier]} ${className}`}
      hideMarker
      isInline
      isOrdered={isOrdered}
    >
      {items.map(({ id, card }) => (
        <ListItem className={styles.item} key={id}>
          {card}
        </ListItem>
      ))}
    </List>
  );
};
