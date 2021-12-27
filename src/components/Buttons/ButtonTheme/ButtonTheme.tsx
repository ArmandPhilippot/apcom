import { CloseIcon, ThemeIcon } from '@components/Icons';
import { t } from '@lingui/macro';
import { SetStateAction } from 'react';
import styles from '../Buttons.module.scss';

const ButtonTheme = ({
  isActivated,
  setIsActivated,
}: {
  isActivated: boolean;
  setIsActivated: (value: SetStateAction<boolean>) => void;
}) => {
  const btnClasses = isActivated
    ? `${styles.theme} ${styles['theme--opened']}`
    : styles.theme;

  return (
    <button
      className={btnClasses}
      type="button"
      onClick={() => setIsActivated(!isActivated)}
    >
      <span className={styles.icon}>
        <span className={styles.front}>
          <ThemeIcon />
        </span>
        <span className={styles.back}>
          <CloseIcon />
        </span>
      </span>
      {isActivated ? (
        <span className="screen-reader-text">{t`Close theme options`}</span>
      ) : (
        <span className="screen-reader-text">{t`Open theme options`}</span>
      )}
    </button>
  );
};

export default ButtonTheme;
