import useClickOutside from '@utils/hooks/use-click-outside';
import { FC, useRef, useState } from 'react';
import MainNav, { type MainNavProps } from '../toolbar/main-nav';
import Search, { type SearchProps } from '../toolbar/search';
import Settings from '../toolbar/settings';
import styles from './toolbar.module.scss';

export type ToolbarProps = Pick<SearchProps, 'searchPage'> & {
  /**
   * Set additional classnames to the toolbar wrapper.
   */
  className?: string;
  /**
   * The main nav items.
   */
  nav: MainNavProps['items'];
};

/**
 * Toolbar component
 *
 * Render the website toolbar.
 */
const Toolbar: FC<ToolbarProps> = ({ className = '', nav, searchPage }) => {
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);
  const mainNavRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useClickOutside(mainNavRef, () => isNavOpened && setIsNavOpened(false));
  useClickOutside(searchRef, () => isSearchOpened && setIsSearchOpened(false));
  useClickOutside(
    settingsRef,
    () => isSettingsOpened && setIsSettingsOpened(false)
  );

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <MainNav
        items={nav}
        isActive={isNavOpened}
        setIsActive={setIsNavOpened}
        className={styles.modal}
        ref={mainNavRef}
      />
      <Search
        searchPage={searchPage}
        isActive={isSearchOpened}
        setIsActive={setIsSearchOpened}
        className={`${styles.modal} ${styles['modal--search']}`}
        ref={searchRef}
      />
      <Settings
        isActive={isSettingsOpened}
        setIsActive={setIsSettingsOpened}
        className={`${styles.modal} ${styles['modal--settings']}`}
        tooltipClassName={styles.tooltip}
        ref={settingsRef}
      />
    </div>
  );
};

export default Toolbar;
