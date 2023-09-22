import {
  type FormHTMLAttributes,
  forwardRef,
  type ForwardRefRenderFunction,
} from 'react';

export type FormRole = 'form' | 'search' | 'none' | 'presentation';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  /**
   * An accessible role.
   */
  role?: FormRole;
};

const FormWithRef: ForwardRefRenderFunction<HTMLFormElement, FormProps> = (
  { children, ...props },
  ref
) => (
  <form {...props} ref={ref}>
    {children}
  </form>
);

/**
 * Form component.
 */
export const Form = forwardRef(FormWithRef);
