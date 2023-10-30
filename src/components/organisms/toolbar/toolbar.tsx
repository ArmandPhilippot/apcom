/* eslint-disable max-statements */
import type { FC } from 'react';
import {
  useBoolean,
  useOnClickOutside,
  useRouteChange,
} from '../../../utils/hooks';
import { MainNavItem, type MainNavItemProps } from './main-nav';
import { Search, type SearchProps } from './search';
import { Settings } from './settings';
import styles from './toolbar.module.scss';

export type ToolbarProps = Pick<SearchProps, 'searchPage'> & {
  /**
   * Set additional classnames to the toolbar wrapper.
   */
  className?: string;
  /**
   * The main nav items.
   */
  nav: MainNavItemProps['items'];
};

/**
 * Toolbar component
 *
 * Render the website toolbar.
 */
export const Toolbar: FC<ToolbarProps> = ({
  className = '',
  nav,
  searchPage,
}) => {
  const {
    deactivate: deactivateMainNav,
    state: isMainNavOpen,
    toggle: toggleMainNav,
  } = useBoolean(false);
  const {
    deactivate: deactivateSearch,
    state: isSearchOpen,
    toggle: toggleSearch,
  } = useBoolean(false);
  const {
    deactivate: deactivateSettings,
    state: isSettingsOpen,
    toggle: toggleSettings,
  } = useBoolean(false);

  const mainNavRef = useOnClickOutside<HTMLDivElement>(
    () => isMainNavOpen && deactivateMainNav()
  );
  const searchRef = useOnClickOutside<HTMLDivElement>(
    () => isSearchOpen && deactivateSearch()
  );
  const settingsRef = useOnClickOutside<HTMLDivElement>(
    () => isSettingsOpen && deactivateSettings()
  );

  useRouteChange(deactivateSearch);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <MainNavItem
        className={styles.modal}
        isActive={isMainNavOpen}
        items={nav}
        ref={mainNavRef}
        setIsActive={toggleMainNav}
      />
      <Search
        className={`${styles.modal} ${styles['modal--search']}`}
        isActive={isSearchOpen}
        ref={searchRef}
        searchPage={searchPage}
        setIsActive={toggleSearch}
      />
      <Settings
        className={`${styles.modal} ${styles['modal--settings']}`}
        isActive={isSettingsOpen}
        ref={settingsRef}
        setIsActive={toggleSettings}
      />
    </div>
  );
};
