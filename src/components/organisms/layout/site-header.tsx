import type { FC } from 'react';
import { Header } from '../../atoms';
import { Branding, type BrandingProps } from '../../molecules';
import { Toolbar, type ToolbarProps } from '../toolbar';
import styles from './site-header.module.scss';

export type SiteHeaderProps = BrandingProps &
  Pick<
    ToolbarProps,
    'ackeeStorageKey' | 'motionStorageKey' | 'nav' | 'searchPage'
  > & {
    /**
     * Set additional classnames to the header element.
     */
    className?: string;
  };

/**
 * SiteHeader component
 *
 * Render the website header.
 */
export const SiteHeader: FC<SiteHeaderProps> = ({
  ackeeStorageKey,
  className,
  motionStorageKey,
  nav,
  searchPage,
  ...props
}) => {
  const headerClass = `${styles.wrapper} ${className}`;

  return (
    <Header className={headerClass}>
      <div className={styles.body}>
        <Branding {...props} />
        <Toolbar
          ackeeStorageKey={ackeeStorageKey}
          className={styles.toolbar}
          motionStorageKey={motionStorageKey}
          nav={nav}
          searchPage={searchPage}
        />
      </div>
    </Header>
  );
};
