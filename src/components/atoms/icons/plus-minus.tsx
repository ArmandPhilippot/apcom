import { FC } from 'react';
import styles from './plus-minus.module.scss';

type PlusMinusProps = {
  /**
   * Adds additional classes.
   */
  additionalClasses?: string;
  /**
   * An accessible name.
   */
  ariaLabel?: string;
  /**
   * Should be hidden for accessibility. Default: true.
   */
  ariaHidden?: boolean;
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
const PlusMinus: FC<PlusMinusProps> = ({
  additionalClasses,
  ariaHidden = true,
  ariaLabel,
  state,
}) => {
  const stateClass = `icon--${state}`;

  return (
    <div
      className={`${styles.icon} ${styles[stateClass]} ${additionalClasses}`}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    ></div>
  );
};

export default PlusMinus;
