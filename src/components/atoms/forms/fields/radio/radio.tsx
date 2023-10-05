import type { FC } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';

export type RadioProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Radio component
 *
 * Render a radio input type.
 */
export const Radio: FC<RadioProps> = (props) => (
  // eslint-disable-next-line react/jsx-no-literals -- Type allowed
  <BooleanField {...props} type="radio" />
);
