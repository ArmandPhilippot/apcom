import { FC } from 'react';
import styles from './notice.module.scss';

export type NoticeKind = 'error' | 'info' | 'success' | 'warning';

export type NoticeProps = {
  /**
   * Set additional classnames to the notice wrapper.
   */
  className?: string;
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
const Notice: FC<NoticeProps> = ({ className = '', kind, message }) => {
  const kindClass = `wrapper--${kind}`;

  return message ? (
    <div className={`${styles.wrapper} ${styles[kindClass]} ${className}`}>
      {message}
    </div>
  ) : (
    <></>
  );
};

export default Notice;
