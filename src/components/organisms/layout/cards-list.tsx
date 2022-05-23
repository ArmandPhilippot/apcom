import List, {
  type ListItem,
  type ListProps,
} from '@components/atoms/lists/list';
import Card, { type CardProps } from '@components/molecules/layout/card';
import { FC } from 'react';
import styles from './cards-list.module.scss';

export type CardsListItem = Omit<
  CardProps,
  'className' | 'coverFit' | 'titleLevel'
> & {
  /**
   * The card id.
   */
  id: string;
};

export type CardsListProps = Pick<CardProps, 'coverFit' | 'titleLevel'> &
  Pick<ListProps, 'kind'> & {
    /**
     * Set additional classnames to the list wrapper.
     */
    className?: string;
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
const CardsList: FC<CardsListProps> = ({
  className = '',
  coverFit,
  items,
  kind = 'unordered',
  titleLevel,
}) => {
  const kindModifier = `wrapper--${kind}`;

  /**
   * Format the cards data to be used by the List component.
   *
   * @param {CardsListItem[]} cards - An array of card data.
   * @returns {ListItem[]} The formatted cards data.
   */
  const getCards = (cards: CardsListItem[]): ListItem[] => {
    return cards.map(({ id, ...card }) => {
      return {
        id,
        value: (
          <Card
            key={id}
            coverFit={coverFit}
            titleLevel={titleLevel}
            className={styles.card}
            {...card}
          />
        ),
      };
    });
  };

  return (
    <List
      kind="flex"
      items={getCards(items)}
      className={`${styles.wrapper} ${styles[kindModifier]} ${className}`}
    />
  );
};

export default CardsList;
