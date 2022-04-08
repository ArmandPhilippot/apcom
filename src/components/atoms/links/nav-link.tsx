import Link from 'next/link';
import { VFC, ReactNode } from 'react';
import styles from './nav-link.module.scss';

export type NavLinkProps = {
  /**
   * Link target.
   */
  href: string;
  /**
   * Link label.
   */
  label: string;
  /**
   * Link logo.
   */
  logo?: ReactNode;
};

/**
 * NavLink component
 *
 * Render a navigation link.
 */
const NavLink: VFC<NavLinkProps> = ({ href, label, logo }) => {
  return (
    <Link href={href}>
      <a className={styles.link}>
        {logo}
        {label}
      </a>
    </Link>
  );
};

export default NavLink;
