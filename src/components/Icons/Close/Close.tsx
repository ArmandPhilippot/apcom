import styles from './Close.module.scss';

const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
    >
      <path
        className={styles.line}
        d="m 3.6465459,3.6465457 c 2.8785908,-2.87859094 7.5134341,-2.87859094 10.3920251,0 L 96.353457,85.96143 c 2.878587,2.878591 2.878587,7.513434 0,10.392025 -2.878597,2.878591 -7.513432,2.878591 -10.392029,0 L 3.6465449,14.038571 C 0.76795398,11.15998 0.76795398,6.5251366 3.6465459,3.6465457 Z"
      />
      <path
        className={styles.line}
        d="m 96.353453,3.6465462 c 2.878592,2.8785909 2.878592,7.5134348 0,10.3920258 L 14.03857,96.353457 c -2.878589,2.878587 -7.5134339,2.878587 -10.3920248,0 -2.87859087,-2.878597 -2.87858988,-7.513442 -10e-7,-10.392029 L 85.961428,3.6465462 c 2.878591,-2.87859099 7.513434,-2.87859099 10.392025,0 z"
      />
    </svg>
  );
};

export default CloseIcon;
