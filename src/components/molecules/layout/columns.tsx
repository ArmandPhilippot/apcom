import type {
  FC,
  HTMLAttributes,
  ReactComponentElement,
  ReactNode,
} from 'react';
import styles from './columns.module.scss';

export type ColumnProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Column component.
 *
 * Render the body as a column.
 */
export const Column: FC<ColumnProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type ColumnsNumber = 2 | 3 | 4;

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
  count: ColumnsNumber;
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
