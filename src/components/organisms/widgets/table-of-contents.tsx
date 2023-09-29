import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useHeadingsTree, type Heading } from '../../../utils/hooks';
import { type LinksListItems, LinksListWidget } from './links-list-widget';
import styles from './table-of-contents.module.scss';

type TableOfContentsProps = {
  /**
   * A reference to the HTML element that contains the headings.
   */
  wrapper: HTMLElement;
};

/**
 * Table of Contents widget component
 *
 * Render a table of contents.
 */
export const TableOfContents: FC<TableOfContentsProps> = ({ wrapper }) => {
  const intl = useIntl();
  const headingsTree = useHeadingsTree(wrapper);
  const title = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'TableOfContents: the widget title',
    id: 'WKG9wj',
  });

  /**
   * Convert an headings tree to list items.
   *
   * @param {Heading[]} tree - The headings tree.
   * @returns {LinksListItems[]} The list items.
   */
  const getItems = (tree: Heading[]): LinksListItems[] =>
    tree.map((heading) => {
      return {
        name: heading.title,
        url: `#${heading.id}`,
        child: getItems(heading.children),
      };
    });

  return (
    <LinksListWidget
      className={styles.list}
      isOrdered
      items={getItems(headingsTree)}
      level={2}
      title={title}
    />
  );
};
