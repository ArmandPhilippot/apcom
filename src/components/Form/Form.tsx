import { ReactNode } from 'react';
import styles from './Form.module.scss';

const Form = ({
  children,
  submitHandler,
}: {
  children: ReactNode;
  submitHandler: any;
}) => {
  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      {children}
    </form>
  );
};

export default Form;
