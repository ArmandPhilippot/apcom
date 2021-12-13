import Link from 'next/link';
import styles from './FooterNav.module.scss';
import { footerNav } from '@config/nav';

const FooterNav = () => {
  const navItems = footerNav.map((item) => {
    return (
      <li key={item.id} className={styles.item}>
        <Link href={item.slug}>
          <a className={styles.link}>{item.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.list}>{navItems}</ul>
      </nav>
    </div>
  );
};

export default FooterNav;
