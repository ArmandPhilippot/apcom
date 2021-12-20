import { ReactNode } from 'react';
import styles from './Form.module.scss';

const Form = ({
  children,
  submitHandler,
  modifier = '',
}: {
  children: ReactNode;
  submitHandler: any;
  modifier?: string;
}) => {
  const classes =
    modifier !== ''
      ? `${styles.wrapper} ${styles[`wrapper--${modifier}`]}`
      : styles.wrapper;

  return (
    <form onSubmit={submitHandler} className={classes}>
      {children}
    </form>
  );
};

export default Form;
