import { FC } from 'react';
import { BooleanField, BooleanFieldProps } from '../boolean-field';

export type RadioProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Radio component
 *
 * Render a radio input type.
 */
export const Radio: FC<RadioProps> = (props) => (
  <BooleanField {...props} type="radio" />
);
