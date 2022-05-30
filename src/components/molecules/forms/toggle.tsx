import BooleanField, {
  type BooleanFieldProps,
} from '@components/atoms/forms/boolean-field';
import Label, { type LabelProps } from '@components/atoms/forms/label';
import { FC, ReactNode } from 'react';
import styles from './toggle.module.scss';

export type ToggleChoices = {
  /**
   * The left part of the toggle field (unchecked).
   */
  left: ReactNode;
  /**
   * The right part of the toggle field (checked).
   */
  right: ReactNode;
};

export type ToggleProps = Pick<BooleanFieldProps, 'id' | 'name'> & {
  /**
   * The toggle choices.
   */
  choices: ToggleChoices;
  /**
   * Set additional classnames to the toggle wrapper.
   */
  className?: string;
  /**
   * The toggle label.
   */
  label: string;
  /**
   * Set additional classnames to the label.
   */
  labelClassName?: LabelProps['className'];
  /**
   * The label size.
   */
  labelSize?: LabelProps['size'];
  /**
   * The toggle value. True if checked.
   */
  value: boolean;
  /**
   * A callback function to update the toggle value.
   */
  setValue: (value: boolean) => void;
};

/**
 * Toggle component
 *
 * Render a toggle with a label and two choices.
 */
const Toggle: FC<ToggleProps> = ({
  choices,
  className = '',
  id,
  label,
  labelClassName = '',
  labelSize,
  name,
  setValue,
  value,
}) => {
  return (
    <>
      <BooleanField
        checked={value}
        className={styles.checkbox}
        id={id}
        name={name}
        onChange={() => setValue(!value)}
        type="checkbox"
      />
      <Label
        size={labelSize}
        htmlFor={id}
        className={`${styles.label} ${className}`}
      >
        <span className={`${styles.title} ${labelClassName}`}>{label}</span>
        {choices.left}
        <span className={styles.toggle}></span>
        {choices.right}
      </Label>
    </>
  );
};

export default Toggle;
