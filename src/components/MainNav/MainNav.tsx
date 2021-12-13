import { useState } from 'react';
import Link from 'next/link';
import { t } from '@lingui/macro';
import { HamburgerIcon } from '@components/Icons';
import { mainNav } from '@config/nav';
import ArticlesIcon from '@assets/images/icon-articles.svg';
import ContactIcon from '@assets/images/icon-contact.svg';
import CVIcon from '@assets/images/icon-cv.svg';
import HomeIcon from '@assets/images/icon-home.svg';
import styles from './MainNav.module.scss';

const MainNav = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const getIcon = (id: string) => {
    switch (id) {
      case 'home':
        return <HomeIcon />;
      case 'blog':
        return <ArticlesIcon />;
      case 'contact':
        return <ContactIcon />;
      case 'cv':
        return <CVIcon />;
      default:
        break;
    }
  };

  const navItems = mainNav.map((item) => {
    return (
      <li key={item.id} className={styles.item}>
        <Link href={item.slug}>
          <a className={styles.link}>
            <span className={styles.icon}>{getIcon(item.id)}</span>
            <span>{item.name}</span>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        name="main-nav__checkbox"
        id="main-nav__checkbox"
        aria-labelledby="main-nav-toggle"
        className={styles.checkbox}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor="main-nav__checkbox"
        id="main-nav-toggle"
        className={styles.label}
      >
        <HamburgerIcon isActive={isChecked} />
        <span className="screen-reader-text">
          {isChecked ? t`Close menu` : t`Open menu`}
        </span>
      </label>
      <nav className={styles.nav}>
        <ul className={styles.list}>{navItems}</ul>
      </nav>
    </div>
  );
};

export default MainNav;
