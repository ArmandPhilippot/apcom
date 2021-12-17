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
  return (
    <div className={`${styles.message} ${styles[`message--${type}`]}`}>
      {children}
    </div>
  );
};

export default Notice;
