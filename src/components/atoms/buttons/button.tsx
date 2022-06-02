import {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEventHandler,
  ReactNode,
} from 'react';
import styles from './buttons.module.scss';

export type ButtonProps = {
  /**
   * Button accessible label.
   */
  'aria-label'?: string;
  /**
   * Indicates the current "pressed" state of a toggle button.
   */
  'aria-pressed'?: boolean | 'mixed';
  /**
   * The button body.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the button wrapper.
   */
  className?: string;
  /**
   * Button state. Default: false.
   */
  disabled?: boolean;
  /**
   * Button kind. Default: secondary.
   */
  kind?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  /**
   * A callback function to handle click.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Button shape. Default: rectangle.
   */
  shape?: 'circle' | 'rectangle' | 'square' | 'initial';
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
const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    className = '',
    children,
    disabled = false,
    kind = 'secondary',
    shape = 'rectangle',
    type = 'button',
    ...props
  },
  ref
) => {
  const kindClass = styles[`btn--${kind}`];
  const shapeClass = styles[`btn--${shape}`];

  return (
    <button
      className={`${styles.btn} ${kindClass} ${shapeClass} ${className}`}
      disabled={disabled}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
