import { FC, LabelHTMLAttributes, ReactNode } from 'react';
import styles from './label.module.scss';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * The label body.
   */
  children: ReactNode;
  /**
   * Is the field required? Default: false.
   */
  required?: boolean;
  /**
   * The label size. Default: small.
   */
  size?: 'medium' | 'small';
};

/**
 * Label Component
 *
 * Render a HTML label element.
 */
export const Label: FC<LabelProps> = ({
  children,
  className = '',
  required = false,
  size = 'small',
  ...props
}) => {
  const sizeClass = styles[`label--${size}`];
  const labelClass = `${styles.label} ${sizeClass} ${className}`;

  return (
    <label {...props} className={labelClass}>
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};
