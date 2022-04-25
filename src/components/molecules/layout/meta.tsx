import DescriptionList, {
  type DescriptionListProps,
  type DescriptionListItem,
} from '@components/atoms/lists/description-list';
import { FC, ReactNode } from 'react';
import styles from './meta.module.scss';

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
  className?: DescriptionListProps['className'];
  /**
   * The meta data.
   */
  data: MetaMap;
  /**
   * The meta layout.
   */
  layout?: DescriptionListProps['layout'];
  /**
   * Determine if the layout should be responsive.
   */
  responsiveLayout?: DescriptionListProps['responsiveLayout'];
};

/**
 * Meta component
 *
 * Renders the page metadata.
 */
const Meta: FC<MetaProps> = ({ className, data, ...props }) => {
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

  return (
    <DescriptionList
      items={getItems(data)}
      className={`${styles.list} ${className}`}
      descriptionClassName={styles.value}
      {...props}
    />
  );
};

export default Meta;
