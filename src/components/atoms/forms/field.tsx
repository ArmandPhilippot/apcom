import { ChangeEvent, FC, SetStateAction } from 'react';
import styles from './forms.module.scss';

export type FieldType =
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'search'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url';

export type FieldProps = {
  /**
   * One or more ids that refers to the field name.
   */
  'aria-labelledby'?: string;
  /**
   * Add classnames to the field.
   */
  className?: string;
  /**
   * Field state. Either enabled (false) or disabled (true).
   */
  disabled?: boolean;
  /**
   * Field id attribute.
   */
  id: string;
  /**
   * Field maximum value.
   */
  max?: number | string;
  /**
   * Field minimum value.
   */
  min?: number | string;
  /**
   * Field name attribute.
   */
  name: string;
  /**
   * Placeholder value.
   */
  placeholder?: string;
  /**
   * True if the field is required. Default: false.
   */
  required?: boolean;
  /**
   * Callback function to set field value.
   */
  setValue: (value: SetStateAction<string>) => void;
  /**
   * Field incremental values that are valid.
   */
  step?: number | string;
  /**
   * Field type. Default: text.
   */
  type: FieldType;
  /**
   * Field value.
   */
  value: string;
};

/**
 * Field component.
 *
 * Render either an input or a textarea.
 */
const Field: FC<FieldProps> = ({
  className = '',
  setValue,
  type,
  ...props
}) => {
  /**
   * Update select value when an option is selected.
   * @param e - The option change event.
   */
  const updateValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  return type === 'textarea' ? (
    <textarea
      onChange={updateValue}
      className={`${styles.field} ${styles['field--textarea']} ${className}`}
      {...props}
    />
  ) : (
    <input
      type={type}
      onChange={updateValue}
      className={`${styles.field} ${className}`}
      {...props}
    />
  );
};

export default Field;
