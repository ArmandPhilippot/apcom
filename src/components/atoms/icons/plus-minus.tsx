import { FC } from 'react';
import styles from './plus-minus.module.scss';

type PlusMinusProps = {
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
const PlusMinus: FC<PlusMinusProps> = ({ className, state }) => {
  const stateClass = `icon--${state}`;

  return (
    <div
      className={`${styles.icon} ${styles[stateClass]} ${className}`}
      aria-hidden={true}
    ></div>
  );
};

export default PlusMinus;
