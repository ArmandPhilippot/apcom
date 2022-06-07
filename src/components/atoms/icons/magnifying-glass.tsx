import { FC } from 'react';
import styles from './magnifying-glass.module.scss';

export type MagnifyingGlassProps = {
  /**
   * Should the svg be hidden from assistive technologies?
   */
  'aria-hidden'?: boolean;
  /**
   * Set additional classnames to the icon.
   */
  className?: string;
};

/**
 * MagnifyingGlass component
 *
 * Render a magnifying glass svg icon.
 */
const MagnifyingGlass: FC<MagnifyingGlassProps> = ({
  className = '',
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className}`}
      {...props}
    >
      <path
        className={styles['small-handle']}
        d="m 45.39268,48.064692 5.611922,4.307881 -10.292886,13.414321 -5.611923,-4.307882 z"
      />
      <path
        className={styles.upright}
        d="M 90.904041,28.730105 A 27.725691,27.730085 0 0 1 63.17835,56.46019 27.725691,27.730085 0 0 1 35.45266,28.730105 27.725691,27.730085 0 0 1 63.17835,1.00002 27.725691,27.730085 0 0 1 90.904041,28.730105 Z"
      />
      <path
        className={styles.glass}
        d="M 82.438984,28.730105 A 19.260633,19.263685 0 0 1 63.17835,47.99379 19.260633,19.263685 0 0 1 43.917716,28.730105 19.260633,19.263685 0 0 1 63.17835,9.4664203 19.260633,19.263685 0 0 1 82.438984,28.730105 Z"
      />
      <path
        className={styles['big-handle']}
        d="m 35.826055,60.434903 5.75193,4.415356 c 0.998045,0.766128 1.184879,2.186554 0.418913,3.184809 L 18.914717,98.117182 c -0.765969,0.998256 -2.186094,1.185131 -3.18414,0.418997 L 9.9786472,94.120827 C 8.9806032,93.354698 8.7937692,91.934273 9.5597392,90.936014 L 32.641919,60.853903 c 0.765967,-0.998254 2.186091,-1.185129 3.184136,-0.419 z"
      />
    </svg>
  );
};

export default MagnifyingGlass;
