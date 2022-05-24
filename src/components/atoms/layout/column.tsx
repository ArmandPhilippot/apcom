import { FC, ReactNode } from 'react';

export type ColumnProps = {
  children: ReactNode | ReactNode[];
};

/**
 * Column component.
 *
 * Render the body as a column.
 */
const Column: FC<ColumnProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Column;
