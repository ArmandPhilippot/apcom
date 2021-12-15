import Branding from '@components/Branding/Branding';
import MainNav from '@components/MainNav/MainNav';
import styles from './Header.module.scss';

const Header = ({ isHome }: { isHome: boolean }) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.body}>
        <Branding isHome={isHome} />
        <MainNav />
      </div>
    </header>
  );
};

export default Header;
