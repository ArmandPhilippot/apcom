import { FC, SelectHTMLAttributes } from 'react';
import styles from '../fields.module.scss';

export type SelectOptions = {
  /**
   * The option id.
   */
  id: string;
  /**
   * The option name.
   */
  name: string;
  /**
   * The option value.
   */
  value: string;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'disabled' | 'hidden' | 'required'
> & {
  /**
   * Should the select field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the select field be hidden?
   *
   * @default false
   */
  isHidden?: boolean;
  /**
   * Is the select field required?
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * True if the field is required. Default: false.
   */
  options: SelectOptions[];
};

/**
 * Select component
 *
 * Render a HTML select element.
 */
export const Select: FC<SelectProps> = ({
  className = '',
  isDisabled = false,
  isHidden = false,
  isRequired = false,
  options,
  ...props
}) => {
  const selectClass = `${styles.field} ${styles['field--select']} ${className}`;

  return (
    <select
      {...props}
      className={selectClass}
      disabled={isDisabled}
      required={isRequired}
    >
      {options.map((option) => (
        <option key={option.id} id={option.id} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
