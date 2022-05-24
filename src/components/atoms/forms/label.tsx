import { FC, ReactNode } from 'react';
import styles from './label.module.scss';

export type LabelProps = {
  /**
   * An accessible name for the label.
   */
  'aria-label'?: string;
  /**
   * The label body.
   */
  children: ReactNode;
  /**
   * Add classnames to the label.
   */
  className?: string;
  /**
   * The field id.
   */
  htmlFor?: string;
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
const Label: FC<LabelProps> = ({
  children,
  className = '',
  required = false,
  size = 'small',
  ...props
}) => {
  const sizeClass = styles[`label--${size}`];

  return (
    <label className={`${styles.label} ${sizeClass} ${className}`} {...props}>
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};

export default Label;
