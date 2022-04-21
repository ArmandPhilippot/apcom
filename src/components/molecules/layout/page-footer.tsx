import { FC } from 'react';
import Meta, { type MetaMap } from './meta';

export type PageFooterProps = {
  /**
   * Set additional classnames to the footer element.
   */
  className?: string;
  /**
   * The footer metadata.
   */
  meta?: MetaMap;
};

/**
 * PageFooter component
 *
 * Render a footer element to display page meta.
 */
const PageFooter: FC<PageFooterProps> = ({ meta, ...props }) => {
  return (
    <footer {...props}>{meta && <Meta data={meta} layout="column" />}</footer>
  );
};

export default PageFooter;
