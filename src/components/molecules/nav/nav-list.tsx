import type { FC, ReactNode } from 'react';
import { Link, List, ListItem, Nav, NavLink, type NavProps } from '../../atoms';
import styles from './nav-list.module.scss';

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

export type NavListProps = Omit<NavProps, 'children'> & {
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
export const NavList: FC<NavListProps> = ({
  className = '',
  items,
  kind,
  listClassName = '',
  ...props
}) => {
  const kindClass = `nav--${kind}`;
  const navClass = `${styles[kindClass]} ${className}`;

  /**
   * Get the nav items.
   * @returns {JSX.Element[]} An array of nav items.
   */
  const getItems = (): JSX.Element[] =>
    items.map(({ id, href, label, logo }) => (
      <ListItem key={id} className={styles.nav__item}>
        {kind === 'main' ? (
          <NavLink href={href} label={label} logo={logo} />
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </ListItem>
    ));

  return (
    <Nav {...props} className={navClass}>
      <List className={listClassName} hideMarker isInline spacing="2xs">
        {getItems()}
      </List>
    </Nav>
  );
};
