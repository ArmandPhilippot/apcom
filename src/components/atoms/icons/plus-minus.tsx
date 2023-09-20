import { FC } from 'react';
import styles from './plus-minus.module.scss';

export type PlusMinusProps = {
  /**
   * Set additional classnames to the icon.
   */
  className?: string;
  /**
   * Which state should be displayed.
   */
  state: 'plus' | 'minus';
};

/**
 * PlusMinus component
 *
 * Render a plus or a minus icon.
 */
export const PlusMinus: FC<PlusMinusProps> = ({ className = '', state }) => {
  const stateClass = `icon--${state}`;

  return (
    <div
      aria-hidden={true}
      className={`${styles.icon} ${styles[stateClass]} ${className}`}
    />
  );
};
