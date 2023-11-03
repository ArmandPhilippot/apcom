import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';

export type CheckboxProps = Omit<BooleanFieldProps, 'type'>;

const CheckboxWithRef: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (props, ref) => (
  // eslint-disable-next-line react/jsx-no-literals -- Type allowed
  <BooleanField {...props} ref={ref} type="checkbox" />
);

/**
 * Checkbox component
 *
 * Render a checkbox input type.
 */
export const Checkbox = forwardRef(CheckboxWithRef);
