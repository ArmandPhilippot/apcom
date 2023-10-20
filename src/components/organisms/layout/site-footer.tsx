import type { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Footer } from '../../atoms';
import {
  BackToTop,
  type BackToTopProps,
  NavList,
  NavItem,
  NavLink,
  type CopyrightProps,
  Copyright,
} from '../../molecules';
import styles from './site-footer.module.scss';

export type FooterLinks = {
  id: string;
  href: string;
  label: string;
};

export type SiteFooterProps = {
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
   * The website license.
   */
  license?: ReactNode;
  /**
   * The footer nav items.
   */
  navItems?: FooterLinks[];
  /**
   * An element id (without hashtag) used as anchor for back to top button.
   */
  topId: string;
};

/**
 * SiteFooter component
 *
 * Renders a footer with copyright and nav;
 */
export const SiteFooter: FC<SiteFooterProps> = ({
  backToTopClassName,
  className = '',
  copyright,
  license,
  navItems,
  topId,
}) => {
  const intl = useIntl();
  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Footer',
    description: 'SiteFooter: an accessible name for the footer nav',
    id: 'pRzkFR',
  });
  const backToTop = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'SiteFooter: an accessible name for the back to top button',
    id: 'OHvb01',
  });
  const backToTopAnchor = `#${topId}`;
  const footerClass = `${styles.wrapper} ${className}`;
  const btnClass = `${styles['back-to-top']} ${backToTopClassName}`;

  return (
    <Footer className={footerClass}>
      <Copyright {...copyright} />
      {license}
      {navItems ? (
        <NavList aria-label={ariaLabel} className={styles.nav} isInline>
          {navItems.map(({ id, ...link }) => (
            <NavItem key={id}>
              <NavLink {...link} />
            </NavItem>
          ))}
        </NavList>
      ) : null}
      <BackToTop
        anchor={backToTopAnchor}
        className={btnClass}
        label={backToTop}
      />
    </Footer>
  );
};
