import type { FC } from 'react';
import { Footer, type FooterProps } from '../../atoms';
import { Meta, type MetaData } from './meta';

export type PageFooterProps = Omit<FooterProps, 'children'> & {
  /**
   * The footer metadata.
   */
  meta?: MetaData;
};

/**
 * PageFooter component
 *
 * Render a footer to display page meta.
 */
export const PageFooter: FC<PageFooterProps> = ({ meta, ...props }) => (
  <Footer {...props}>
    {meta ? <Meta data={meta} withSeparator={false} /> : null}
  </Footer>
);
