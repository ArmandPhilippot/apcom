import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { List, type ListItem } from '../../atoms';
import styles from './tooltip.module.scss';

export type TooltipProps = {
  /**
   * Set additional classnames to the tooltip wrapper.
   */
  className?: string;
  /**
   * Set more additional classnames to the tooltip wrapper. Required when using React.cloneElement.
   */
  cloneClassName?: string;
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

const TooltipWithRef: ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (
  { cloneClassName = '', className = '', content, icon, title },
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
    <div
      className={`${styles.wrapper} ${cloneClassName} ${className}`}
      ref={ref}
    >
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

/**
 * Tooltip component
 *
 * Render a tooltip modal.
 */
export const Tooltip = forwardRef(TooltipWithRef);
