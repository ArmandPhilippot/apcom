import type { FC } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';

export type CheckboxProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Checkbox component
 *
 * Render a checkbox input type.
 */
export const Checkbox: FC<CheckboxProps> = (props) => (
  // eslint-disable-next-line react/jsx-no-literals -- Type allowed
  <BooleanField {...props} type="checkbox" />
);
