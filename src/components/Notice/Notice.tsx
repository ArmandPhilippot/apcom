import { ReactNode } from 'react';
import styles from './Notice.module.scss';

type NoticeType = 'error' | 'info' | 'success' | 'warning';

const Notice = ({
  children,
  type,
}: {
  children: ReactNode;
  type: NoticeType;
}) => {
  const withModifier = `message--${type}`;

  return (
    <div className={`${styles.message} ${styles[withModifier]}`}>
      {children}
    </div>
  );
};

export default Notice;
