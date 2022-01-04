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
  const primaryPosition = `primary--${position}`;
  const secondaryPosition = `secondary--${position}`;
  const typeStyles = isPrimary
    ? `${styles.primary} ${styles[primaryPosition]}`
    : `${styles.secondary} ${styles[secondaryPosition]}`;
  const classes = `${styles.btn} ${typeStyles}`;

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
