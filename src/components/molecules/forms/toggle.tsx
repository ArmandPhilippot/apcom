import Checkbox from '@components/atoms/forms/checkbox';
import Label, { type LabelProps } from '@components/atoms/forms/label';
import { ReactNode, VFC } from 'react';
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

export type ToggleProps = {
  /**
   * The toggle choices.
   */
  choices: ToggleChoices;
  /**
   * The input id.
   */
  id: string;
  /**
   * The toggle label.
   */
  label: string;
  /**
   * Set additional classnames to the label.
   */
  labelClassName?: string;
  /**
   * The label size.
   */
  labelSize?: LabelProps['size'];
  /**
   * The input name.
   */
  name: string;
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
const Toggle: VFC<ToggleProps> = ({
  choices,
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
      <Checkbox
        name={name}
        id={id}
        value={value}
        setValue={() => setValue(!value)}
        className={styles.checkbox}
      />
      <Label size={labelSize} htmlFor={id} className={styles.label}>
        <span className={`${styles.title} ${labelClassName}`}>{label}</span>
        {choices.left}
        <span className={styles.toggle}></span>
        {choices.right}
      </Label>
    </>
  );
};

export default Toggle;