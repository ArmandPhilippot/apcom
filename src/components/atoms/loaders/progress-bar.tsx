import { FC } from 'react';
import styles from './progress-bar.module.scss';

export type ProgressBarProps = {
  /**
   * Accessible progress bar name.
   */
  'aria-label'?: string;
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
  current,
  info,
  min,
  max,
  ...props
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
        {...props}
      ></progress>
    </div>
  );
};

export default ProgressBar;
