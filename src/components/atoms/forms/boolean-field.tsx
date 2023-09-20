import { FC, InputHTMLAttributes } from 'react';
import styles from './boolean-field.module.scss';

export type BooleanFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'hidden' | 'name' | 'type' | 'value'
> & {
  /**
   * True if the field should be checked.
   */
  checked: boolean;
  /**
   * True if the field should be visually hidden. Default: false.
   */
  hidden?: boolean;
  /**
   * Field name attribute.
   */
  name: string;
  /**
   * The input type.
   */
  type: 'checkbox' | 'radio';
  /**
   * Field name attribute.
   */
  value: string;
};

/**
 * BooleanField component
 *
 * Render a checkbox or a radio input type.
 */
export const BooleanField: FC<BooleanFieldProps> = ({
  className = '',
  hidden = false,
  ...props
}) => {
  const modifier = hidden ? 'hidden' : '';
  const inputClass = `${styles[modifier]} ${className}`;

  return <input {...props} className={inputClass} />;
};
