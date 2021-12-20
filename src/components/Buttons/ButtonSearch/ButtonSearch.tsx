import CloseIcon from '@assets/images/icon-close.svg';
import SearchIcon from '@assets/images/icon-search.svg';
import { t } from '@lingui/macro';
import { SetStateAction } from 'react';
import styles from '../Buttons.module.scss';

const ButtonSearch = ({
  isActivated,
  setIsActivated,
}: {
  isActivated: boolean;
  setIsActivated: (value: SetStateAction<boolean>) => void;
}) => {
  const btnClasses = isActivated
    ? `${styles.search} ${styles['search--opened']}`
    : styles.search;

  return (
    <button
      className={btnClasses}
      type="button"
      onClick={() => setIsActivated(!isActivated)}
    >
      <span className={styles.icon}>
        <span className={styles.front}>
          <SearchIcon />
        </span>
        <span className={styles.back}>
          <CloseIcon />
        </span>
      </span>
      {isActivated ? (
        <span className="screen-reader-text">{t`Close search`}</span>
      ) : (
        <span className="screen-reader-text">{t`Open search`}</span>
      )}
    </button>
  );
};

export default ButtonSearch;
