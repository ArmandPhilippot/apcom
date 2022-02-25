import { ReactNode } from 'react';
import styles from './Form.module.scss';

type FormKind = 'centered' | 'search' | 'settings';

const Form = ({
  children,
  submitHandler,
  kind,
  id,
}: {
  children: ReactNode;
  submitHandler: any;
  kind?: FormKind;
  id?: string;
}) => {
  const kindStyles = kind ? styles[kind] : '';
  const classes = `${styles.wrapper} ${kindStyles}`;

  return (
    <form onSubmit={submitHandler} className={classes} id={id}>
      {children}
    </form>
  );
};

export default Form;
