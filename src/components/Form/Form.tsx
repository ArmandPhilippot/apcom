import { FormEvent } from 'react';
import styles from './Form.module.scss';

const Form: React.FunctionComponent = ({ children }) => {
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitForm} className={styles.wrapper}>
      {children}
    </form>
  );
};

export default Form;
