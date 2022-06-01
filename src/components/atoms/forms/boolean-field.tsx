import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import styles from './boolean-field.module.scss';

export type BooleanFieldProps = {
  /**
   * One or more ids that refers to the checkbox name.
   */
  'aria-labelledby'?: string;
  /**
   * True if the field should be checked.
   */
  checked: boolean;
  /**
   * Add classnames to the checkbox.
   */
  className?: string;
  /**
   * Field id attribute.
   */
  id: string;
  /**
   * True if the field should be visually hidden. Default: false.
   */
  hidden?: boolean;
  /**
   * Field name attribute.
   */
  name: string;
  /**
   * Callback function to handle state change.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * A callback function to handle click.
   */
  onClick?: MouseEventHandler<HTMLInputElement>;
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
const BooleanField: FC<BooleanFieldProps> = ({
  className = '',
  hidden = false,
  ...props
}) => {
  const modifier = hidden ? 'hidden' : '';

  return <input className={`${styles[modifier]} ${className}`} {...props} />;
};

export default BooleanField;
