import { FC } from 'react';
import styles from './progress-bar.module.scss';

export type ProgressBarProps = {
  /**
   * Current value.
   */
  current: number;
  /**
   * The progress bar id.
   */
  id: string;
  /**
   * The progress bar label.
   */
  label: string;
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
export const ProgressBar: FC<ProgressBarProps> = ({
  current,
  id,
  label,
  min,
  max,
}) => {
  return (
    <div className={styles.progress}>
      <label htmlFor={id} className={styles.progress__info}>
        {label}
      </label>
      <progress
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        className={styles.progress__bar}
        id={id}
        max={max}
        value={current}
      >
        {current}/{max}
      </progress>
    </div>
  );
};
