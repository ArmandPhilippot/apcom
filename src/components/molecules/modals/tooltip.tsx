import List, { type ListItem } from '@components/atoms/lists/list';
import { FC, ReactNode } from 'react';
import styles from './tooltip.module.scss';

export type TooltipProps = {
  /**
   * Set additional classes to the tooltip wrapper.
   */
  classes?: string;
  /**
   * The tooltip body.
   */
  content: string | string[];
  /**
   * An icon to illustrate tooltip content.
   */
  icon: ReactNode;
  /**
   * The tooltip title.
   */
  title: string;
};

/**
 * Tooltip component
 *
 * Render a tooltip modal.
 */
const Tooltip: FC<TooltipProps> = ({ classes = '', content, icon, title }) => {
  /**
   * Format an array of strings to an array of object with id and value.
   *
   * @param {string[]} array - An array of strings.
   * @returns {ListItem[]} The array formatted to be used as list items.
   */
  const getListItems = (array: string[]): ListItem[] => {
    return array.map((string, index) => {
      return { id: `item-${index}`, value: string };
    });
  };

  return (
    <div className={`${styles.wrapper} ${classes}`}>
      <div className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        {title}
      </div>
      {Array.isArray(content) ? (
        <List items={getListItems(content)} />
      ) : (
        content
      )}
    </div>
  );
};

export default Tooltip;
