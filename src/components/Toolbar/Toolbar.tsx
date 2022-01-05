import { ButtonToolbar } from '@components/Buttons';
import MainNav from '@components/MainNav/MainNav';
import SearchForm from '@components/SearchForm/SearchForm';
import Settings from '@components/Settings/Settings';
import { useEffect, useState } from 'react';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isNavOpened) {
      setIsSearchOpened(false);
      setIsSettingsOpened(false);
    }
  }, [isNavOpened]);

  useEffect(() => {
    if (isSearchOpened) {
      setIsNavOpened(false);
      setIsSettingsOpened(false);
    }
  }, [isSearchOpened]);

  useEffect(() => {
    if (isSettingsOpened) {
      setIsNavOpened(false);
      setIsSearchOpened(false);
    }
  }, [isSettingsOpened]);

  const searchClasses = `${styles.menu} ${
    isSearchOpened ? styles['menu--opened'] : styles['menu--closed']
  }`;

  const settingsClasses = `${styles.menu} ${
    isSettingsOpened ? styles['menu--opened'] : styles['menu--closed']
  }`;

  return (
    <div className={styles.wrapper}>
      <MainNav isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
      <ButtonToolbar
        type="search"
        isActivated={isSearchOpened}
        setIsActivated={setIsSearchOpened}
      />
      <div className={searchClasses}>
        <SearchForm isOpened={isSearchOpened} />
      </div>
      <ButtonToolbar
        type="settings"
        isActivated={isSettingsOpened}
        setIsActivated={setIsSettingsOpened}
      />
      <div className={settingsClasses}>
        <Settings />
      </div>
    </div>
  );
};

export default Toolbar;
