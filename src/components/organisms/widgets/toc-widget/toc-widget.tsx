import { type ForwardRefRenderFunction, forwardRef } from 'react';
import type { HeadingsTreeNode } from '../../../../utils/hooks';
import {
  LinksWidget,
  type LinksWidgetItemData,
  type LinksWidgetProps,
} from '../links-widget';
import styles from './toc-widget.module.scss';

const getLinksItemFrom = (tree: HeadingsTreeNode[]): LinksWidgetItemData[] =>
  tree.map((node) => {
    return {
      child: node.children.length ? getLinksItemFrom(node.children) : undefined,
      id: node.id,
      label: node.label,
      url: `#${node.id}`,
    };
  });

export type TocWidgetProps = Omit<LinksWidgetProps, 'isOrdered' | 'items'> & {
  /**
   * The headings tree.
   */
  tree: HeadingsTreeNode[];
};

const TocWidgetWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  TocWidgetProps
> = ({ className = '', tree, ...props }, ref) => {
  const wrapperClass = `${styles.toc} ${className}`;

  return (
    <LinksWidget
      {...props}
      className={wrapperClass}
      isOrdered
      items={getLinksItemFrom(tree)}
      ref={ref}
    />
  );
};

export const TocWidget = forwardRef(TocWidgetWithRef);
