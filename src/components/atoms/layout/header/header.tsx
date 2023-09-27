import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  /**
   * The header contents.
   */
  children: ReactNode;
};

const HeaderWithRef: ForwardRefRenderFunction<HTMLElement, HeaderProps> = (
  props,
  ref
) => <header {...props} ref={ref} />;

/**
 * Header component.
 */
export const Header = forwardRef(HeaderWithRef);
