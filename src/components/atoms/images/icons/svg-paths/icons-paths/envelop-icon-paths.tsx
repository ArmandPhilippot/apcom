/* eslint-disable react/jsx-no-literals */
import type { FC } from 'react';
import styles from './envelop-icon-paths.module.scss';

/**
 * EnvelopIconPaths
 *
 * Render the svg paths to make an envelop icon.
 */
export const EnvelopIconPaths: FC = () => (
  <>
    <path
      className={styles.bg}
      d="M 1.5262527,42.535416 H 98.473747 V 98.371662 H 1.5262527 Z"
    />
    <path
      className={styles.envelop}
      d="m 49.999985,1.6283075 c 2.855148,0 48.473753,40.8563885 48.473753,40.8563885 H 1.5262359 c 0,0 45.6186001,-40.8563885 48.4737491,-40.8563885 z"
    />
    <path
      className={styles.paper}
      d="M 8.3434839,28.463842 H 91.656465 V 97.348661 H 8.3434839 Z"
    />
    <path
      className={styles.envelop}
      d="M 49.999985,63.571925 98.473738,98.371692 H 1.5262359 Z"
    />
    <path
      className={styles.lines}
      d="m 24.562439,37.640923 h 50.875053 v 1.5 H 24.562439 Z"
    />
    <path
      className={styles.lines}
      d="m 24.562439,45.140923 h 50.875053 v 1.5 H 24.562439 Z"
    />
    <path
      className={styles.lines}
      d="m 24.562443,52.640923 h 50.875053 v 1.5 H 24.562443 Z"
    />
    <path
      className={styles.lines}
      d="M 24.562447,60.140923 H 75.4375 v 1.5 H 24.562447 Z"
    />
    <path
      className={styles.envelop}
      d="M 39.93749,70.965004 1.5262559,43.55838 v 54.813242 z"
    />
    <path
      className={styles.envelop}
      d="M 60.0625,70.965004 98.473738,43.55838 v 54.813242 z"
    />
  </>
);
