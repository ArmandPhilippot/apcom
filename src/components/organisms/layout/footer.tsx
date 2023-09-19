import { FC } from 'react';
import { useIntl } from 'react-intl';
import Copyright, { type CopyrightProps } from '../../atoms/layout/copyright';
import BackToTop, {
  type BackToTopProps,
} from '../../molecules/buttons/back-to-top';
import Nav, { type NavItem } from '../../molecules/nav/nav';
import styles from './footer.module.scss';

export type FooterProps = {
  /**
   * Set additional classnames to the back to top button.
   */
  backToTopClassName?: BackToTopProps['className'];
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
const Footer: FC<FooterProps> = ({
  backToTopClassName,
  className = '',
  copyright,
  navItems,
  topId,
}) => {
  const intl = useIntl();
  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Footer',
    description: 'Footer: an accessible name for footer nav',
    id: 'd4N8nD',
  });

  return (
    <footer className={`${styles.wrapper} ${className}`}>
      <Copyright
        dates={copyright.dates}
        owner={copyright.owner}
        icon={copyright.icon}
      />
      {navItems && (
        <Nav
          aria-label={ariaLabel}
          kind="footer"
          items={navItems}
          className={styles.nav}
        />
      )}
      <BackToTop
        target={topId}
        className={`${styles['back-to-top']} ${backToTopClassName}`}
      />
    </footer>
  );
};

export default Footer;
