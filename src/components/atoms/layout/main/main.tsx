import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type ForwardRefRenderFunction,
} from 'react';

export type MainProps = HTMLAttributes<HTMLElement> & {
  /**
   * The main body.
   */
  children: ReactNode;
};

const MainWithRef: ForwardRefRenderFunction<HTMLElement, MainProps> = (
  { children, ...props },
  ref
) => (
  <main {...props} ref={ref}>
    {children}
  </main>
);

/**
 * Main component
 *
 * Render a main element.
 */
export const Main = forwardRef(MainWithRef);
