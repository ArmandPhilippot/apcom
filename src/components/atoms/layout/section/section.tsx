import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';

export type SectionProps = HTMLAttributes<HTMLElement>;

const SectionWithRef: ForwardRefRenderFunction<HTMLElement, SectionProps> = (
  { children, ...props },
  ref
) => (
  <section {...props} ref={ref}>
    {children}
  </section>
);

/**
 * Section component
 *
 * Render a section element with a heading and a body.
 */
export const Section = forwardRef(SectionWithRef);
