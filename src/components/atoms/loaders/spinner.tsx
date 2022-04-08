import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './spinner.module.scss';

export type SpinnerProps = {
  /**
   * The loading message. Default: "Loading...".
   */
  message?: string;
};

/**
 * Spinner component
 *
 * Render a loading message with animation.
 */
const Spinner: VFC<SpinnerProps> = ({ message }) => {
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
