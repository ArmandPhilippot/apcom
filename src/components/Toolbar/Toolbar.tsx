import { ButtonSearch } from '@components/Buttons';
import MainNav from '@components/MainNav/MainNav';
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

  return (
    <div className={styles.wrapper}>
      <MainNav isOpened={isNavOpened} setIsOpened={setIsNavOpened} />
      <ButtonSearch
        isActivated={isSearchOpened}
        setIsActivated={setIsSearchOpened}
      />
    </div>
  );
};

export default Toolbar;
