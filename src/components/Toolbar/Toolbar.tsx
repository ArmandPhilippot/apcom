import { ButtonSearch } from '@components/Buttons';
import MainNav from '@components/MainNav/MainNav';
import SearchForm from '@components/SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const [isNavOpened, setIsNavOpened] = useState<boolean>(false);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isNavOpened) setIsSearchOpened(false);
  }, [isNavOpened]);

  useEffect(() => {
    if (isSearchOpened) setIsNavOpened(false);
  }, [isSearchOpened]);

  const searchClasses = `${styles.search} ${
    isSearchOpened ? styles['search--opened'] : styles['search--closed']
  }`;

  return (
    <div className={styles.wrapper}>
      <MainNav isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
      <ButtonSearch
        isActivated={isSearchOpened}
        setIsActivated={setIsSearchOpened}
      />
      <div className={searchClasses}>
        <SearchForm isOpened={isSearchOpened} />
      </div>
    </div>
  );
};

export default Toolbar;
