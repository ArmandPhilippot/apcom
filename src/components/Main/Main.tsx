import { FunctionComponent } from 'react';
import styles from './Main.module.scss';

const Main: FunctionComponent = ({ children }) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.body}>{children}</div>
    </main>
  );
};

export default Main;
