import { FC } from 'react';
import styles from './progress-bar.module.scss';

export type ProgressBarProps = {
  /**
   * Accessible progress bar name.
   */
  ariaLabel?: string;
  /**
   * Current value.
   */
  current: number;
  /**
   * Additional information to display before progress bar.
   */
  info?: string;
  /**
   * Minimal value.
   */
  min: number;
  /**
   * Maximal value.
   */
  max: number;
};

/**
 * ProgressBar component
 *
 * Render a progress bar.
 */
const ProgressBar: FC<ProgressBarProps> = ({
  ariaLabel,
  current,
  info,
  min,
  max,
}) => {
  return (
    <div className={styles.progress}>
      {info && <div className={styles.progress__info}>{info}</div>}
      <progress
        className={styles.progress__bar}
        max={max}
        value={current}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-label={ariaLabel}
      ></progress>
    </div>
  );
};

export default ProgressBar;
