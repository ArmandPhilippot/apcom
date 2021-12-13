import Copyright from '@components/Copyright/Copyright';
import FooterNav from '@components/FooterNav/FooterNav';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <Copyright />
      <FooterNav />
    </footer>
  );
};

export default Footer;
