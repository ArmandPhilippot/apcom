import { FunctionComponent } from 'react';
import styles from './Sidebar.module.scss';

const Sidebar: FunctionComponent = ({ children }) => {
  return (
    <aside className={styles.wrapper}>
      <div className={styles.body}>{children}</div>
    </aside>
  );
};

export default Sidebar;
