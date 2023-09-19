import { FC, useState } from 'react';
import useOnClickOutside from '../../../utils/hooks/use-on-click-outside';
import useRouteChange from '../../../utils/hooks/use-route-change';
import MainNav, { type MainNavProps } from '../toolbar/main-nav';
import Search, { type SearchProps } from '../toolbar/search';
import Settings, { type SettingsProps } from '../toolbar/settings';
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
const Toolbar: FC<ToolbarProps> = ({
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
        items={nav}
        isActive={isNavOpened}
        setIsActive={() => setIsNavOpened(!isNavOpened)}
        className={styles.modal}
        ref={mainNavRef}
      />
      <Search
        searchPage={searchPage}
        isActive={isSearchOpened}
        setIsActive={() => setIsSearchOpened(!isSearchOpened)}
        className={`${styles.modal} ${styles['modal--search']}`}
        ref={searchRef}
      />
      <Settings
        ackeeStorageKey={ackeeStorageKey}
        className={`${styles.modal} ${styles['modal--settings']}`}
        isActive={isSettingsOpened}
        motionStorageKey={motionStorageKey}
        ref={settingsRef}
        setIsActive={() => setIsSettingsOpened(!isSettingsOpened)}
        tooltipClassName={styles.tooltip}
      />
    </div>
  );
};

export default Toolbar;
