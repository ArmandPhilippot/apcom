import { FC } from 'react';
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

/**
 * Notice component
 *
 * Render a colored message depending on notice kind.
 */
const Notice: FC<NoticeProps> = ({ kind, message }) => {
  const kindClass = `wrapper--${kind}`;

  return (
    <div className={`${styles.wrapper} ${styles[kindClass]}`}>{message}</div>
  );
};

export default Notice;
