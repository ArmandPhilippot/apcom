import type { FC, HTMLAttributes } from 'react';
import styles from './legend.module.scss';

export type LegendProps = HTMLAttributes<HTMLLegendElement>;

/**
 * Legend component.
 */
export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  ...props
}) => {
  const legendClass = `${styles.legend} ${className}`;

  return (
    <legend {...props} className={legendClass}>
      {children}
    </legend>
  );
};
