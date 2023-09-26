import {
  type ButtonHTMLAttributes,
  forwardRef,
  type ForwardRefRenderFunction,
  type ReactNode,
} from 'react';
import styles from './button.module.scss';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-busy' | 'aria-disabled' | 'aria-pressed' | 'aria-selected' | 'disabled'
> & {
  /**
   * The button body.
   */
  children: ReactNode;
  /**
   * Should the button be disabled?
   *
   * @default undefined
   */
  isDisabled?: boolean;
  /**
   * Is the button already executing some action?
   *
   * @default undefined
   */
  isLoading?: boolean;
  /**
   * Is the button a toggle and is it currently pressed?
   *
   * @default undefined
   */
  isPressed?: boolean;
  /**
   * Button kind.
   *
   * @default 'secondary'
   */
  kind?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  /**
   * Button shape.
   *
   * @default 'rectangle'
   */
  shape?: 'circle' | 'rectangle' | 'square' | 'initial';
  /**
   * Button type attribute.
   *
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
};

const ButtonWithRef: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    className = '',
    children,
    isPressed,
    isDisabled,
    isLoading,
    kind = 'secondary',
    shape = 'rectangle',
    type = 'button',
    ...props
  },
  ref
) => {
  const kindClass = styles[`btn--${kind}`];
  const shapeClass = styles[`btn--${shape}`];
  const btnClass = `${styles.btn} ${kindClass} ${shapeClass} ${className}`;

  return (
    <button
      {...props}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      aria-pressed={isPressed}
      className={btnClass}
      disabled={isDisabled ?? isLoading}
      ref={ref}
      // eslint-disable-next-line react/button-has-type -- Default value is set.
      type={type}
    >
      {children}
    </button>
  );
};

/**
 * Button component
 *
 * Use a button as call to action.
 */
export const Button = forwardRef(ButtonWithRef);
