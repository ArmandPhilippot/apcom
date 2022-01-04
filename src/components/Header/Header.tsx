import Branding from '@components/Branding/Branding';
import Toolbar from '@components/Toolbar/Toolbar';
import styles from './Header.module.scss';

const Header = ({ isHome }: { isHome: boolean }) => {
  return (
    <header id="top" className={styles.wrapper}>
      <div className={styles.body}>
        <Branding isHome={isHome} />
        <Toolbar />
      </div>
    </header>
  );
};

export default Header;
