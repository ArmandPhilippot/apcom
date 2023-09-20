import { FC, ReactComponentElement } from 'react';
import { Column } from '../../atoms';
import styles from './columns.module.scss';

export type ColumnsProps = {
  /**
   * The columns.
   */
  children: ReactComponentElement<typeof Column>[];
  /**
   * Set additional classnames to the columns wrapper.
   */
  className?: string;
  /**
   * The number of columns.
   */
  count: 2 | 3 | 4;
  /**
   * Should the columns be stacked on small devices? Default: true.
   */
  responsive?: boolean;
};

/**
 * Columns component.
 *
 * Render some Column components as columns.
 */
export const Columns: FC<ColumnsProps> = ({
  children,
  className = '',
  count,
  responsive = true,
}) => {
  const countClass = `wrapper--${count}-columns`;
  const responsiveClass = responsive
    ? `wrapper--responsive`
    : 'wrapper--no-responsive';
  const wrapperClass = `${styles.wrapper} ${styles[countClass]} ${styles[responsiveClass]} ${className}`;

  return <div className={wrapperClass}>{children}</div>;
};
