import styles from './Theme.module.scss';

const ThemeIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={styles.palette}
        d="m 36.966438,97.25893 c -19.863716,0 -35.96643811,-16.10281 -35.96643811,-35.966628 0,-19.86382 16.13555711,-37.108288 35.96643811,-35.966626 20.456993,1.177707 -4.177725,18.358363 2.330923,24.867041 6.508645,6.50868 33.138234,-14.015906 33.635518,16.06554 0,14.897863 -16.102724,31.000673 -35.966441,31.000673 z"
      />
      <path
        className={`${styles.colors} ${styles.color1}`}
        d="m 34.363531,35.947138 a 5.5648608,5.5649128 0 0 1 -5.564861,5.564912 5.5648608,5.5649128 0 0 1 -5.564861,-5.564912 5.5648608,5.5649128 0 0 1 5.564861,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,5.564913 z"
      />
      <path
        className={`${styles.colors} ${styles.color2}`}
        d="m 20.774887,52.836279 a 5.5648608,5.5649128 0 0 1 -5.564861,5.564912 5.5648608,5.5649128 0 0 1 -5.5648609,-5.564912 5.5648608,5.5649128 0 0 1 5.5648609,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,5.564913 z"
      />
      <path
        className={`${styles.colors} ${styles.color3}`}
        d="m 25.169864,73.456953 a 5.5648608,5.5649128 0 0 1 -5.564861,5.564913 5.5648608,5.5649128 0 0 1 -5.56486,-5.564913 5.5648608,5.5649128 0 0 1 5.56486,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,5.564913 z"
      />
      <path
        className={`${styles.colors} ${styles.color4}`}
        d="m 45.37022,82.982572 a 5.5648608,5.5649128 0 0 1 -5.564861,5.564913 5.5648608,5.5649128 0 0 1 -5.564861,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,5.564913 z"
      />
      <path
        className={`${styles.colors} ${styles.color5}`}
        d="m 65.337493,72.325422 a 5.5648608,5.5649128 0 0 1 -5.56486,5.564913 5.5648608,5.5649128 0 0 1 -5.564861,-5.564913 5.5648608,5.5649128 0 0 1 5.564861,-5.564913 5.5648608,5.5649128 0 0 1 5.56486,5.564913 z"
      />
      <path
        className={styles.bar}
        d="m 19.832251,25.296368 1.538355,5.741247 67.390349,-18.057216 3.844973,14.349636 -28.622498,7.669394 c -6.183313,1.656814 -5.744267,1.516427 -4.200251,7.278868 l 3.80049,14.183562 5.738576,-1.537647 -3.80047,-14.183547 28.622508,-7.669383 c 5.765552,-1.544878 5.744722,-1.516352 4.200664,-7.278988 L 94.499944,11.442637 C 92.953635,5.6716712 92.982563,5.6957688 87.2226,7.2391505 Z"
      />
      <path
        className={styles.handle}
        d="m 73.052595,56.920912 10.091431,37.661729 c 0.127261,0.47495 -0.133494,0.95463 -0.584655,1.07552 l -9.80712,2.627809 c -0.45116,0.12089 -0.916823,-0.164149 -1.044084,-0.639099 L 61.616737,59.985142 c -0.127263,-0.47495 0.133494,-0.954632 0.584654,-1.075519 l 9.80712,-2.62781 c 0.451161,-0.120889 0.916822,0.16415 1.044084,0.639099 z"
      />
      <path
        className={styles.guard}
        d="m 75.589139,56.451775 -16.995133,4.553832 c -0.906064,0.242779 -1.831036,-0.29154 -2.073928,-1.198024 -0.242892,-0.906485 0.290998,-1.831704 1.197062,-2.074484 l 16.995133,-4.553832 c 0.906064,-0.242779 1.831036,0.29154 2.073928,1.198025 0.242892,0.906484 -0.290998,1.831703 -1.197062,2.074483 z"
      />
      <path
        className={styles.roller}
        d="M 25.017665,15.867638 77.477694,1.8110162 c 1.94242,-0.5204698 3.925526,0.625572 4.446426,2.5695996 L 85.458379,17.57065 c 0.520901,1.944028 -0.623498,3.928082 -2.565918,4.448552 L 30.432432,36.075824 c -1.94242,0.52047 -3.925526,-0.625572 -4.446426,-2.5696 L 22.451747,20.31619 c -0.520901,-1.944027 0.623498,-3.928082 2.565918,-4.448552 z"
      />
    </svg>
  );
};

export default ThemeIcon;
