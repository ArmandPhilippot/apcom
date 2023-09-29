import type { FC } from 'react';
import { List, ListItem } from '../../atoms';
import { Card, type CardProps } from '../../molecules';
import styles from './cards-list.module.scss';

export type CardsListItem = Omit<CardProps, 'className' | 'titleLevel'> & {
  /**
   * The card id.
   */
  id: string;
};

export type CardsListProps = Pick<CardProps, 'titleLevel'> & {
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
  titleLevel,
}) => {
  const kindModifier = `wrapper--${isOrdered ? 'ordered' : 'unordered'}`;

  return (
    <List
      className={`${styles.wrapper} ${styles[kindModifier]} ${className}`}
      hideMarker
      isInline
      isOrdered={isOrdered}
    >
      {items.map(({ id, ...item }) => (
        <ListItem key={id}>
          <Card
            {...item}
            className={styles.card}
            key={id}
            id={id}
            titleLevel={titleLevel}
          />
        </ListItem>
      ))}
    </List>
  );
};
