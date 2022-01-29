import { useIntl } from 'react-intl';
import styles from './Spinner.module.scss';

const Spinner = () => {
  const intl = useIntl();

  return (
    <div className={styles.wrapper}>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.text}>
        {intl.formatMessage({
          defaultMessage: 'Loading...',
          description: 'Spinner: loading text',
        })}
      </div>
    </div>
  );
};

export default Spinner;
