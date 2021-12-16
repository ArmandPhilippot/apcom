import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const Button = ({
  children,
  clickHandler,
  isDisabled = false,
  isPrimary = false,
}: {
  children: ReactNode;
  clickHandler: any;
  isDisabled: boolean;
  isPrimary?: boolean;
}) => {
  const classes = `${styles.btn} ${
    isPrimary ? styles.primary : styles.secondary
  }`;

  return (
    <button
      className={classes}
      type="button"
      disabled={isDisabled}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
