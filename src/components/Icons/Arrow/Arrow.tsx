import styles from './Arrow.module.scss';

type ArrowDirection = 'top' | 'right' | 'bottom' | 'left';

const ArrowIcon = ({ direction = 'right' }: { direction?: ArrowDirection }) => {
  if (direction === 'top') {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 23.476 64.644995"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-head"
          d="M 23.476001,24.637 11.715001,0 0,24.800001 Z"
        />
        <path
          className="arrow-bar"
          d="m 15.441001,64.644997 -0.018,-40.007999 H 8.035 l 0.142,40.007999 z"
        />
      </svg>
    );
  }

  if (direction === 'bottom') {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 23.476 64.644995"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-head"
          d="m 23.476001,40.007997 -11.761,24.637 L 0,39.844996 Z"
        />
        <path
          className="arrow-bar"
          d="m 15.441001,0 -0.018,40.007999 H 8.035 L 8.177,0 Z"
        />
      </svg>
    );
  }

  if (direction === 'left') {
    return (
      <svg
        className={styles.icon}
        viewBox="0 0 64.644997 23.476001"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-head"
          d="M 24.637,23.476 0,11.715 24.8,-8.3923343e-8 Z"
        />
        <path
          className="arrow-bar"
          d="m 64.644997,15.441 -40.008,-0.018 V 8.0349999 l 40.008,0.142 z"
        />
      </svg>
    );
  }

  return (
    <svg
      className={styles.icon}
      viewBox="0 0 64.644997 23.476001"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="arrow-head"
        d="M 40.007997,23.476 64.644997,11.715 39.844997,-8.3923343e-8 Z"
      />
      <path
        className="arrow-bar"
        d="M 0,15.441 40.008,15.423 V 8.0349999 L 0,8.1769999 Z"
      />
    </svg>
  );
};

export default ArrowIcon;
