/* eslint-disable react/jsx-no-literals */
import type { FC } from 'react';
import styles from './home-icon-paths.module.scss';

/**
 * HomeIconPaths
 *
 * Render the svg paths to make a home icon.
 */
export const HomeIconPaths: FC = () => (
  <>
    <path
      className={styles.wall}
      d="M 9.2669392,15.413749 H 90.709833 V 97.751815 H 9.2669392 Z"
    />
    <path
      className={styles.indoor}
      d="m 39.190941,65.836418 h 21.594871 v 31.91539 H 39.190941 Z"
    />
    <path
      className={styles.door}
      d="m 39.190941,65.836418 h 21.594871 v 31.91539 H 39.190941 Z"
    />
    <path
      className={styles.roof}
      d="M 4.8219096,11.719266 H 94.720716 l 3.47304,33.365604 H 1.7830046 Z"
    />
    <path
      className={styles.chimney}
      d="M 70.41848,2.2481852 H 82.957212 V 22.636212 H 70.41848 Z"
    />
    <path
      className={styles.lines}
      d="M 3.9536645,19.342648 H 61.003053 v 3.293563 H 3.9536645 Z"
    />
    <path
      className={styles.lines}
      d="m 38.973709,32.057171 h 57.049389 v 3.293563 H 38.973709 Z"
    />
  </>
);
