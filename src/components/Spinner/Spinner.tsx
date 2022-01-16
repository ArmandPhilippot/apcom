import { t } from '@lingui/macro';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.text}>{t`Loading...`}</div>
    </div>
  );
};

export default Spinner;
