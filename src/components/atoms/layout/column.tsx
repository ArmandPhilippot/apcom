import { FC, HTMLAttributes, ReactNode } from 'react';

export type ColumnProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Column component.
 *
 * Render the body as a column.
 */
export const Column: FC<ColumnProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
