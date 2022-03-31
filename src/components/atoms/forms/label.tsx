import { FC } from 'react';
import styles from './forms.module.scss';

type LabelProps = {
  htmlFor: string;
  required?: boolean;
};

/**
 * Label Component
 *
 * Render a HTML label element.
 */
const Label: FC<LabelProps> = ({ children, required = false, ...props }) => {
  return (
    <label className={styles.label} {...props}>
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};

export default Label;
