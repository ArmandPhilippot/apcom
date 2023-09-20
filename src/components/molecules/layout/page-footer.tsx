import { FC } from 'react';
import { Meta, MetaData } from './meta';

export type PageFooterProps = {
  /**
   * Set additional classnames to the footer element.
   */
  className?: string;
  /**
   * The footer metadata.
   */
  meta?: MetaData;
};

/**
 * PageFooter component
 *
 * Render a footer element to display page meta.
 */
export const PageFooter: FC<PageFooterProps> = ({ meta, ...props }) => {
  return (
    <footer {...props}>
      {meta && <Meta data={meta} withSeparator={false} />}
    </footer>
  );
};
