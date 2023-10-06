import type { FC } from 'react';
import { slugify } from '../../../utils/helpers';
import { Link, List, ListItem } from '../../atoms';
import { Collapsible, type CollapsibleProps } from '../../molecules';
import styles from './links-list-widget.module.scss';

export type LinksListItems = {
  /**
   * An array of name/url couple child of this list item.
   */
  child?: LinksListItems[];
  /**
   * The item name.
   */
  name: string;
  /**
   * The item url.
   */
  url: string;
};

export type LinksListWidgetProps = Omit<
  CollapsibleProps,
  'children' | 'disablePadding' | 'hasBorders'
> & {
  className?: string;
  /**
   * Should the links be ordered?
   *
   * @default false
   */
  isOrdered?: boolean;
  /**
   * An array of name/url couple.
   */
  items: LinksListItems[];
};

/**
 * LinksListWidget component
 *
 * Render a list of links inside a widget.
 */
export const LinksListWidget: FC<LinksListWidgetProps> = ({
  className = '',
  isOrdered = false,
  items,
  ...props
}) => {
  const listKindClass = `list--${isOrdered ? 'ordered' : 'unordered'}`;

  /**
   * Format the widget data to be used as List items.
   *
   * @param {LinksListItems[]} data - The widget data.
   * @returns {ListItem[]} The list items data.
   */
  const getListItems = (data: LinksListItems[]) =>
    data.map((item) => (
      <ListItem className={styles.list__item} key={slugify(item.name)}>
        <Link className={styles.list__link} href={item.url}>
          {item.name}
        </Link>
        {item.child?.length ? (
          <List
            className={`${styles.list} ${styles[listKindClass]} ${className}`}
            hideMarker
            isOrdered={isOrdered}
          >
            {getListItems(item.child)}
          </List>
        ) : null}
      </ListItem>
    ));

  return (
    <Collapsible {...props} className={styles.widget} disablePadding hasBorders>
      <List
        className={`${styles.list} ${styles[listKindClass]} ${className}`}
        hideMarker
        isOrdered={isOrdered}
      >
        {getListItems(items)}
      </List>
    </Collapsible>
  );
};
