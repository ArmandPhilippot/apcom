import {
  useId,
  type CSSProperties,
  type HTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { Label } from '../../forms';
import styles from './progress-bar.module.scss';

export type ProgressBarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * Current value.
   */
  current: number;
  /**
   * Should the progress bar be centered inside its parent?
   *
   * @default false
   */
  isCentered?: boolean;
  /**
   * Should the progress bar indicate a loading state?
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The progress bar label.
   */
  label: string;
  /**
   * Maximal value.
   */
  max: number;
};

const ProgressBarWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  ProgressBarProps
> = (
  {
    className = '',
    current,
    isCentered = false,
    isLoading = false,
    label,
    max,
    ...props
  },
  ref
) => {
  const wrapperClass = [
    styles.wrapper,
    styles[isCentered ? 'wrapper--centered' : ''],
    className,
  ].join(' ');
  const progressClass = `${styles.progress} ${
    styles[isLoading ? 'progress--loading' : '']
  }`;
  const progressBarId = useId();
  const progressValueFallback = `${current}/${max}`;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- Percent
  const progressPercent = `${((max - current) / max) * 100}%`;

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      <Label
        className={styles.label}
        htmlFor={progressBarId}
        // eslint-disable-next-line react/jsx-no-literals -- Size allowed
        size="md"
      >
        {label}
      </Label>
      <div
        className={progressClass}
        style={{ '--currentProgress': `-${progressPercent}` } as CSSProperties}
      >
        <progress
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={current}
          id={progressBarId}
          max={max}
          value={isLoading ? undefined : current}
        >
          {progressValueFallback}
        </progress>
        <div aria-hidden className={styles.progress__bar} />
      </div>
    </div>
  );
};

/**
 * ProgressBar component
 *
 * Render a progress bar.
 */
export const ProgressBar = forwardRef(ProgressBarWithRef);
