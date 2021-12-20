import MainNav from '@components/MainNav/MainNav';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  return (
    <div className={styles.wrapper}>
      <MainNav />
    </div>
  );
};

export default Toolbar;
