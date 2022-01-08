import { FunctionComponent } from 'react';
import styles from './Main.module.scss';

const Main: FunctionComponent = ({ children }) => {
  return (
    <main id="main" className={styles.wrapper}>
      {children}
    </main>
  );
};

export default Main;
