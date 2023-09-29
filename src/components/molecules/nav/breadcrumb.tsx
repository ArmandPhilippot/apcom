import Script from 'next/script';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import type {
  BreadcrumbList,
  ListItem as ListItemType,
  WithContext,
} from 'schema-dts';
import { settings } from '../../../utils/config';
import { Link, List, ListItem } from '../../atoms';
import styles from './breadcrumb.module.scss';

export type BreadcrumbItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The item URL.
   */
  url: string;
  /**
   * The item name.
   */
  name: string;
};

export type BreadcrumbProps = {
  /**
   * Set additional classnames to the nav element.
   */
  className?: string;
  /**
   * Set additional classnames to the breadcrumb items.
   */
  itemClassName?: string;
  /**
   * The breadcrumb items
   */
  items: BreadcrumbItem[];
};

/**
 * Breadcrumb component
 *
 * Render a breadcrumb navigation.
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  itemClassName = '',
  items,
  ...props
}) => {
  const intl = useIntl();

  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Breadcrumb',
    description: 'Breadcrumb: an accessible name for the breadcrumb nav.',
    id: '28nnDY',
  });

  /**
   * Retrieve the breadcrumb list items.
   *
   * @param {BreadcrumbItem[]} list - The breadcrumb items.
   * @returns {JSX.Element[]} The list items.
   */
  const getListItems = (list: BreadcrumbItem[]): JSX.Element[] =>
    list.map((item, index) => {
      const isLastItem = index === list.length - 1;
      const itemStyles = isLastItem
        ? `${styles.item} screen-reader-text`
        : styles.item;

      return (
        <ListItem key={item.id} className={`${itemStyles} ${itemClassName}`}>
          {isLastItem ? item.name : <Link href={item.url}>{item.name}</Link>}
        </ListItem>
      );
    });

  /**
   * Retrieve the breadcrumb list items with Schema.org format.
   *
   * @param {BreadcrumbItem[]} list - The breadcrumb items.
   * @returns {ListItemType[]} An array of list items using Schema.org format.
   */
  const getSchemaItems = (list: BreadcrumbItem[]): ListItemType[] => {
    const schemaItems: ListItemType[] = [];

    list.forEach((item, index) => {
      schemaItems.push({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      });
    });

    return schemaItems;
  };

  const schemaJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${settings.url}/#breadcrumb`,
    itemListElement: getSchemaItems(items),
  };

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <nav aria-label={ariaLabel} {...props}>
        <span className="screen-reader-text">
          {intl.formatMessage({
            defaultMessage: 'You are here:',
            description: 'Breadcrumb: You are here prefix',
            id: '16zl9Z',
          })}
        </span>
        <List hideMarker isInline isOrdered spacing="2xs">
          {getListItems(items)}
        </List>
      </nav>
    </>
  );
};
