import { FC, ReactElement } from 'react';
import styles from './toggle.module.scss';

export type ToggleChoices = {
  left: ReactElement | string;
  right: ReactElement | string;
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
const Toggle: FC<ToggleProps> = ({
  choices,
  id,
  label,
  name,
  value,
  setValue,
}) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={value}
        onChange={() => setValue(!value)}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        <span className={styles.title}>{label}</span>
        {choices.left}
        <span className={styles.toggle}></span>
        {choices.right}
      </label>
    </>
  );
};

export default Toggle;
