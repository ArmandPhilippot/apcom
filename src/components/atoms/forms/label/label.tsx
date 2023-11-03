import {
  forwardRef,
  type ForwardRefRenderFunction,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './label.module.scss';

export type LabelSize = 'md' | 'sm';

export type LabelProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'hidden' | 'size'
> & {
  /**
   * The label body.
   */
  children: ReactNode;
  /**
   * Should the label be hidden?
   *
   * @default false
   */
  isHidden?: boolean;
  /**
   * Is the field required?
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * The label size.
   *
   * @default 'sm'
   */
  size?: LabelSize;
};

const LabelWithRef: ForwardRefRenderFunction<HTMLLabelElement, LabelProps> = (
  {
    children,
    className = '',
    isHidden = false,
    isRequired = false,
    size = 'sm',
    ...props
  },
  ref
) => {
  const labelClass = [
    styles.label,
    styles[`label--${size}`],
    isHidden ? 'screen-reader-text' : '',
    className,
  ].join(' ');
  const requiredSymbol = ' *';

  return (
    <label {...props} className={labelClass} ref={ref}>
      {children}
      {isRequired ? (
        <span aria-hidden className={styles.required}>
          {requiredSymbol}
        </span>
      ) : null}
    </label>
  );
};

/**
 * Label Component
 *
 * Render a HTML label element.
 */
export const Label = forwardRef(LabelWithRef);
