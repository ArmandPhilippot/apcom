import Copyright, {
  type CopyrightProps,
} from '@components/atoms/layout/copyright';
import BackToTop from '@components/molecules/buttons/back-to-top';
import Nav, { type NavItem } from '@components/molecules/nav/nav';
import { FC } from 'react';
import styles from './footer.module.scss';

export type FooterProps = {
  /**
   * Set additional classnames to the footer element.
   */
  className?: string;
  /**
   * Set the copyright information.
   */
  copyright: CopyrightProps;
  /**
   * The footer nav items.
   */
  navItems?: NavItem[];
  /**
   * An element id (without hashtag) used as anchor for back to top button.
   */
  topId: string;
};

/**
 * Footer component
 *
 * Renders a footer with copyright and nav;
 */
const Footer: FC<FooterProps> = ({ className, copyright, navItems, topId }) => {
  return (
    <footer className={`${styles.wrapper} ${className}`}>
      <Copyright
        dates={copyright.dates}
        owner={copyright.owner}
        icon={copyright.icon}
      />
      {navItems && (
        <Nav kind="footer" items={navItems} className={styles.nav} />
      )}
      <BackToTop target={topId} className={styles['back-to-top']} />
    </footer>
  );
};

export default Footer;
