import { CloseIcon, CogIcon, SearchIcon } from '@components/Icons';
import { t } from '@lingui/macro';
import { SetStateAction } from 'react';
import styles from '../Buttons.module.scss';

type ButtonType = 'search' | 'settings';

const ButtonToolbar = ({
  type,
  isActivated,
  setIsActivated,
}: {
  type: ButtonType;
  isActivated: boolean;
  setIsActivated: (value: SetStateAction<boolean>) => void;
}) => {
  const ButtonIcon = () => (type === 'search' ? <SearchIcon /> : <CogIcon />);
  const btnClasses = isActivated
    ? `${styles.toolbar} ${styles['toolbar--activated']}`
    : styles.toolbar;

  return (
    <button
      className={btnClasses}
      type="button"
      onClick={() => setIsActivated(!isActivated)}
    >
      <span className={styles.icon}>
        <span className={styles.front}>
          <ButtonIcon />
        </span>
        <span className={styles.back}>
          <CloseIcon />
        </span>
      </span>
      {isActivated ? (
        <span className="screen-reader-text">{t`Close ${type}`}</span>
      ) : (
        <span className="screen-reader-text">{t`Open ${type}`}</span>
      )}
    </button>
  );
};

export default ButtonToolbar;
