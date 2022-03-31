import { FC, MouseEventHandler } from 'react';
import styles from './buttons.module.scss';

export type ButtonProps = {
  /**
   * Button accessible label.
   */
  'aria-label'?: string;
  /**
   * Button state. Default: false.
   */
  disabled?: boolean;
  /**
   * Button kind. Default: secondary.
   */
  kind?: 'primary' | 'secondary' | 'tertiary';
  /**
   * A callback function to handle click.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Button type attribute. Default: button.
   */
  type?: 'button' | 'reset' | 'submit';
};

/**
 * Button component
 *
 * Use a button as call to action.
 */
const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  kind = 'secondary',
  type = 'button',
  ...props
}) => {
  const kindClass = styles[`btn--${kind}`];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.btn} ${kindClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
