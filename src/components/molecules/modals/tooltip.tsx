import List, { type ListItem } from '@components/atoms/lists/list';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import styles from './tooltip.module.scss';

export type TooltipProps = {
  /**
   * Set additional classnames to the tooltip wrapper.
   */
  className?: string;
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
const Tooltip: ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (
  { className = '', content, icon, title },
  ref
) => {
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
    <div className={`${styles.wrapper} ${className}`} ref={ref}>
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

export default forwardRef(Tooltip);
