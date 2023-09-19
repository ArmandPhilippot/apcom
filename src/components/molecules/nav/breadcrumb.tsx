import Script from 'next/script';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';
import { settings } from '../../../utils/config';
import Link from '../../atoms/links/link';
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
const Breadcrumb: FC<BreadcrumbProps> = ({
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
  const getListItems = (list: BreadcrumbItem[]): JSX.Element[] => {
    return list.map((item, index) => {
      const isLastItem = index === list.length - 1;
      const itemStyles = isLastItem
        ? `${styles.item} screen-reader-text`
        : styles.item;

      return (
        <li key={item.id} className={`${itemStyles} ${itemClassName}`}>
          {isLastItem ? item.name : <Link href={item.url}>{item.name}</Link>}
        </li>
      );
    });
  };

  /**
   * Retrieve the breadcrumb list items with Schema.org format.
   *
   * @param {BreadcrumbItem[]} list - The breadcrumb items.
   * @returns {ListItem[]} An array of list items using Schema.org format.
   */
  const getSchemaItems = (list: BreadcrumbItem[]): ListItem[] => {
    const schemaItems: ListItem[] = [];

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
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <nav aria-label={ariaLabel} {...props}>
        <span className="screen-reader-text">
          {intl.formatMessage({
            defaultMessage: 'You are here:',
            description: 'Breadcrumb: You are here prefix',
            id: '16zl9Z',
          })}
        </span>
        <ol className={styles.list}>{getListItems(items)}</ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
