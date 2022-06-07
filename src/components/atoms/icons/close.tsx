import { FC } from 'react';
import styles from './close.module.scss';

export type CloseProps = {
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
 * Close component
 *
 * Render a close svg icon.
 */
const Close: FC<CloseProps> = ({ className = '', ...props }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.icon} ${className}`}
      {...props}
    >
      <path
        className={styles.line}
        d="m 3.6465461,3.6465455 c 2.8785908,-2.87859092 7.5134339,-2.87859092 10.3920249,0 L 96.353457,85.96143 c 2.878587,2.878591 2.878587,7.513434 0,10.392025 -2.878597,2.878591 -7.513432,2.878591 -10.392029,0 L 3.6465451,14.038571 C 0.76795421,11.15998 0.76795421,6.5251364 3.6465461,3.6465455 Z"
      />
      <path
        className={styles.line}
        d="m 96.353453,3.646546 c 2.878592,2.8785909 2.878592,7.513435 0,10.392026 L 14.03857,96.353457 c -2.878589,2.878587 -7.5134337,2.878587 -10.3920246,0 -2.87859084,-2.878597 -2.87858985,-7.513442 -1e-6,-10.392029 L 85.961428,3.646546 c 2.878591,-2.87859097 7.513434,-2.87859097 10.392025,0 z"
      />
    </svg>
  );
};

export default Close;
