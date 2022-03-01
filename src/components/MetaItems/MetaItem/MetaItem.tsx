import { MetaKind } from '@ts/types/app';
import { ReactElement } from 'react';
import styles from './MetaItem.module.scss';

const MetaItem = ({
  title,
  value,
  values,
  info,
  kind = 'list',
}: {
  title: string;
  value?: ReactElement | string;
  values?: ReactElement[] | string[];
  info?: string;
  kind: MetaKind;
}) => {
  return (
    <div className={styles[`wrapper--${kind}`]}>
      <dt className={styles[`title--${kind}`]}>{title}</dt>
      {value && (
        <dd className={styles[`body--${kind}`]} title={info}>
          {value}
        </dd>
      )}
      {values &&
        values.map((currentValue, index) => (
          <dd key={index} className={styles[`body--${kind}`]} title={info}>
            {currentValue}
          </dd>
        ))}
    </div>
  );
};

export default MetaItem;
