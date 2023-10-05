import type { FC, InputHTMLAttributes } from 'react';
import styles from './boolean-field.module.scss';

export type BooleanFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'checked'
  | 'disabled'
  | 'hidden'
  | 'name'
  | 'readOnly'
  | 'required'
  | 'type'
  | 'value'
> & {
  /**
   * Should the field be checked?
   *
   * @default false
   */
  isChecked?: boolean;
  /**
   * Should the field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the field be visually hidden?
   *
   * @default false
   */
  isHidden?: boolean;
  /**
   * Should the field be readonly?
   *
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Should the field be required?
   *
   * @default false
   */
  isRequired?: boolean;
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
  isChecked = false,
  isDisabled = false,
  isHidden = false,
  isReadOnly = false,
  isRequired = false,
  ...props
}) => {
  const visibilityClass = isHidden ? styles['field--hidden'] : '';
  const inputClass = `${visibilityClass} ${className}`;

  return (
    <input
      {...props}
      checked={isChecked}
      className={inputClass}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
    />
  );
};
