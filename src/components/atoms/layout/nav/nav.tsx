import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

export type NavProps = HTMLAttributes<HTMLElement> & {
  /**
   * The nav contents.
   */
  children: ReactNode;
};

const NavWithRef: ForwardRefRenderFunction<HTMLElement, NavProps> = (
  props,
  ref
) => <nav {...props} ref={ref} />;

/**
 * Nav component.
 */
export const Nav = forwardRef(NavWithRef);
