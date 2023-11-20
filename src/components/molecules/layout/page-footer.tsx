import type { FC, ReactNode } from 'react';
import { Footer, type FooterProps } from '../../atoms';

export type PageFooterProps = Omit<FooterProps, 'children'> & {
  /**
   * The footer contents.
   */
  children?: ReactNode;
};

/**
 * PageFooter component
 *
 * Render a footer to display page meta.
 */
export const PageFooter: FC<PageFooterProps> = ({ children, ...props }) => (
  <Footer {...props}>{children}</Footer>
);
