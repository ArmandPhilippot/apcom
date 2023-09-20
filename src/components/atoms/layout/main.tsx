import { FC, HTMLAttributes, ReactNode } from 'react';

export type MainProps = HTMLAttributes<HTMLElement> & {
  /**
   * The main body.
   */
  children: ReactNode;
};

/**
 * Main component
 *
 * Render a main element.
 */
export const Main: FC<MainProps> = ({ children, ...props }) => {
  return <main {...props}>{children}</main>;
};
