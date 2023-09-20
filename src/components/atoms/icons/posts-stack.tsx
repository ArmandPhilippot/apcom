import { FC, SVGAttributes } from 'react';
import styles from './posts-stack.module.scss';

export type PostsStackProps = SVGAttributes<SVGElement>;

/**
 * Posts stack component.
 *
 * Render a posts stack svg icon.
 */
export const PostsStack: FC<PostsStackProps> = ({
  className = '',
  ...props
}) => {
  return (
    <svg
      {...props}
      className={`${styles.icon} ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={styles.background}
        d="M 28.992096,1.4822128 H 90.770752 V 82.312253 H 28.992096 Z"
      />
      <path
        className={styles.background}
        d="m 19.110672,8.992094 h 61.778656 v 80.83004 H 19.110672 Z"
      />
      <path
        className={styles.background}
        d="m 9.229248,17.687748 h 61.778656 v 80.83004 H 9.229248 Z"
      />
      <path
        className={styles.picture}
        d="M 18.149242,74.65544 H 33.375246 V 90.194215 H 18.149242 Z"
      />
      <path
        className={styles.picture}
        d="M 18.142653,24.858688 H 62.094499 V 35.908926 H 18.142653 Z"
      />
      <path
        className={styles.lines}
        d="m 17.618576,41.908926 h 45 v 2 h -45 z"
      />
      <path
        className={styles.lines}
        d="m 17.618576,49.908926 h 45 v 2 h -45 z"
      />
      <path
        className={styles.lines}
        d="m 17.618576,57.908926 h 45 v 2 h -45 z"
      />
      <path
        className={styles.lines}
        d="m 17.618576,65.908926 h 45 v 2 h -45 z"
      />
      <path
        className={styles.lines}
        d="m 41.833105,73.424828 h 20.785471 v 2 H 41.833105 Z"
      />
      <path
        className={styles.lines}
        d="m 41.833105,81.424828 h 20.785471 v 2 H 41.833105 Z"
      />
      <path
        className={styles.lines}
        d="m 41.833105,89.424828 h 20.785471 v 2 H 41.833105 Z"
      />
    </svg>
  );
};
