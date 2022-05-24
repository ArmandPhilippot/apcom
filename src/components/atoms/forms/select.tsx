import { ChangeEvent, FC, SetStateAction } from 'react';
import styles from './forms.module.scss';

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

export type SelectProps = {
  /**
   * One or more ids that refers to the select field name.
   */
  'aria-labelledby'?: string;
  /**
   * Add classnames to the select field.
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
   * Field name attribute.
   */
  name: string;
  /**
   * True if the field is required. Default: false.
   */
  options: SelectOptions[];
  /**
   * True if the field is required. Default: false.
   */
  required?: boolean;
  /**
   * Callback function to set field value.
   */
  setValue: (value: SetStateAction<string>) => void;
  /**
   * Field value.
   */
  value: string;
};

/**
 * Select component
 *
 * Render a HTML select element.
 */
const Select: FC<SelectProps> = ({
  className = '',
  options,
  setValue,
  ...props
}) => {
  /**
   * Update select value when an option is selected.
   * @param e - The option change event.
   */
  const updateValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  /**
   * Get the option elements.
   * @returns {JSX.Element[]} An array of HTML option elements.
   */
  const getOptions = (): JSX.Element[] =>
    options.map((option) => (
      <option key={option.id} value={option.value}>
        {option.name}
      </option>
    ));

  return (
    <select
      className={`${styles.field} ${styles['field--select']} ${className}`}
      onChange={updateValue}
      {...props}
    >
      {getOptions()}
    </select>
  );
};

export default Select;
