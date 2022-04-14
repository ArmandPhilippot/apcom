import Link from '@components/atoms/links/link';
import NavLink from '@components/atoms/links/nav-link';
import { ReactNode, VFC } from 'react';
import styles from './nav.module.scss';

export type NavItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The item link.
   */
  href: string;
  /**
   * The item name.
   */
  label: string;
  /**
   * The item logo.
   */
  logo?: ReactNode;
};

export type NavProps = {
  /**
   * Set additional classnames to the navigation wrapper.
   */
  className?: string;
  /**
   * The navigation items.
   */
  items: NavItem[];
  /**
   * The navigation kind.
   */
  kind: 'main' | 'footer';
  /**
   * Set additional classnames to the navigation list.
   */
  listClassName?: string;
};

/**
 * Nav component
 *
 * Render the nav links.
 */
const Nav: VFC<NavProps> = ({
  className = '',
  items,
  kind,
  listClassName = '',
}) => {
  const kindClass = `nav--${kind}`;

  /**
   * Get the nav items.
   * @returns {JSX.Element[]} An array of nav items.
   */
  const getItems = (): JSX.Element[] => {
    return items.map(({ id, href, label, logo }) => (
      <li key={id} className={styles.nav__item}>
        {kind === 'main' ? (
          <NavLink href={href} label={label} logo={logo} />
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </li>
    ));
  };

  return (
    <nav className={`${styles[kindClass]} ${className}`}>
      <ul className={`${styles.nav__list} ${listClassName}`}>{getItems()}</ul>
    </nav>
  );
};

export default Nav;
