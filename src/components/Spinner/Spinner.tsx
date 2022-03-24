import { useIntl } from 'react-intl';
import styles from './Spinner.module.scss';

const Spinner = ({ message }: { message?: string }) => {
  const intl = useIntl();

  return (
    <div className={styles.wrapper}>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.ball}></div>
      <div className={styles.text}>
        {message ||
          intl.formatMessage({
            defaultMessage: 'Loading...',
            description: 'Spinner: loading text',
            id: 'q9cJQe',
          })}
      </div>
    </div>
  );
};

export default Spinner;
