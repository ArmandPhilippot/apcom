import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useHeadingsTree, type Heading } from '../../../utils/hooks';
import { Heading as HeadingComponent } from '../../atoms';
import { LinksWidget, type LinksWidgetItemData } from './links-widget';
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
  const getItems = (tree: Heading[]): LinksWidgetItemData[] =>
    tree.map((heading) => {
      return {
        id: heading.id,
        label: heading.title,
        url: `#${heading.id}`,
        child: getItems(heading.children),
      };
    });

  return (
    <LinksWidget
      className={styles.list}
      heading={
        <HeadingComponent isFake level={3}>
          {title}
        </HeadingComponent>
      }
      isOrdered
      items={getItems(headingsTree)}
    />
  );
};
