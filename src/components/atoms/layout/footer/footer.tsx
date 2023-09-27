import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

export type FooterProps = HTMLAttributes<HTMLElement> & {
  /**
   * The footer contents.
   */
  children: ReactNode;
};

const FooterWithRef: ForwardRefRenderFunction<HTMLElement, FooterProps> = (
  props,
  ref
) => <footer {...props} ref={ref} />;

/**
 * Footer component.
 */
export const Footer = forwardRef(FooterWithRef);
