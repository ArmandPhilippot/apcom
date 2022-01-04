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
  const withModifier = modifier ? `wrapper--${modifier}` : '';
  const classes = `${styles.wrapper} ${withModifier}`;

  return (
    <form onSubmit={submitHandler} className={classes}>
      {children}
    </form>
  );
};

export default Form;
