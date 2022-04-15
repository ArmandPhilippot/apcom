import { VFC } from 'react';
import styles from './notice.module.scss';

export type NoticeKind = 'error' | 'info' | 'success' | 'warning';

export type NoticeProps = {
  /**
   * The notice kind.
   */
  kind: NoticeKind;
  /**
   * The notice body.
   */
  message: string;
};

const Notice: VFC<NoticeProps> = ({ kind, message }) => {
  const kindClass = `wrapper--${kind}`;

  return (
    <div className={`${styles.wrapper} ${styles[kindClass]}`}>{message}</div>
  );
};

export default Notice;
