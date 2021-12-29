import { ButtonPosition } from '@ts/types/app';
import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const Button = ({
  children,
  clickHandler,
  position = 'left',
  isDisabled = false,
  isPrimary = false,
}: {
  children: ReactNode;
  clickHandler: any;
  position?: ButtonPosition;
  isDisabled?: boolean;
  isPrimary?: boolean;
}) => {
  const classes = `${styles.btn} ${
    isPrimary
      ? `${styles.primary} ${styles[`primary--${position}`]}`
      : `${styles.secondary} ${styles[`secondary--${position}`]}`
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
