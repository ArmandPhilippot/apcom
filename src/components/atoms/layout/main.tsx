import { FC, ReactNode } from 'react';

export type MainProps = {
  /**
   * The main body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the main element.
   */
  className?: string;
  /**
   * The main wrapper id.
   */
  id: string;
};

/**
 * Main component
 *
 * Render a main element.
 */
const Main: FC<MainProps> = ({ children, ...props }) => {
  return <main {...props}>{children}</main>;
};

export default Main;
