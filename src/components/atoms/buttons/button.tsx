import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import styles from './buttons.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * The button body.
   */
  children: ReactNode;
  /**
   * Button state.
   *
   * @default false
   */
  disabled?: boolean;
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
  const btnClass = `${styles.btn} ${kindClass} ${shapeClass} ${className}`;

  return (
    <button
      {...props}
      className={btnClass}
      disabled={disabled}
      ref={ref}
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
