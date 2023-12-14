import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { AUTHOR_ID } from '../../../../utils/constants';
import { Header, type HeaderProps } from '../../../atoms';
import { SiteBranding } from './site-branding';
import styles from './site-header.module.scss';
import { SiteNavbar } from './site-navbar';

export type SiteHeaderProps = Omit<HeaderProps, 'children'> & {
  isHome?: boolean;
};

const SiteHeaderWithRef: ForwardRefRenderFunction<
  HTMLElement,
  SiteHeaderProps
> = ({ className = '', isHome = false, ...props }, ref) => {
  const headerClass = `${styles.header} ${className}`;

  return (
    <Header {...props} className={headerClass} ref={ref}>
      <SiteBranding
        className={styles.branding}
        id={AUTHOR_ID}
        isHome={isHome}
      />
      <SiteNavbar className={styles.navbar} />
    </Header>
  );
};

export const SiteHeader = forwardRef(SiteHeaderWithRef);
