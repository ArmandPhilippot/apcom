import type { FC, LabelHTMLAttributes, ReactNode } from 'react';
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

/**
 * Label Component
 *
 * Render a HTML label element.
 */
export const Label: FC<LabelProps> = ({
  children,
  className = '',
  isHidden = false,
  isRequired = false,
  size = 'sm',
  ...props
}) => {
  const visibilityClass = isHidden ? 'screen-reader-text' : '';
  const sizeClass = styles[`label--${size}`];
  const labelClass = `${styles.label} ${sizeClass} ${visibilityClass} ${className}`;
  const requiredSymbol = ' *';

  return (
    <label {...props} className={labelClass}>
      {children}
      {isRequired ? (
        <span aria-hidden className={styles.required}>
          {requiredSymbol}
        </span>
      ) : null}
    </label>
  );
};
