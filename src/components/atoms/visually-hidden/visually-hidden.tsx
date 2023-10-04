import type { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './visually-hidden.module.scss';

export type VisuallyHiddenProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  /**
   * The contents to visually hide.
   */
  children: ReactNode;
};

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  children,
  className = '',
  ...props
}) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <span {...props} className={wrapperClass}>
      {children}
    </span>
  );
};
