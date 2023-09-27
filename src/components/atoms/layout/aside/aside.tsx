import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';

export type AsideProps = HTMLAttributes<HTMLElement> & {
  /**
   * The aside contents.
   */
  children: ReactNode;
};

const AsideWithRef: ForwardRefRenderFunction<HTMLElement, AsideProps> = (
  props,
  ref
) => <aside {...props} ref={ref} />;

/**
 * Aside component.
 */
export const Aside = forwardRef(AsideWithRef);
