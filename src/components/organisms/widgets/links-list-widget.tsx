import { FC } from 'react';
import { slugify } from '../../../utils/helpers';
import { Link, List, type ListItem, type ListProps } from '../../atoms';
import { Widget, type WidgetProps } from '../../molecules';
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

export type LinksListWidgetProps = Pick<WidgetProps, 'level' | 'title'> &
  Pick<ListProps, 'className' | 'kind'> & {
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
  items,
  kind = 'unordered',
  ...props
}) => {
  const listKindClass = `list--${kind}`;

  /**
   * Format the widget data to be used as List items.
   *
   * @param {LinksListItems[]} data - The widget data.
   * @returns {ListItem[]} The list items data.
   */
  const getListItems = (data: LinksListItems[]): ListItem[] => {
    return data.map((item) => {
      return {
        id: slugify(item.name),
        child: item.child && getListItems(item.child),
        value: (
          <Link href={item.url} className={styles.list__link}>
            {item.name}
          </Link>
        ),
      };
    });
  };

  return (
    <Widget
      {...props}
      className={styles.widget}
      expanded={true}
      withBorders={true}
      withScroll={true}
    >
      <List
        className={`${styles.list} ${styles[listKindClass]} ${className}`}
        items={getListItems(items)}
        itemsClassName={styles.list__item}
        kind={kind}
      />
    </Widget>
  );
};
