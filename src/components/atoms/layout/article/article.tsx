import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

export type ArticleProps = HTMLAttributes<HTMLElement> & {
  /**
   * The article contents.
   */
  children: ReactNode;
};

const ArticleWithRef: ForwardRefRenderFunction<HTMLElement, ArticleProps> = (
  props,
  ref
) => <article {...props} ref={ref} />;

/**
 * Article component.
 */
export const Article = forwardRef(ArticleWithRef);
