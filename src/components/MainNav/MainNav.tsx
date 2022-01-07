import { SetStateAction } from 'react';
import Link from 'next/link';
import { t } from '@lingui/macro';
import {
  BlogIcon,
  ContactIcon,
  CVIcon,
  HamburgerIcon,
  HomeIcon,
} from '@components/Icons';
import { mainNav } from '@config/nav';
import styles from './MainNav.module.scss';
import { useRouter } from 'next/router';

const MainNav = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: (value: SetStateAction<boolean>) => void;
}) => {
  const router = useRouter();

  const getIcon = (id: string) => {
    switch (id) {
      case 'home':
        return <HomeIcon />;
      case 'blog':
        return <BlogIcon />;
      case 'contact':
        return <ContactIcon />;
      case 'cv':
        return <CVIcon />;
      default:
        break;
    }
  };

  const navItems = mainNav.map((item) => {
    const currentClass = router.asPath === item.slug ? styles.current : '';

    return (
      <li key={item.id}>
        <Link href={item.slug}>
          <a className={`${styles.link} ${currentClass}`}>
            {getIcon(item.id)}
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
        checked={isOpened}
        onChange={() => setIsOpened(!isOpened)}
        autoComplete="off"
      />
      <label
        htmlFor="main-nav__checkbox"
        id="main-nav-toggle"
        className={styles.label}
      >
        <HamburgerIcon isActive={isOpened} />
        <span className="screen-reader-text">
          {isOpened ? t`Close menu` : t`Open menu`}
        </span>
      </label>
      <nav className={styles.nav}>
        <ul className={styles.list}>{navItems}</ul>
      </nav>
    </div>
  );
};

export default MainNav;
