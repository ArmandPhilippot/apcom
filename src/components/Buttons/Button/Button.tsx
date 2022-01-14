import { ButtonKind, ButtonPosition } from '@ts/types/app';
import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const Button = ({
  children,
  clickHandler,
  kind = 'secondary',
  position = 'left',
  isDisabled = false,
}: {
  children: ReactNode;
  clickHandler: any;
  kind?: ButtonKind;
  position?: ButtonPosition;
  isDisabled?: boolean;
}) => {
  const classes = `${styles.btn} ${styles[position]} ${styles[kind]}`;

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
