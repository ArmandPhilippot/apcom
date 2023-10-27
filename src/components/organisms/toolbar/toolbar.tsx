/* eslint-disable max-statements */
import { type FC, useState, useCallback } from 'react';
import { useOnClickOutside, useRouteChange } from '../../../utils/hooks';
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
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);

  const mainNavRef = useOnClickOutside<HTMLDivElement>(
    () => isNavOpened && setIsNavOpened(false)
  );
  const searchRef = useOnClickOutside<HTMLDivElement>(
    () => isSearchOpened && setIsSearchOpened(false)
  );
  const settingsRef = useOnClickOutside<HTMLDivElement>(
    () => isSettingsOpened && setIsSettingsOpened(false)
  );

  const toggleMainNav = useCallback(
    () => setIsNavOpened((prevState) => !prevState),
    []
  );
  const toggleSearch = useCallback(
    () => setIsSearchOpened((prevState) => !prevState),
    []
  );
  const toggleSettings = useCallback(
    () => setIsSettingsOpened((prevState) => !prevState),
    []
  );

  useRouteChange(() => setIsSearchOpened(false));

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <MainNavItem
        className={styles.modal}
        isActive={isNavOpened}
        items={nav}
        ref={mainNavRef}
        setIsActive={toggleMainNav}
      />
      <Search
        className={`${styles.modal} ${styles['modal--search']}`}
        isActive={isSearchOpened}
        ref={searchRef}
        searchPage={searchPage}
        setIsActive={toggleSearch}
      />
      <Settings
        className={`${styles.modal} ${styles['modal--settings']}`}
        isActive={isSettingsOpened}
        ref={settingsRef}
        setIsActive={toggleSettings}
      />
    </div>
  );
};
