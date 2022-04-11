import DescriptionList, {
  type DescriptionListProps,
  type DescriptionListItem,
} from '@components/atoms/lists/description-list';
import { ReactNode, VFC } from 'react';

export type MetaItem = {
  /**
   * The meta name.
   */
  name: string;
  /**
   * The meta value.
   */
  value: ReactNode | ReactNode[];
};

export type MetaMap = {
  [key: string]: MetaItem | undefined;
};

export type MetaProps = {
  /**
   * Set additional classnames to the meta wrapper.
   */
  className?: string;
  /**
   * The meta data.
   */
  data: MetaMap;
  /**
   * The meta layout.
   */
  layout?: DescriptionListProps['layout'];
};

/**
 * Meta component
 *
 * Renders the page metadata.
 */
const Meta: VFC<MetaProps> = ({ data, ...props }) => {
  /**
   * Transform the metadata to description list item format.
   *
   * @param {MetaMap} items - The meta.
   * @returns {DescriptionListItem[]} The formatted description list items.
   */
  const getItems = (items: MetaMap): DescriptionListItem[] => {
    const listItems: DescriptionListItem[] = Object.entries(items)
      .map(([key, item]) => {
        if (!item) return;

        const { name, value } = item;

        return {
          id: key,
          term: name,
          value: Array.isArray(value) ? value : [value],
        } as DescriptionListItem;
      })
      .filter((item): item is DescriptionListItem => !!item);

    return listItems;
  };

  return <DescriptionList items={getItems(data)} {...props} />;
};

export default Meta;
