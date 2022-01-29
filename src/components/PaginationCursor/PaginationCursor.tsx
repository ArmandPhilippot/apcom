import { useIntl } from 'react-intl';
import styles from './PaginationCursor.module.scss';

const PaginationCursor = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const intl = useIntl();

  return (
    <div className={styles.wrapper}>
      <progress
        className={styles.bar}
        max={total}
        value={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={intl.formatMessage({
          defaultMessage:
            'Number of articles loaded out of the total available.',
          description: 'PaginationCursor: loaded articles count aria-label',
        })}
        title={intl.formatMessage(
          {
            defaultMessage:
              '{articlesCount, plural, =0 {# articles} one {# article} other {# articles}} out of a total of {total}',
            description: 'PaginationCursor: loaded articles count message',
          },
          { articlesCount: current, total }
        )}
      ></progress>
    </div>
  );
};

export default PaginationCursor;
