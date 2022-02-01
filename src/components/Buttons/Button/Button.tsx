import { ButtonKind, ButtonPosition } from '@ts/types/app';
import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const Button = ({
  children,
  clickHandler,
  kind = 'secondary',
  position = 'left',
  spacing = false,
  isDisabled = false,
}: {
  children: ReactNode;
  clickHandler: any;
  kind?: ButtonKind;
  position?: ButtonPosition;
  spacing?: boolean;
  isDisabled?: boolean;
}) => {
  const spacingClass = spacing ? styles.spacing : '';
  const classes = `${styles.btn} ${styles[position]} ${styles[kind]} ${spacingClass}`;

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
