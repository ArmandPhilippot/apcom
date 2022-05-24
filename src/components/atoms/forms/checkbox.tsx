import { FC, SetStateAction } from 'react';

export type CheckboxProps = {
  /**
   * One or more ids that refers to the checkbox name.
   */
  'aria-labelledby'?: string;
  /**
   * Add classnames to the checkbox.
   */
  className?: string;
  /**
   * Checkbox id attribute.
   */
  id: string;
  /**
   * Checkbox name attribute.
   */
  name: string;
  /**
   * Callback function to set checkbox value.
   */
  setValue: (value: SetStateAction<boolean>) => void;
  /**
   * Checkbox value.
   */
  value: boolean;
};

/**
 * Checkbox component
 *
 * Render a checkbox type input.
 */
const Checkbox: FC<CheckboxProps> = ({ value, setValue, ...props }) => {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={() => setValue(!value)}
      {...props}
    />
  );
};

export default Checkbox;
