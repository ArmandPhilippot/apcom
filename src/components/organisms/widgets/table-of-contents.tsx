import useHeadingsTree, { type Heading } from '@utils/hooks/use-headings-tree';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import LinksListWidget, { type LinksListItems } from './links-list-widget';
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
const TableOfContents: FC<TableOfContentsProps> = ({ wrapper }) => {
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
  const getItems = (tree: Heading[]): LinksListItems[] => {
    return tree.map((heading) => {
      return {
        name: heading.title,
        url: `#${heading.id}`,
        child: getItems(heading.children),
      };
    });
  };

  return (
    <LinksListWidget
      kind="ordered"
      title={title}
      level={2}
      items={getItems(headingsTree)}
      className={styles.list}
    />
  );
};

export default TableOfContents;
