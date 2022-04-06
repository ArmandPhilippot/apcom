import { FC, MouseEventHandler } from 'react';
import styles from './buttons.module.scss';

export type ButtonProps = {
  /**
   * Add additional classes to the button wrapper.
   */
  additionalClasses?: string;
  /**
   * Button accessible label.
   */
  ariaLabel?: string;
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
   * Button shape. Default: rectangle.
   */
  shape?: 'circle' | 'rectangle' | 'square';
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
  additionalClasses,
  ariaLabel,
  children,
  disabled = false,
  kind = 'secondary',
  shape = 'rectangle',
  type = 'button',
  ...props
}) => {
  const kindClass = styles[`btn--${kind}`];
  const shapeClass = styles[`btn--${shape}`];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.btn} ${kindClass} ${shapeClass} ${additionalClasses}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
