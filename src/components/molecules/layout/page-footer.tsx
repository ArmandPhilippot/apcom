import type { FC } from 'react';
import { Footer, type FooterProps } from '../../atoms';
import { MetaList, type MetaItemData } from '../meta-list';

export type PageFooterProps = Omit<FooterProps, 'children'> & {
  /**
   * The footer metadata.
   */
  meta?: MetaItemData[];
};

/**
 * PageFooter component
 *
 * Render a footer to display page meta.
 */
export const PageFooter: FC<PageFooterProps> = ({ meta, ...props }) => (
  <Footer {...props}>
    {meta ? <MetaList hasInlinedValues items={meta} /> : null}
  </Footer>
);
