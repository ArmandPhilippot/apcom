import styles from './CV.module.scss';

const CVIcon = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      <path
        className={styles.bottom}
        d="M 0.72670447,42.521138 H 77.467597 v 54.36591 H 0.72670447 Z"
      />
      <path
        className={styles.handle}
        d="m 22.263958,32.886587 c 12.6493,-1.81512 21.613185,-1.732794 33.666442,0 l 1.683339,10.99517 h -5.891624 v -5.474639 c -7.949741,-2.722434 -16.311959,-2.706359 -25.249837,0 v 5.474639 h -5.891625 z"
      />
      <path
        className={styles.top}
        d="M 0.72670447,42.521138 H 77.467597 V 73.884317 H 0.72670447 Z"
      />
      <path
        className={styles.diploma}
        d="M 44.217117,1.106205 H 98.921356 V 36.610421 H 44.217117 Z"
      />
      <path
        className={styles['seal-bottom']}
        d="m 84.933665,34.721635 h 6.957554 v 10.216808 l -3.478793,-3.767744 -3.478761,3.767744 z"
      />
      <path
        className={styles['seal-top']}
        d="m 93.326919,30.779639 a 4.914472,4.9188584 0 0 1 -4.914493,4.918858 4.914472,4.9188584 0 0 1 -4.914461,-4.918858 4.914472,4.9188584 0 0 1 4.914461,-4.918858 4.914472,4.9188584 0 0 1 4.914493,4.918858 z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,14.438273 h 34.067282 v 1.515453 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,21.384062 h 34.067282 v 1.515453 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 54.53557,28.329927 h 17.563315 v 1.515454 H 54.53557 Z"
      />
      <path
        className={styles.lines}
        d="m 63.495911,7.4924218 h 16.146628 v 1.515452 H 63.495911 Z"
      />
      <path
        className={styles.lock}
        d="M 34.048314,65.601104 H 44.145988 V 80.557785 H 34.048314 Z"
      />
    </svg>
  );
};

export default CVIcon;
