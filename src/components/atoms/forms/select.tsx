import { ChangeEvent, FC, SelectHTMLAttributes, SetStateAction } from 'react';
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

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
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
export const Select: FC<SelectProps> = ({
  className = '',
  options,
  setValue,
  ...props
}) => {
  const selectClass = `${styles.field} ${styles['field--select']} ${className}`;

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
    <select {...props} className={selectClass} onChange={updateValue}>
      {getOptions()}
    </select>
  );
};
