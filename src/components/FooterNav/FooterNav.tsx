import Link from 'next/link';
import styles from './FooterNav.module.scss';
import { NavItem } from '@ts/types/nav';
import { useIntl } from 'react-intl';

const FooterNav = () => {
  const intl = useIntl();

  const footerNavConfig: NavItem[] = [
    {
      id: 'legal-notice',
      name: intl.formatMessage({
        defaultMessage: 'Legal notice',
        description: 'FooterNav: legal notice link',
        id: 'yWjXRx',
      }),
      slug: '/mentions-legales',
    },
  ];

  const navItems = footerNavConfig.map((item) => {
    return (
      <li key={item.id} className={styles.item}>
        <Link href={item.slug}>
          <a className={styles.link}>{item.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <nav
      className={styles.nav}
      aria-label={intl.formatMessage({
        defaultMessage: 'Footer',
        description: 'FooterNav: aria-label',
        id: 'HTdaZj',
      })}
    >
      <ul className={styles.list}>{navItems}</ul>
    </nav>
  );
};

export default FooterNav;
