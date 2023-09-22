import { FC } from 'react';
import { BooleanField, BooleanFieldProps } from '../boolean-field';

export type CheckboxProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Checkbox component
 *
 * Render a checkbox input type.
 */
export const Checkbox: FC<CheckboxProps> = (props) => (
  <BooleanField {...props} type="checkbox" />
);
