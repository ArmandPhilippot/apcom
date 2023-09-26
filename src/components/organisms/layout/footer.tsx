import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Copyright, type CopyrightProps } from '../../atoms';
import {
  BackToTop,
  type BackToTopProps,
  Nav,
  type NavItem,
} from '../../molecules';
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
export const Footer: FC<FooterProps> = ({
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
  const footerClass = `${styles.wrapper} ${className}`;
  const btnClass = `${styles['back-to-top']} ${backToTopClassName}`;

  return (
    <footer className={footerClass}>
      <Copyright
        dates={copyright.dates}
        icon={copyright.icon}
        owner={copyright.owner}
      />
      {navItems ? (
        <Nav
          aria-label={ariaLabel}
          className={styles.nav}
          items={navItems}
          // eslint-disable-next-line react/jsx-no-literals -- Hardcoded config
          kind="footer"
        />
      ) : null}
      <BackToTop className={btnClass} to={topId} />
    </footer>
  );
};
