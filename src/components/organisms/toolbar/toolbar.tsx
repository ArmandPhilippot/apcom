import { FC, useState } from 'react';
import { useOnClickOutside, useRouteChange } from '../../../utils/hooks';
import { MainNav, type MainNavProps } from './main-nav';
import { Search, type SearchProps } from './search';
import { Settings, type SettingsProps } from './settings';
import styles from './toolbar.module.scss';

export type ToolbarProps = Pick<SearchProps, 'searchPage'> &
  Pick<SettingsProps, 'ackeeStorageKey' | 'motionStorageKey'> & {
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
export const Toolbar: FC<ToolbarProps> = ({
  ackeeStorageKey,
  className = '',
  motionStorageKey,
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

  useRouteChange(() => setIsSearchOpened(false));

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <MainNav
        className={styles.modal}
        isActive={isNavOpened}
        items={nav}
        ref={mainNavRef}
        setIsActive={() => setIsNavOpened(!isNavOpened)}
      />
      <Search
        className={`${styles.modal} ${styles['modal--search']}`}
        isActive={isSearchOpened}
        ref={searchRef}
        searchPage={searchPage}
        setIsActive={() => setIsSearchOpened(!isSearchOpened)}
      />
      <Settings
        ackeeStorageKey={ackeeStorageKey}
        className={`${styles.modal} ${styles['modal--settings']}`}
        isActive={isSettingsOpened}
        motionStorageKey={motionStorageKey}
        ref={settingsRef}
        setIsActive={() => setIsSettingsOpened(!isSettingsOpened)}
      />
    </div>
  );
};
