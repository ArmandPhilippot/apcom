import { ReactNode } from 'react';
import styles from './Form.module.scss';

const Form = ({
  children,
  submitHandler,
  modifier = '',
  id,
}: {
  children: ReactNode;
  submitHandler: any;
  modifier?: string;
  id?: string;
}) => {
  const withModifier = modifier ? styles[`wrapper--${modifier}`] : '';
  const classes = `${styles.wrapper} ${withModifier}`;

  return (
    <form onSubmit={submitHandler} className={classes} id={id}>
      {children}
    </form>
  );
};

export default Form;
