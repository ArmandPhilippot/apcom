import { plural, t } from '@lingui/macro';
import styles from './PaginationCursor.module.scss';

const PaginationCursor = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <div className={styles.wrapper}>
      <progress
        className={styles.bar}
        max={total}
        value={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={t`Number of articles loaded out of the total available.`}
        title={plural(current, {
          zero: `# articles out of a total of ${total}`,
          one: `# article out of a total of ${total}`,
          other: `# articles out of a total of ${total}`,
        })}
      ></progress>
    </div>
  );
};

export default PaginationCursor;
