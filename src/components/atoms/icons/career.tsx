import { FC, SVGAttributes } from 'react';
import styles from './career.module.scss';

export type CareerProps = SVGAttributes<SVGElement>;

/**
 * Career Component
 *
 * Render a career svg icon.
 */
export const Career: FC<CareerProps> = ({ className = '', ...props }) => {
  return (
    <svg
      {...props}
      className={`${styles.icon} ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={styles.bottom}
        d="M 0.72670447,19.813041 H 77.467597 v 54.36591 H 0.72670447 Z"
      />
      <path
        className={styles.handle}
        d="m 22.263958,10.17849 c 12.6493,-1.81512 21.613185,-1.732794 33.666442,0 l 1.683339,10.99517 h -5.891624 v -5.474639 c -7.949741,-2.722434 -16.311959,-2.706359 -25.249837,0 v 5.474639 h -5.891625 z"
      />
      <path
        className={styles.top}
        d="M 0.72670447,19.813041 H 77.467597 V 51.17622 H 0.72670447 Z"
      />
      <path
        className={styles.diploma}
        d="M 44.217117,47.159906 H 98.921356 V 82.664122 H 44.217117 Z"
      />
      <path
        className={styles['seal-bottom']}
        d="m 84.933665,80.775336 h 6.957554 V 90.992144 L 88.412426,87.2244 84.933665,90.992144 Z"
      />
      <path
        className={styles['seal-top']}
        d="m 93.326919,76.83334 a 4.914472,4.9188584 0 0 1 -4.914493,4.918858 4.914472,4.9188584 0 0 1 -4.914461,-4.918858 4.914472,4.9188584 0 0 1 4.914461,-4.918858 4.914472,4.9188584 0 0 1 4.914493,4.918858 z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,60.491974 h 34.067282 v 1.515453 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,67.437763 h 34.067282 v 1.515453 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,74.383628 h 17.563315 v 1.515454 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 63.495911,53.546123 h 16.146628 v 1.515452 H 63.495911 Z"
      />
      <path
        className={styles.lock}
        d="M 34.048314,42.893007 H 44.145988 V 57.849688 H 34.048314 Z"
      />
    </svg>
  );
};
