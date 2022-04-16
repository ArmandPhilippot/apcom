import { FC, useState } from 'react';
import MainNav, { type MainNavProps } from '../toolbar/main-nav';
import Search from '../toolbar/search';
import Settings from '../toolbar/settings';
import styles from './toolbar.module.scss';

export type ToolbarProps = {
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
const Toolbar: FC<ToolbarProps> = ({ className = '', nav }) => {
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <MainNav
        items={nav}
        isActive={isNavOpened}
        setIsActive={setIsNavOpened}
        className={styles.modal}
      />
      <Search
        isActive={isSearchOpened}
        setIsActive={setIsSearchOpened}
        className={`${styles.modal} ${styles['modal--search']}`}
      />
      <Settings
        isActive={isSettingsOpened}
        setIsActive={setIsSettingsOpened}
        className={`${styles.modal} ${styles['modal--settings']}`}
        tooltipClassName={styles.tooltip}
      />
    </div>
  );
};

export default Toolbar;
